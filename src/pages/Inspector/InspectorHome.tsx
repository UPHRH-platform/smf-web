/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import { HeadingOne, HeadingTwo } from "../../components/headings";
import { CardOne, CardTwo } from "../../components/cards";
import Helper from "./../../helpers/auth";
import { FormService } from "./../../services/form.service";
import { APP, LANG } from "./../../constants";
import Notify from "./../../helpers/notify";
import moment from "moment";
import { formatLabel } from "../../helpers/util";

/**
 * Inspector component renders
 * inspector page layout and its UI components
 */

interface InspectorProps {
  data?: any;
}

export const InspectorHome = ({ data }: InspectorProps) => {
  const [scheduledToday, setScheduledToday] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [past, setPast] = useState<any[]>([]);
  const [scheduledTodayForConsent, setScheduledTodayForConsent] = useState<
    any[]
  >([]);
  const [upcomingForConsent, setUpcomingForConsent] = useState<any[]>([]);
  const [pastForConsent, setPastForConsent] = useState<any[]>([]);
  const [inspectorMetrics, setInspectorMetrics] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState<any>(
    localStorage.getItem("user")
  );

  useEffect(() => {
    let user: any = JSON.parse(userDetails);
    setUserDetails(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userDetails.id) {
      setTimeout(() => {
        getAllApplications();
        getDashboardData();
      }, 850);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const getDashboardData = () => {
    FormService.getApplicationsStatusCount().then(
      (response) => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          setInspectorMetrics(response.responseData["keyValues"]);
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
      let data = {};
      let dataForConsent = {
        filterObjects: [
          {
            key: "toConsent",
            values: true,
          },
        ],
      };

      FormService.getAllApplications(data).then(
        (response) => {
          if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
            response.responseData.map((i: any, j: number) => {
              if (
                i.inspection &&
                i.inspection.leadInspector.includes(
                  userDetails && userDetails.id
                ) &&
                i.inspection.status === LANG.FORM_STATUS.SENT_FOR_INSPECTION
              ) {
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
              return null;
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

      FormService.getAllApplications(dataForConsent).then(
        (response) => {
          if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
            response.responseData.map((i: any, j: number) => {
              if (
                i.inspection &&
                i.inspection.status ===
                  LANG.FORM_STATUS.LEAD_INSPECTION_COMPLETED &&
                !i.inspection.leadInspector.includes(
                  userDetails && userDetails.id
                )
              ) {
                if (
                  moment(todayDate, "DD-MM-YYYY").isBefore(
                    moment(i.inspection.scheduledDate, "DD-MM-YYYY")
                  )
                ) {
                  setUpcomingForConsent((upcoming) => [...upcoming, i]);
                } else if (
                  moment(todayDate, "DD-MM-YYYY").isSame(
                    moment(i.inspection.scheduledDate, "DD-MM-YYYY")
                  )
                ) {
                  setScheduledTodayForConsent((today) => [...today, i]);
                } else {
                  setPastForConsent((past) => [...past, i]);
                }
              }
              return null;
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
              {inspectorMetrics.map((i, j) => {
                return (
                  <div
                    className="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0 mt-xxl-0"
                    key={j}
                  >
                    <CardOne count={i.value} title={formatLabel(i.key)} />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section two */}
          {scheduledTodayForConsent.length > 0 && (
            <section className="mt-5">
              <HeadingOne heading="Needs consent" />
              <HeadingTwo heading="These are the applications that you were part of. Kindky go through the inspection report and give your consent." />
              <div className="row mt-3">
                {scheduledTodayForConsent.map((i, j) => {
                  return (
                    <div
                      className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0 mt-xxl-0"
                      key={j}
                    >
                      <CardTwo
                        title={i.title}
                        name={i.updatedBy ? i.updatedBy : i.createdBy}
                        time={`Inspected on: ${
                          i.inspection ? i.inspection.scheduledDate : ""
                        }`}
                        showStatus={false}
                        status=""
                        statusLabel=""
                        showBtn={true}
                        type="button"
                        btnText="View application"
                        isLink={true}
                        link={`/assisting-inspector/${i.formId}/${i.applicationId}`}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Section three */}
          {scheduledToday.length > 0 && (
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
                      {i.inspection &&
                        i.inspection.status ===
                          LANG.FORM_STATUS.SENT_FOR_INSPECTION && (
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
                        )}

                      {i.inspection &&
                        i.inspection.status ===
                          LANG.FORM_STATUS.LEAD_INSPECTION_COMPLETED && (
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
                            link={`/assisting-inspector/${i.formId}/${i.applicationId}`}
                          />
                        )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </Fragment>
  );
};
