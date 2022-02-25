import styles from "./StatusBarLarge.module.css";
import stylesTwo from "../modal/InspectionScheduleModal.module.css";
import { LANG } from "../../constants";
import moment from "moment";
import { HeadingFour } from "../headings";
import { InspectionScheduleModal } from "../modal";

/**
 * StatusBarLarge component renders
 * larger variant of status bar
 */

interface StatusBarLargeProps {
  status?: string;
  label: string;
  description?: string;
  showBtn?: boolean;
  btnText?: string;
  timeStamp?: any;
  applicationId?: any;
  inspectionData?: any;
  isChange: boolean;
}

export const StatusBarLarge = ({
  status,
  label,
  description,
  showBtn,
  btnText,
  timeStamp,
  inspectionData,
  applicationId,
  isChange,
}: StatusBarLargeProps) => {
  // Function to format the status label
  const formatLabel = (labelStatus: string) => {
    let lowerLabel = labelStatus.toLowerCase();
    lowerLabel = lowerLabel.charAt(0).toUpperCase() + lowerLabel.slice(1);
    return lowerLabel;
  };

  return (
    <div className={`${styles.status_bar_large}`}>
      {status === LANG.FORM_STATUS.NEW && (
        <div
          className={`${styles.status_bar_large_indicator} text-center mx-3 mt-3 ${styles.status_bar_large_green}`}
        >
          <label>{`Status: ${label && formatLabel(label)}`}</label>
        </div>
      )}
      {status === LANG.FORM_STATUS.UNDER_REVIEW && (
        <div
          className={`${styles.status_bar_large_indicator} text-center mx-3 mt-2 ${styles.status_bar_large_amber}`}
        >
          <label>{`Status: ${label && formatLabel(label)}`}</label>
        </div>
      )}
      {status === LANG.FORM_STATUS.RETURNED && (
        <div
          className={`${styles.status_bar_large_indicator} text-center mx-3 mt-2 ${styles.status_bar_large_red}`}
        >
          <label>{`Status: ${label && formatLabel(label)}`}</label>
        </div>
      )}
      {status === LANG.FORM_STATUS.SENT_FOR_INSPECTION && (
        <div
          className={`${styles.status_bar_large_indicator} text-center mx-3 mt-3 ${styles.status_bar_large_green}`}
        >
          <label>{`Status: Sent for inspection`}</label>
        </div>
      )}
      {status === LANG.FORM_STATUS.INSPECTION_COMPLETED && (
        <div
          className={`${styles.status_bar_large_indicator} text-center mx-3 mt-3 ${styles.status_bar_large_green}`}
        >
          <label>{`Status: Inspection completed`}</label>
        </div>
      )}
      {status === LANG.FORM_STATUS.APPROVED && (
        <div
          className={`${styles.status_bar_large_indicator} text-center mx-3 mt-3 ${styles.status_bar_large_green}`}
        >
          <label>{`Status: ${label && formatLabel(label)}`}</label>
        </div>
      )}
      {status === LANG.FORM_STATUS.REJECTED && (
        <div
          className={`${styles.status_bar_large_indicator} text-center mx-3 mt-2 ${styles.status_bar_large_red}`}
        >
          <label>{`Status: ${label && formatLabel(label)}`}</label>
        </div>
      )}

      {label && label === LANG.FORM_STATUS.NEW && (
        <p className="text-center pt-3">
          {`Received this application on ${moment(new Date(timeStamp)).format(
            "DD/MM/YYYY"
          )}`}
        </p>
      )}
      {label && label === LANG.FORM_STATUS.UNDER_REVIEW && (
        <p className="text-center pt-3">
          Your application is being reviewed, once reviewed we keep you posted
          on the next steps.
        </p>
      )}
      {label && label === LANG.FORM_STATUS.RETURNED && (
        <p className="text-center pt-3">
          Your application is returned due to some errors in the application
          form data. Please resubmit it.
        </p>
      )}
      {label && label === LANG.FORM_STATUS.INSPECTION_COMPLETED && (
        <p className="text-center pt-3">Inspection completed!</p>
      )}
      {label && label === LANG.FORM_STATUS.APPROVED && (
        <p className="text-center pt-3">
          This application is approved with no flaws.
        </p>
      )}
      {label && label === LANG.FORM_STATUS.REJECTED && (
        <p className="text-center pt-3">Rejected</p>
      )}

      {/* For inspection */}
      {label && label === LANG.FORM_STATUS.SENT_FOR_INSPECTION && (
        <>
          <p className="text-center pt-3">
            {`Inspection is scheduled on ${inspectionData.scheduledDate}. Keep all the physical documents ready for the inspection.`}
          </p>
          <hr className="" />
          <div className="pt-1 ps-4 pe-4 pb-4">
            <div className="row">
              <div className="col-sm-12 col-md-10 col-lg-10">
                <HeadingFour heading="Inspection scheduled with" />
              </div>
              {isChange && (
                <div className="col-sm-12 col-md-2 col-lg-2">
                  <div className="float-end">
                    <label
                      className={`${styles.edit_status}`}
                      data-toggle="modal"
                      data-target={`#sendToInspectionEdit`}
                    >
                      <span
                        className={`${styles.edit_status_icon} material-icons pe-2`}
                      >
                        edit
                      </span>
                      Change
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div className="pt-2">
              <label className={`${styles.status_bar_custom_heading}`}>
                Lead inspector
              </label>
              <div className="pt-3">
                {inspectionData &&
                  inspectionData.assignedTo.map((k: any, l: number) => {
                    if (k.leadInspector) {
                      return (
                        <div
                          className={`${stylesTwo.inspector_name_list} mb-2`}
                          key={l}
                        >
                          <div className="row pt-2 ps-3 pe-3">
                            <div className="d-flex flex-row">
                              <div
                                className={`${stylesTwo.inspector_name_square}`}
                              >
                                {k.firstName[0] + k.lastName[0]}
                              </div>
                              <p className="ps-2">{k.firstName}</p>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      if (l === 0) {
                        return (
                          <p className="ps-2" key={l}>
                            No lead inspector found!
                          </p>
                        );
                      } else {
                        return null;
                      }
                    }
                  })}
              </div>
            </div>
            <div className="pt-2">
              <label className={`${styles.status_bar_custom_heading}`}>
                Assisting inspector
              </label>
              <div className="pt-3">
                {inspectionData &&
                  inspectionData.assignedTo.map((k: any, l: number) => {
                    if (!k.leadInspector) {
                      return (
                        <div
                          className={`${stylesTwo.inspector_name_list} mb-2`}
                          key={l}
                        >
                          <div className="row pt-2 ps-3 pe-3">
                            <div className="d-flex flex-row">
                              <div
                                className={`${stylesTwo.inspector_name_square}`}
                              >
                                {k.firstName[0] + k.lastName[0]}
                              </div>
                              <p className="ps-2">{k.firstName}</p>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      if (l === 0) {
                        return (
                          <p className="ps-2" key={l}>
                            No assiting inspectors found!
                          </p>
                        );
                      } else {
                        return null;
                      }
                    }
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
