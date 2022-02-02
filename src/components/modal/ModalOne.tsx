import { BtnOne } from "../buttons";
import styles from "./ModalOne.module.css";
import btnStyle from "../buttons/BtnOne.module.css";

/**
 * ModalOne component renders
 * modal with list view
 */

interface ModalOneProps {
    heading?: string
    list?: any
    id: string
    ariaLabel: string
}

export const ModalOne = ({ heading, list, id, ariaLabel }: ModalOneProps) => {
    return (
        <div className={`modal fade`} tabIndex={-1} id={id} data-backdrop="static" data-keyboard="false" aria-labelledby={ariaLabel} aria-hidden="true">
            <div className="modal-dialog">
                <div className={`${styles.custom_model_content} modal-content`}>
                    <div className={`${styles.custom_modal_footer} modal-header`}>
                        <h5 className={`${styles.custom_modal_title} modal-title`} id="staticBackdropLabel">{heading}</h5>
                    </div>
                    <div className={`${styles.custom_modal_body} modal-body`}>
                        {list && list.map((i: any, j: any) => {
                            return (
                                <div className={`${styles.modal_one_list} mb-2 p-3 position-relative`} key={i.id}>
                                    <h6>{i.title}</h6>
                                    <p className="pb-1">{i.description}</p>
                                    <label className="position-absolute bottom-0 start-0 ps-3">{i.timeline}</label>
                                </div>
                            );
                        })}
                    </div>
                    <div className={`${styles.custom_modal_footer} modal-footer`}>
                        <button type="button" className={`${btnStyle.btn_one}`} data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}