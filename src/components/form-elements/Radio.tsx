import styles from "./Radio.module.css";
import styleOne from "./TextField.module.css";

/**
 * Radio component renders
 * radio type questions
 */

interface RadioProps {
    label: string
    clickHandler?: (event: any) => void
    isSelected: boolean
}

export const Radio = ({ label, clickHandler, isSelected }: RadioProps) => {
    if (isSelected) {
        return (
            <button className={`${styles.custom_radio_btn_selected} p-2 px-3`} onClick={clickHandler}><span className={`${styles.custom_radio_icon_selected} material-icons pe-2`}>radio_button_checked</span>{label}</button>
        )
    } else {
        return (
            <button className={`${styles.custom_radio_btn_unselected} p-2 px-3`} onClick={clickHandler}><span className={`${styles.custom_radio_icon_unselected} material-icons pe-2`}>radio_button_unchecked</span>{label}</button>
        )
    }
}