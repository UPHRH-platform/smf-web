import styles from "./CheckBoxField.module.css";
import { HeadingFour } from "../headings";

/**
 * CheckBoxField component renders
 * checkbox type questions
 */

interface CheckBoxFieldProps {
  label?: string;
  value?: any;
  clickHandler?: (event: any) => void;
  isReadOnly?: boolean;
  showLabel?: boolean;
  defaultValues?: any;
}

export const CheckBoxField = ({
  label,
  clickHandler,
  isReadOnly,
  showLabel,
  value,
  defaultValues,
}: CheckBoxFieldProps) => {
  return (
    <div className="">
      {showLabel && (
        <>
          <HeadingFour heading={label} />
          <br />
        </>
      )}

      {defaultValues &&
        defaultValues.map((m: any, n: number) => {
          return (
            <div className={`d-flex flex-row pt-2`} key={n}>
              <label
                className={`${(styles.checkbox_cursor, styles.checkbox_label)}`}
              >
                {value && value.includes(m.value) ? (
                  <span
                    className={`${styles.checkbox_selected} material-icons pe-2`}
                  >
                    check_box
                  </span>
                ) : (
                  <span
                    className={`${styles.checkbox_unselected} material-icons pe-2`}
                  >
                    check_box_outline_blank
                  </span>
                )}
                {m.key}
              </label>
            </div>
          );
        })}
    </div>
  );
};
