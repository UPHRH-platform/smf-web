import { HeadingFour } from "../headings";
import styles from "./TextField.module.css";
import moment from "moment";

/**
 * TextField component renders
 * text type questions
 */

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  showLabel: boolean;
  type: string;
  changeHandler?: (event: any) => void;
  enableCheck?: boolean;
  checkboxId?: string;
  checkBoxValue?: string;
  checkBoxLabel?: string;
  isReadOnly?: boolean;
}

export const TextField = ({
  label,
  changeHandler,
  placeholder,
  showLabel,
  type,
  enableCheck,
  checkboxId,
  checkBoxValue,
  checkBoxLabel,
  value,
  defaultValue,
  isReadOnly,
}: TextFieldProps) => {
  let today = new Date();

  return (
    <div className={`${styles.text_field_input}`}>
      {showLabel && (
        <>
          <HeadingFour heading={label} />
          <br />
        </>
      )}

      {isReadOnly ? (
        type === "date" ? (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            min={moment(today, "DD-MM-YYYY").format("YYYY-MM-DD")}
            defaultValue={defaultValue}
            readOnly
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            readOnly
          />
        )
      ) : type === "date" ? (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          min={moment(today, "DD-MM-YYYY").format("YYYY-MM-DD")}
          defaultValue={defaultValue}
          onChange={changeHandler}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={changeHandler}
        />
      )}

      {enableCheck && (
        <div className="form-check">
          <input
            className="form-check-input mt-2"
            type="checkbox"
            value={checkBoxValue}
            id={checkboxId}
          />
          <label
            className={`${styles.text_field_checkbox_label} form-check-label ps-2 pt-2`}
            htmlFor={checkboxId}
          >
            {checkBoxLabel}
          </label>
        </div>
      )}
    </div>
  );
};
