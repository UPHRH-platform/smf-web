import styles from "./ModalOne.module.css";
import stylesTwo from "./ModalThree.module.css";
import btnStyle from "../buttons/BtnOne.module.css";
import btnStyleTwo from "../buttons/BtnTwo.module.css";
import { SelectField, TextAreaField, TextField } from "../form-elements";
import { BtnOne } from "../buttons";
import { HeadingFive } from "../headings";

/**
 * ModalThree component renders
 * modal with inspection fields
 */

interface ModalThreeProps {
  heading?: string;
  id: string;
  ariaLabel: string;
  textAreaLabel?: string;
  showTextAreaLabel: boolean;
  textAreaPlaceholder?: string;
}

export const ModalThree = ({
  heading,
  id,
  ariaLabel,
  textAreaLabel,
  showTextAreaLabel,
  textAreaPlaceholder,
}: ModalThreeProps) => {
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
      <div className="modal-dialog modal-lg">
        <div className={`${styles.custom_model_content} modal-content`}>
          <div className={`${styles.custom_modal_footer} modal-header`}>
            <h5
              className={`${styles.custom_modal_title} modal-title`}
              id="staticBackdropLabel"
            >
              {heading}
            </h5>
          </div>

          {/* Body */}
          <div
            className={`${styles.custom_modal_body} modal-body m-0 pb-0 pt-0`}
          >
            <div className="row">
              <div className="col-6">
                <div className={`${stylesTwo.text_area_one} p-3`}>
                  <div className="mb-3">
                    <HeadingFive heading="Add lead inspector" count={1} />
                  </div>
                  <div className="row">
                    <div className="col-9">
                      <SelectField
                        showLabel={false}
                        option={[
                          { value: "Inspector 1", key: "Inspector 1" },
                          { value: "Inspector 2", key: "Inspector 2" },
                          { value: "Inspector 3", key: "Inspector 3" },
                        ]}
                        selectId="leadInspector"
                        selectName="leadInspector"
                        placeholder="Select from the list"
                      />
                    </div>
                    <div className="col-2">
                      <BtnOne
                        label="Add"
                        btnType="button"
                        isLink={false}
                        link=""
                      />
                    </div>
                  </div>
                </div>

                <div className={`${stylesTwo.text_area_one} p-3 mt-3`}>
                  <div className="mb-3">
                    <HeadingFive heading="Add assisting inspectors" count={2} />
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-9 col-lg-9">
                      <SelectField
                        showLabel={false}
                        option={[
                          { value: "AInspector 1", key: "AInspector 1" },
                          { value: "AInspector 2", key: "AInspector 2" },
                          { value: "AInspector 3", key: "AInspector 3" },
                        ]}
                        selectId="assistingInspectors"
                        selectName="assistingInspectors"
                        placeholder="Select from the list"
                      />
                    </div>
                    <div className="col-sm-12 col-md-2 col-lg-2">
                      <BtnOne
                        label="Add"
                        btnType="button"
                        isLink={false}
                        link=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className={`${stylesTwo.text_area_one} p-3`}>
                  <div className="mb-3">
                    <HeadingFive heading="Select date" count={3} />
                  </div>
                  <div className="w-100">
                      <TextField label="" showLabel={false} type="date" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
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
                  className={`${btnStyleTwo.btn_two}`}
                  data-dismiss="modal"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
