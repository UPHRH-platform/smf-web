import { useEffect } from "react";
import { LANG } from "../../constants";
import styles from "./StatusBar.module.css";

/**
 * StatusGreen component renders
 * new variant of status bar
 */

interface StatusBarProps {
  label: string;
  status?: string;
}

export const StatusBar = ({ label, status }: StatusBarProps) => {
  // Function to format the status label
  const formatLabel = (labelStatus: string) => {
    let lowerLabel = labelStatus.toLowerCase();
    lowerLabel = lowerLabel.charAt(0).toUpperCase() + lowerLabel.slice(1);
    return lowerLabel;
  };

  return (
    <div className={`${styles.status_bar}`}>
      {status &&
        (status === LANG.FORM_STATUS.NEW ||
          status === LANG.FORM_STATUS.DRAFT) && (
          <label
            className={`${styles.status_one_label} px-3 m-0`}
          >{`Status: ${formatLabel(label)}`}</label>
        )}
      {status && status === LANG.FORM_STATUS.UNDER_REVIEW && (
        <label
          className={`${styles.status_two_label} px-3 m-0`}
        >{`Status: ${formatLabel(label)}`}</label>
      )}
      {status && status === LANG.FORM_STATUS.RETURNED && (
        <label
          className={`${styles.status_three_label} px-3 m-0`}
        >{`Status: ${formatLabel(label)}`}</label>
      )}
      {status && status === LANG.FORM_STATUS.SENT_FOR_INSPECTION && (
        <label
          className={`${styles.status_two_label} px-3 m-0`}
        >{`Status: Sent for inspection`}</label>
      )}
      {status && status === LANG.FORM_STATUS.INSPECTION_COMPLETED && (
        <label
          className={`${styles.status_one_label} px-3 m-0`}
        >{`Status: Inspection completed`}</label>
      )}
      {status && status === LANG.FORM_STATUS.APPROVED && (
        <label
          className={`${styles.status_one_label} px-3 m-0`}
        >{`Status: ${formatLabel(label)}`}</label>
      )}
      {status && status === LANG.FORM_STATUS.REJECTED && (
        <label
          className={`${styles.status_three_label} px-3 m-0`}
        >{`Status: ${formatLabel(label)}`}</label>
      )}
    </div>
  );
};
