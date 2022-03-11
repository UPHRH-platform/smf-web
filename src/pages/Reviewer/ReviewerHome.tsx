import { Fragment, useEffect, useState } from "react";
import { HeadingOne, HeadingTwo } from "../../components/headings";
import { CardOne, CardTwo } from "../../components/cards";
import Notify from "../../helpers/notify";
import { FormService } from "../../services/form.service";
import { APP, LANG } from "../../constants";
import { BtnOne } from "../../components/buttons";

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
  useEffect(() => {
    const myApplicationsReq = {
      searchObjects: [],
    };
    FormService.getAllApplications(myApplicationsReq).then(
      (response2) => {
        if (response2.statusInfo.statusCode === APP.CODE.SUCCESS) {
          setPendingApplications(
            response2.responseData.length > 8
              ? response2.responseData.splice(0, 8)
              : response2.responseData
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
  }, []);

  // Function to format the status label
  const formatLabel = (labelStatus: string) => {
    let lowerLabel = labelStatus.toLowerCase();
    lowerLabel = lowerLabel.charAt(0).toUpperCase() + lowerLabel.slice(1);

    switch (lowerLabel) {
      case "Underreview":
        lowerLabel = "Under review";
        return lowerLabel;
      case "Sentforins":
        lowerLabel = "Sent for inspection";
        return lowerLabel;
      case "Inscompleted":
        lowerLabel = "Inspection completed";
        return lowerLabel;
      default:
        return lowerLabel;
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
                if (i.status === LANG.FORM_STATUS.NEW) {
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
                        link={"/regulator/" + i.formId + "/" + i.applicationId}
                      />
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};
