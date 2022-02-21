import { useState } from "react";
import styles from "./ModalOne.module.css";
import btnStyle from "../buttons/BtnOne.module.css";
import btnStyleTwo from "../buttons/BtnTwo.module.css";
import { TextAreaField } from "../form-elements";
import { useRecoilState } from "recoil";
import { modalTwoTextArea as modalTwoTextAreaAtom } from "../../states/atoms";

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
  submitHandler?: (event: any) => void;
}

export const ModalTwo = ({
  heading,
  id,
  ariaLabel,
  textAreaLabel,
  showTextAreaLabel,
  textAreaPlaceholder,
  submitHandler,
}: ModalTwoProps) => {
  const [modalTextArea, setModalTextArea] =
    useRecoilState(modalTwoTextAreaAtom);

  const [note, setNote] = useState("");

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    if(note === "") {
      setModalTextArea("Empty!");
    } else {
      setModalTextArea(note);
    }
  };

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
          </div>
          <div
            className={`${styles.custom_modal_footer} modal-footer p-0 m-0 pt-3 pb-3`}
          >
            <div className="col-6 m-0">
              <button
                type="button"
                className={`${btnStyle.btn_one} me-2`}
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
            <div className="col-6 m-0">
              <div className="float-end">
                <button
                  type="button"
                  className={`${btnStyle.btn_one} me-2`}
                  data-dismiss="modal"
                  onClick={(e) => onSubmitHandler(e)}
                >
                  Skip
                </button>
                <button
                  type="button"
                  className={`${btnStyleTwo.btn_two}`}
                  data-dismiss="modal"
                  onClick={(e) => onSubmitHandler(e)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
