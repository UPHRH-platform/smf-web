/*eslint-disable no-empty-pattern*/
// @ts-nocheck
import { useEffect, useState } from "react";
import _ from "lodash";
import PageLayout from "./PageLayout";
import { useHistory } from "react-router-dom";

/**
 * DashboardLayout component renders
 * the visualisations based on the configurations
 * for regulator
 */

interface DashboardLayoutProps {
  dashboardConfig: any;
}

export const DashboardLayout = ({ dashboardConfig }: DashboardLayoutProps) => {
  // console.log(dashboardConfig);

  let history = useHistory();

  // console.log(history.location.pathname)

  // useEffect(() => {
  //   renderCharts();
  // }, [dashboardConfig]);

  const renderCharts = () => {
    let dashboardConfigData: any = dashboardConfig;

    let tabsInitData = _.chain(dashboardConfigData)
      .first()
      .get("visualizations")
      .groupBy("name")
      .value();
    return (
      <div>
        {_.map(tabsInitData, (k, v) => {
          return (
            <PageLayout
              key={v}
              chartRowData={k}
              row={k.row}
              pathName={history.location.pathname}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="row pt-2">{dashboardConfig.length > 0 && renderCharts()}</div>
  );
};
