import styles from "./StatusBarLarge.module.css";

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
}

export const StatusBarLarge = ({
  status,
  label,
  description,
  showBtn,
  btnText,
}: StatusBarLargeProps) => {
    
  // Function to format the status label
  const formatLabel = (labelStatus: string) => {
    let lowerLabel = labelStatus.toLowerCase();
    lowerLabel = lowerLabel.charAt(0).toUpperCase() + lowerLabel.slice(1);
    return lowerLabel;
  };

  return (
    <div className={`${styles.status_bar_large}`}>
      {status === "green" && (
        <div
          className={`${styles.status_bar_large_indicator} text-center mx-3 mt-3 ${styles.status_bar_large_green}`}
        >
          <label>{`Status: ${label && formatLabel(label)}`}</label>
        </div>
      )}
      {status === "amber" && (
        <div
          className={`${styles.status_bar_large_indicator} text-center mx-3 mt-2 ${styles.status_bar_large_amber}`}
        >
          <label>{`Status: ${label && formatLabel(label)}`}</label>
        </div>
      )}
      {status === "red" && (
        <div
          className={`${styles.status_bar_large_indicator} text-center mx-3 mt-2 ${styles.status_bar_large_red}`}
        >
          <label>{`Status: ${label && formatLabel(label)}`}</label>
        </div>
      )}
      <p className="text-center pt-3">
        Your application is being reviewed, once reviewed we keep you posted on
        the next steps.
      </p>
    </div>
  );
};
