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
  value?: any;
  isMultiple?: boolean;
  defaultValue?: any;
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
  isMultiple,
  defaultValue,
}: SelectFieldProps) => {
  return (
    <div className="">
      {showLabel && (
        <>
          <HeadingFour heading={label} />
          <br />
        </>
      )}
      {defaultValue !== undefined && (
        <select
          name={selectName}
          id={selectId}
          className={`${styles.select_field_input}`}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={isReadOnly}
          multiple={isMultiple}
          onChange={changeHandler}
        >
          {placeholder && (
            <option
              disabled
              className={`${styles.select_field_input_placeholder}`}
            >
              {placeholder}
            </option>
          )}

          {option &&
            option.map((i: any, j: any) => {
              return (
                <option
                  value={i.value}
                  key={j}
                 
                >
                  {i.key}
                </option>
              );
            })}
        </select>
      )}

      {value !== undefined && (
        <select
          name={selectName}
          id={selectId}
          className={`${styles.select_field_input}`}
          value={value}
          placeholder={placeholder}
          disabled={isReadOnly}
          multiple={isMultiple}
          onChange={changeHandler}
        >
          {placeholder && (
            <option
              disabled
              className={`${styles.select_field_input_placeholder}`}
            >
              {placeholder}
            </option>
          )}

          {option &&
            option.map((i: any, j: any) => {
              return (
                <option
                  value={i.value}
                  key={j}
                >
                  {i.key}
                </option>
              );
            })}
        </select>
      )}
    </div>
  );
};
