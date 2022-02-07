import styles from "./ModalOne.module.css";
import btnStyle from "../buttons/BtnOne.module.css";
import btnStyleTwo from "../buttons/BtnTwo.module.css";
import { TextAreaField } from "../form-elements";

/**
 * ModalTwo component renders
 * modal with text area view
 */

interface ModalTwoProps {
    heading?: string
    placeholder?: string
    id: string
    ariaLabel: string
}

export const ModalTwo = ({ heading, placeholder, id, ariaLabel }: ModalTwoProps) => {
    return (
        <div className={`modal fade`} tabIndex={-1} id={id} data-backdrop="static" data-keyboard="false" aria-labelledby={ariaLabel} aria-hidden="true">
            <div className="modal-dialog">
                <div className={`${styles.custom_model_content} modal-content`}>
                    <div className={`${styles.custom_modal_footer} modal-header`}>
                        <h5 className={`${styles.custom_modal_title} modal-title`} id="staticBackdropLabel">{heading}</h5>
                    </div>
                    <div className={`${styles.custom_modal_body} modal-body m-0 pb-0 pt-0`}>
                        <TextAreaField showLabel={false} placeholder="Type here" rows={6} />
                    </div>
                    <div className={`${styles.custom_modal_footer} modal-footer`}>
                        <button type="button" className={`${btnStyle.btn_one} me-2`} data-dismiss="modal">Close</button>
                        <button type="button" className={`${btnStyleTwo.btn_two}`} data-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}