/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import { HeadingOne } from "../../components/headings";
import Header from "../../components/common/Header";
import { useHistory } from "react-router-dom";
import { DashboardLayout } from "../../layouts";
import { ChartService } from "../../services";
import { APP } from "../../constants";
import Notify from "../../helpers/notify";
import DateFilter from "../../components/charts/DateFilter";

/**
 * Landing component renders
 * dashboard layout and its UI components
 */

interface LandingProps {
  data?: any;
}

export const Landing = ({ data }: LandingProps) => {
  let history = useHistory();

  const [dashboardConfigData, setDashboardConfigData] = useState<any[]>([]);

  useEffect(() => {
    getDashboardConfigurations();
  }, []);

  const getDashboardConfigurations = () => {
    ChartService.getDashboardConfig().then((response) => {
      if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
        setDashboardConfigData(response.responseData);
      } else {
        Notify.error(response.statusInfo.errorMessage);
      }
    });
  };

  return (
    <Fragment>
      <Header history={history} />
      <div className="container-fluid">
        <div className="container dashboard-inner-container mt-4">
          {/* Section one */}
          <section className="row pt-3">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="float-start pt-3">
                <HeadingOne heading="Insights so far" />
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="float-end">
                <DateFilter
                  pathName={history.location.pathname}
                  history={history}
                />
              </div>
            </div>
          </section>

          {/* Dashboards */}
          <section className="">
            <DashboardLayout dashboardConfig={dashboardConfigData} />
          </section>
        </div>
      </div>
    </Fragment>
  );
};
