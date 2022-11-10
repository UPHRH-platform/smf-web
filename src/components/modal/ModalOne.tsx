import styles from "./ModalOne.module.css";
/* eslint-disable @typescript-eslint/no-unused-vars */
import btnStyle from "../buttons/BtnOne.module.css";
import { LANG } from "../../constants";

/**
 * ModalOne component renders
 * modal with list view
 */

interface ModalOneProps {
  heading?: string;
  list?: any;
  id: string;
  ariaLabel: string;
}

export const ModalOne = ({ heading, list, id, ariaLabel }: ModalOneProps) => {
  const formatStatus = (status: string) => {
    let formatedStatus = "";
    switch (status) {
      case LANG.FORM_STATUS.INSPECTION_COMPLETED:
        formatedStatus = `${LANG.FORM_STATUS_TEXT.INSPECTION_COMPLETED}`;
        break;
      case LANG.FORM_STATUS.RETURNED:
        formatedStatus = "Returned";
        break;
      case LANG.FORM_STATUS.DRAFT:
        formatedStatus = "Draft";
        break;
      case LANG.FORM_STATUS.NEW:
        formatedStatus = "New";
        break;
      case LANG.FORM_STATUS.APPROVED:
        formatedStatus = "Approved";
        break;
      case LANG.FORM_STATUS.REJECTED:
        formatedStatus = "Rejected";
        break;
      case LANG.FORM_STATUS.PUBLISH:
        formatedStatus = "Published";
        break;
      case LANG.FORM_STATUS.UNDER_REVIEW:
        formatedStatus = "Under review";
        break;
      case LANG.FORM_STATUS.UNPUBLISH:
        formatedStatus = "Unpublished";
        break;
      case LANG.FORM_STATUS.SENT_FOR_INSPECTION:
        formatedStatus = `${LANG.FORM_STATUS_TEXT.SENT_FOR_INSPECTION}`;
        break;
      default:
        formatedStatus = "";
        break;
    }
    return formatedStatus;
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
          <div className={`${styles.custom_modal_body} modal-body`}>
            {list &&
              list.map((i: any, j: any) => {
                return (
                  <div
                    className={`${styles.modal_one_list} mb-2 p-3 position-relative`}
                    key={j}
                  >
                    <h6>
                      {i.changes["status"]["ChangedTo"] &&
                        formatStatus(i.changes["status"]["ChangedTo"])}
                    </h6>
                    <p className="pb-1">{i.description}</p>
                    <label className="position-absolute bottom-0 start-0 ps-3">
                      {i.updatedDate}
                    </label>
                  </div>
                );
              })}
          </div>
          <div className={`${styles.custom_modal_footer} modal-footer`}>
            <button
              type="button"
              className={`${btnStyle.btn_one}`}
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function formatStatus(arg0: any): import("react").ReactNode {
  throw new Error("Function not implemented.");
}
