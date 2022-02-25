/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./ModalOne.module.css";
import btnStyle from "../buttons/BtnOne.module.css";
import btnStyleTwo from "../buttons/BtnTwo.module.css";
import { TextAreaField, TextField } from "../form-elements";
import { useRecoilState } from "recoil";
import {
  modalTwoTextArea as modalTwoTextAreaAtom,
  modalTwoInspectionValue as modalTwoInspectionValueAtom,
} from "../../states/atoms";

/**
 * ModalTwo component renders
 * modal with text area view
 */

interface ModalTwoProps {
  heading?: string;
  id: string;
  ariaLabel: string;
  textAreaLabel?: string;
  showTextAreaLabel: boolean;
  textAreaPlaceholder?: string;
  enableHandler: boolean;
  enableSkip: boolean;
  subFieldType?: string;
  submitHandler?: (event: any) => void;
  cancelHandler?: (event: any) => void;
  subHeading?: string;
}

export const ModalTwo = ({
  heading,
  id,
  ariaLabel,
  textAreaLabel,
  showTextAreaLabel,
  textAreaPlaceholder,
  enableHandler,
  submitHandler,
  enableSkip,
  cancelHandler,
  subHeading,
  subFieldType,
}: ModalTwoProps) => {
  const [modalTextArea, setModalTextArea] =
    useRecoilState(modalTwoTextAreaAtom);
  const [modalInspectionValue, setModalInspectionValue] = useRecoilState(
    modalTwoInspectionValueAtom
  );

  const [enableSubmit, setEnableSubmit] = useState(false);

  const [note, setNote] = useState("");
  const [correctValue, setCorrectValue] = useState("");

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    if (note === "") {
      setModalTextArea("Empty!");
    } else {
      setModalTextArea(note);
    }

    if (correctValue === "" && subHeading) {
      setModalInspectionValue("Empty!");
    } else {
      setModalInspectionValue(correctValue);
    }
  };

  useEffect(() => {
    setNote("");
    setCorrectValue("");
  }, [id]);

  useEffect(() => {
    if (note.length) {
      if (subHeading && correctValue.length) {
        setEnableSubmit(true);
      } else if (subHeading === "") {
        setEnableSubmit(true);
      } else {
        if (!subHeading) {
          setEnableSubmit(true);
        } else {
          setEnableSubmit(false);
        }
      }
    } else {
      setEnableSubmit(false);
    }
  }, [note, correctValue]);

  return (
    <div
      className={`modal fade`}
      tabIndex={-1}
      id={id}
      data-backdrop="static"
      data-keyboard="false"
      aria-labelledby={ariaLabel}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className={`${styles.custom_model_content} modal-content`}>
          <div className={`${styles.custom_modal_footer} modal-header`}>
            <h5
              className={`${styles.custom_modal_title} modal-title`}
              id="staticBackdropLabel"
            >
              {heading}
            </h5>
          </div>
          <div
            className={`${styles.custom_modal_body} modal-body m-0 pb-0 pt-0`}
          >
            <TextAreaField
              showLabel={showTextAreaLabel}
              placeholder={textAreaPlaceholder}
              rows={6}
              label={textAreaLabel}
              value={note}
              changeHandler={(e) => setNote(e.target.value)}
            />

            {subHeading && (
              <div className="mt-2">
                <TextField
                  showLabel={true}
                  label={subHeading}
                  isReadOnly={false}
                  type="text"
                  value={correctValue}
                  changeHandler={(e) => setCorrectValue(e.target.value)}
                />
              </div>
            )}
          </div>
          <div
            className={`${styles.custom_modal_footer} modal-footer p-0 m-0 pt-3 pb-3`}
          >
            <div className="col-6 m-0">
              {!enableHandler ? (
                <button
                  type="button"
                  className={`${btnStyle.btn_one} me-2`}
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  className={`${btnStyle.btn_one} me-2`}
                  data-dismiss="modal"
                  onClick={cancelHandler}
                >
                  Cancel
                </button>
              )}
            </div>
            <div className="col-6 m-0">
              <div className="float-end">
                {enableSkip &&
                  (!enableHandler ? (
                    <button
                      type="button"
                      className={`${btnStyle.btn_one} me-2`}
                      data-dismiss="modal"
                      onClick={(e) => onSubmitHandler(e)}
                    >
                      Skip
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`${btnStyle.btn_one} me-2`}
                      data-dismiss="modal"
                      onClick={submitHandler}
                    >
                      Skip
                    </button>
                  ))}

                {!enableHandler ? (
                  enableSubmit ? (
                    <button
                      type="button"
                      className={`${btnStyleTwo.btn_two}`}
                      data-dismiss="modal"
                      onClick={(e) => {
                        onSubmitHandler(e);
                      }}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`${btnStyleTwo.btn_two}`}
                      disabled={true}
                    >
                      Submit
                    </button>
                  )
                ) : enableSubmit ? (
                  <button
                    type="button"
                    className={`${btnStyleTwo.btn_two}`}
                    data-dismiss="modal"
                    onClick={submitHandler}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`${btnStyleTwo.btn_two_disabled}`}
                    disabled={true}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
