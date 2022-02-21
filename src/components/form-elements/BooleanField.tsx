import styles from "./BooleanField.module.css";
import { HeadingFour } from "../headings";

/**
 * Boolean component renders
 * toggle type questions
 */

interface BooleanFieldProps {
  label?: string;
  value?: any;
  clickHandler?: (event: any) => void;
  isReadOnly?: boolean;
  showLabel?: boolean;
  defaultValues?: any;
}

export const BooleanField = ({
  label,
  clickHandler,
  isReadOnly,
  showLabel,
  value,
  defaultValues,
}: BooleanFieldProps) => {
  return (
    <div className="">
      {showLabel && (
        <>
          <HeadingFour heading={label} />
          <br />
        </>
      )}
      <label className="switch">
        <input type="checkbox" id={"field-" + label} name={"field_" + label} disabled={isReadOnly}/>
        <span className="slider round"></span>
      </label>
    </div>
  );
};
