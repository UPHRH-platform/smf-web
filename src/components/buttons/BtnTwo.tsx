import { Link } from "react-router-dom";
import styles from "./BtnTwo.module.css";
import stylesOne from "./BtnOne.module.css";

/**
 * BtnTwo component renders
 * filled variant of primary button
 */

interface BtnTwoProps {
    label: string,
    btnType: string,
    clickHandler?: (event: any) => void
    isLink: boolean
    link: string
    isModal: boolean
    floatBottom?: boolean
    modalId?: string
}

export const BtnTwo = ({ label, btnType, clickHandler, isLink, link, isModal, floatBottom, modalId }: BtnTwoProps) => {
    if (btnType === "button") {
        return (
            <>
                {isLink ? (
                    <Link to={link}>
                        <button type="button" onClick={clickHandler} className={`${styles.btn_two} ${floatBottom ? stylesOne.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}>{label}</button>
                    </Link>
                ) : (
                    <button type="button" onClick={clickHandler} className={`${styles.btn_two} ${floatBottom ? stylesOne.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}>{label}</button>
                )}

            </>
        )
    } else {
        return (
            <>
                {isLink ? (
                    <Link to={link}>
                        <button type="submit" onClick={clickHandler} className={`${styles.btn_two} ${floatBottom ? stylesOne.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}>{label}</button>
                    </Link>
                ) : (

                    <button type="submit" onClick={clickHandler} className={`${styles.btn_two} ${floatBottom ? stylesOne.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}>{label}</button>

                )}
            </>
        )
    }
}