import { Fragment, useEffect, useState } from "react";
import { HeadingOne, HeadingTwo } from "../../components/headings";
import { CardOne, CardTwo } from "../../components/cards";
import Helper from "./../../helpers/auth";
import { FormService } from "./../../services/form.service";
import { APP, LANG } from "./../../constants";
import Notify from "./../../helpers/notify";
import moment from "moment";

/**
 * Inspector component renders
 * inspector page layout and its UI components
 */

const InspectorMetrics = [
  {
    id: 0,
    count: 2,
    title: "Total pending",
  },
  {
    id: 1,
    count: 1,
    title: "Received today",
  },
  {
    id: 2,
    count: 1,
    title: "In progress",
  },
  {
    id: 3,
    count: 0,
    title: "Reviewed today",
  },
  {
    id: 4,
    count: 32,
    title: "Reviewed in total",
  },
];

interface InspectorProps {
  data?: any;
}

export const InspectorHome = ({ data }: InspectorProps) => {
  const [scheduledToday, setScheduledToday] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [past, setPast] = useState<any[]>([]);

  useEffect(() => {
    getAllApplications();
    // getDashboardData();
  }, []);

  const getDashboardData = () => {
    FormService.getApplicationsStatusCount().then(
      (response) => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          console.log(response.responseData);
        } else {
          Notify.error(response.statusInfo.errorMessage);
        }
      },
      (error) => {
        error.statusInfo
          ? Notify.error(error.statusInfo.errorMessage)
          : Notify.error(error.message);
      }
    );
  };

  const getAllApplications = () => {
    let todayDate = moment().format("DD-MM-YYYY");
    if (Helper.getUserRole() === APP.ROLE.INSPECTOR) {
      let data = {
        searchObjects: [],
      };
      FormService.getAllApplications(data).then(
        (response) => {
          if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
            response.responseData.map((i: any, j: number) => {
              if (i.status !== LANG.FORM_STATUS.INSPECTION_COMPLETED) {
                if (
                  moment(todayDate, "DD-MM-YYYY").isBefore(
                    moment(i.inspection.scheduledDate, "DD-MM-YYYY")
                  )
                ) {
                  setUpcoming((upcoming) => [...upcoming, i]);
                } else if (
                  moment(todayDate, "DD-MM-YYYY").isSame(
                    moment(i.inspection.scheduledDate, "DD-MM-YYYY")
                  )
                ) {
                  setScheduledToday((today) => [...today, i]);
                } else {
                  setPast((past) => [...past, i]);
                }
              }
            });
          } else {
            Notify.error(response.statusInfo.errorMessage);
          }
        },
        (error) => {
          error.statusInfo
            ? Notify.error(error.statusInfo.errorMessage)
            : Notify.error(error.message);
        }
      );
    }
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="container dashboard-inner-container mt-4">
          {/* Section one */}
          <section className="pt-3">
            <HeadingOne heading="Your activity" />
            <div className="row pt-2">
              {InspectorMetrics.map((i, j) => {
                return (
                  <div
                    className="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0 mt-xxl-0"
                    key={i.id}
                  >
                    <CardOne count={i.count} title={i.title} />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section two */}
          <section className="mt-5">
            <HeadingOne heading="Scheduled today" />
            <HeadingTwo heading="These are latest applications that is pending for your review/approval" />
            <div className="row mt-3">
              {scheduledToday.map((i, j) => {
                return (
                  <div
                    className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0 mt-xxl-0"
                    key={j}
                  >
                    <CardTwo
                      title={i.title}
                      name={i.updatedBy ? i.updatedBy : i.createdBy}
                      time={`Scheduled on: ${
                        i.inspection ? i.inspection.scheduledDate : ""
                      }`}
                      showStatus={false}
                      status=""
                      statusLabel=""
                      showBtn={true}
                      type="button"
                      btnText="View application"
                      isLink={true}
                      link={`/inspector/${i.formId}/${i.applicationId}`}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};
