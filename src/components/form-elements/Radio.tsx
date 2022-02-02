import styles from "./Radio.module.css";

/**
 * Radio component renders
 * radio type questions
 */

interface RadioProps {
    question?: string
    options?: []
}

export const Radio = ({ question, options }: RadioProps) => {
    return (
        <div className={`${styles.custom_radio_card} p-4`}>
            <h5>Lorem ipsum doalr sit amet</h5>
            <div className="d-flex flex-row pt-4">
                <button className={`${styles.custom_radio_btn_selected} me-3 p-2 px-3`}><span className={`${styles.custom_radio_icon_selected} material-icons pe-2`}>radio_button_checked</span>Yes</button>
                <button className={`${styles.custom_radio_btn_unselected} p-2 px-3`}><span className={`${styles.custom_radio_icon_unselected} material-icons pe-2`}>radio_button_unchecked</span>No</button>
            </div>
        </div>
    )
}