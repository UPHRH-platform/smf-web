import styles from "./StatusBarLarge.module.css";
import { LANG } from "../../constants";
import moment from "moment";

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
}

export const StatusBarLarge = ({
  status,
  label,
  description,
  showBtn,
  btnText,
  timeStamp,
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
          Your application is returned due to some errors in the application form data.
          Please resubmit it.
        </p>
      )}
    </div>
  );
};
