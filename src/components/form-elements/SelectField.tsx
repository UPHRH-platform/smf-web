import { HeadingFour } from "../headings";
import styles from "./SelectField.module.css";

/**
 * SelectField component renders
 * select type questions
 */

interface SelectFieldProps {
  label?: string;
  option: any;
  placeholder?: string;
  showLabel: boolean;
  selectName: string;
  selectId: string;
  changeHandler?: (event: any) => void;
  isReadOnly?: boolean;
  value?: string;
}

export const SelectField = ({
  label,
  changeHandler,
  option,
  showLabel,
  placeholder,
  selectName,
  selectId,
  isReadOnly,
  value,
}: SelectFieldProps) => {
  return (
    <div className="">
      {showLabel && (
        <>
          <HeadingFour heading={label} />
          <br />
        </>
      )}
      <select
        name={selectName}
        id={selectId}
        className={`${styles.select_field_input}`}
        value={value}
        defaultValue={placeholder}
        disabled={isReadOnly}
      >
        {placeholder && (
          <option
            disabled
            className={`${styles.select_field_input_placeholder}`}
          >
            {placeholder}
          </option>
        )}

        {option.map((i: any, j: any) => {
          return (
            <option
              value={i.key}
              key={j}
            >
              {i.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};
