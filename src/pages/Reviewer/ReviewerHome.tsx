import { Fragment, useEffect, useState } from "react";
import { HeadingOne, HeadingTwo } from "../../components/headings";
import { CardOne, CardTwo } from "../../components/cards";
import Notify from "../../helpers/notify";
import { FormService } from "../../services/form.service";
import { APP, LANG } from "../../constants";
import { BtnOne } from "../../components/buttons";
import { useHistory } from "react-router-dom";
import { formatLabel } from "../../helpers/util";

/**
 * Reviewer component renders
 * Reviewer page layout and its UI components
 */

interface IApplication {
  applicationId: string;
  comments: string;
  createdBy: string;
  createdDate: string;
  dataObject: any;
  downvoteCount: number;
  downvotes: number;
  formData: any;
  formId: number;
  id: string;
  recordId: null;
  replies: null;
  reviewedBy: string;
  reviewedDate: string;
  status: string;
  timestamp: 1643895573549;
  title: string;
  updatedBy: null;
  updatedDate: string;
  upvoteCount: null;
  upvotes: null;
  version: number;
}

interface IApplicationCount {
  key: string;
  value: number;
}

interface ReviewerProps {
  data?: any;
}

export const ReviewerHome = ({ data }: ReviewerProps) => {
  const [pendingApplications, setPendingApplications] = useState<
    IApplication[]
  >([]);
  const [applicationsMetrics, setApplicationsMetrics] = useState<
    IApplicationCount[]
  >([]);
  const [showPendingApplications, setShowPendingApplications] = useState(false);

  let history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      getPendingApplications();
    }, 850);
  }, [history]);

  const getPendingApplications = () => {
    const myApplicationsReq = {
      searchObjects: [],
    };

    FormService.getAllApplications(myApplicationsReq).then(
      (response2) => {
        if (response2.statusInfo.statusCode === APP.CODE.SUCCESS) {
          let data = response2.responseData;

          let tempArray: any = [];

          data.map((m: any, n: number) => {
            if (
              m.status === LANG.FORM_STATUS.NEW ||
              m.status === LANG.FORM_STATUS.INSPECTION_COMPLETED
            ) {
              tempArray.push(m);
              setShowPendingApplications(true);
            }
            return null;
          });

          setPendingApplications(
            tempArray.length > 8 ? tempArray.splice(0, 8) : tempArray
          );
        } else {
          Notify.error(response2.statusInfo.errorMessage);
        }
      },
      (error) => {
        error.statusInfo
          ? Notify.error(error.statusInfo.errorMessage)
          : Notify.error(error.message);
      }
    );
    FormService.getApplicationsStatusCount().then(
      (response2: any) => {
        if (response2.statusInfo.statusCode === APP.CODE.SUCCESS) {
          setApplicationsMetrics(response2.responseData.keyValues);
        } else {
          Notify.error(response2.statusInfo.errorMessage);
        }
      },
      (error: any) => {
        error.statusInfo
          ? Notify.error(error.statusInfo.errorMessage)
          : Notify.error(error.message);
      }
    );
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="container dashboard-inner-container mt-4">
          {/* Section one */}
          <section className="pt-3">
            <HeadingOne heading="Your activity" />
            <div className="row pt-2">
              {applicationsMetrics.map((i, j) => {
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
          {showPendingApplications && (
            <section className="mt-5">
              <div className="row">
                <div className="col-md-10 col-sm-12 col-12 ">
                  <HeadingOne heading="Pending applications" />
                  <HeadingTwo heading="These are latest applications that is pending for your review/approval" />
                </div>
                <div className="col-md-2 col-sm-12 col-12 text-right">
                  <BtnOne
                    btnType="button"
                    label="SEE ALL"
                    isLink={true}
                    link={`reviewer/all-applications`}
                    floatBottom={false}
                    isModal={false}
                  />
                </div>
              </div>
              <div className="row mt-3">
                {pendingApplications.map((i, j) => {
                  if (
                    i.status === LANG.FORM_STATUS.NEW ||
                    i.status === LANG.FORM_STATUS.INSPECTION_COMPLETED
                  ) {
                    return (
                      <div
                        className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mb-3"
                        key={i.applicationId}
                      >
                        <CardTwo
                          title={i.title}
                          name={i.createdBy}
                          time={`Created on: ${i.createdDate}`}
                          showStatus={true}
                          status={i.status}
                          statusLabel={i.status}
                          showBtn={true}
                          type="button"
                          btnText="View application"
                          isLink={true}
                          link={
                            "/regulator/" + i.formId + "/" + i.applicationId
                          }
                        />
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </Fragment>
  );
};
