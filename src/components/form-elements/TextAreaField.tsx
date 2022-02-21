import { useState } from "react";
import { HeadingFour } from "../headings";
import styles from "./TextAreaField.module.css";

/**
 * TextArea component renders
 * textarea type questions
 */

interface TextAreaFieldProps {
  label?: string;
  placeholder?: string;
  showLabel: boolean;
  rows?: number;
  changeHandler?: (event: any) => void;
  showStatus?: boolean;
  value?: string;
  defaultValue?: string;
  isReadOnly?: boolean;
}

export const TextAreaField = ({
  label,
  changeHandler,
  placeholder,
  showLabel,
  showStatus,
  value,
  rows,
  isReadOnly,
  defaultValue,
}: TextAreaFieldProps) => {
  const [characterCount, setCharacterCount] = useState(0);

  const updateCharacterCount = (e: any) => {
    e.preventDefault();

    setCharacterCount(e.target.value.length);
  };

  return (
    <div className="">
      <div className={`${styles.text_field_input}`}>
        {showLabel && (
          <>
            <HeadingFour heading={label} />
            <br />
          </>
        )}
        <textarea
          placeholder={placeholder}
          rows={rows ? rows : 4}
          className={`${styles.text_area_input}`}
          onChange={changeHandler}
          onKeyUp={(e) => {
            updateCharacterCount(e);
          }}
          maxLength={200}
          value={value}
          defaultValue={defaultValue}
          readOnly={isReadOnly ? true : false}
        />

        {showStatus && (
          <p
            className={`${styles.text_area_status} float-end`}
          >{`${characterCount}/200 characters`}</p>
        )}
      </div>
    </div>
  );
};
