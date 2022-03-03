import styles from "./HeadingFive.module.css";

/**
 * HeadingFive component renders
 * larger variant of headings with prefix icon
 */

interface HeadingFiveProps {
  heading?: string;
  count?: number;
}

export const HeadingFive = ({ heading, count }: HeadingFiveProps) => {
  return (
    <div className="d-flex flex-row">
      <div className={`${styles.heading_prefix_circle} me-3`}>{count}</div>
      <label className={`${styles.heading_five}`}>{heading}</label>
    </div>
  );
};
