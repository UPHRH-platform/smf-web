import { useState, useEffect } from "react";
import styles from "./InspectCheckOne.module.css";
import { TextField } from "./TextField";

/**
 * InspectCheckOne component renders
 * inspector input area
 */

interface InspectCheckOneProps {
  label?: string;
  children?: any;
  showComments?: boolean;
  comments?: any;
  modalId?: string;
  modalTriggerLabel?: string;
  clickHandler?: (event: any) => void;
  inspectionValue?: any;
}

export const InspectCheckOne = ({
  label,
  children,
  showComments,
  comments,
  modalId,
  modalTriggerLabel,
  clickHandler,
  inspectionValue,
}: InspectCheckOneProps) => {
  const [insValue, setInsValue] = useState("");

  useEffect(() => {
    if (inspectionValue !== "") {
      setInsValue(inspectionValue);
    }
  }, [inspectionValue]);

  return (
    <div className={`${styles.inspect_check_one} p-4`} onClick={clickHandler}>
      <label>{label}</label>
      <div className="row">
        <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
          <div className="mt-2 float-start">{children}</div>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
          {showComments ? (
            <div className="float-end pt-4">
              <label
                className={`${styles.inspect_check_one_custom_label_one}`}
                data-toggle="modal"
                data-target={`#${modalId}`}
              >
                <span
                  className={`${styles.custom_material_icons} material-icons pe-2`}
                >
                  create
                </span>
                {modalTriggerLabel ? modalTriggerLabel : "Edit reason"}
              </label>
            </div>
          ) : (
            <div className="float-end pt-4">
              <label
                className={`${styles.inspect_check_one_custom_label_one}`}
                data-toggle="modal"
                data-target={`#${modalId}`}
              >
                Add note
                <span
                  className={`${styles.custom_material_icons} material-icons ps-2`}
                >
                  speaker_notes
                </span>
              </label>
            </div>
          )}
        </div>
      </div>

      {showComments && comments && (
        <div className={`${styles.inspect_check_one_comments} mt-3`}>
          <p className="p-0">{comments}</p>
        </div>
      )}

      {inspectionValue && (
        <div className={`mt-3`}>
          <div className="mt-2 col-sm-12 col-md-3 col-lg-3 p-0 m-0">
            <TextField
              showLabel={true}
              label="Actual value"
              isReadOnly={true}
              type="text"
              value={insValue}
            />
          </div>
        </div>
      )}
    </div>
  );
};
