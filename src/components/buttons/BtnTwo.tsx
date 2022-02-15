import { Link } from "react-router-dom";
import styles from "./BtnTwo.module.css";
import stylesOne from "./BtnOne.module.css";
import "../../styles/global.css"

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
    showIcon?: boolean
    iconValue?: string
}

export const BtnTwo = ({ label, btnType, clickHandler, isLink, link, isModal, floatBottom, modalId, showIcon, iconValue }: BtnTwoProps) => {
    if (btnType === "button") {
        return (
            <>
                {isLink ? (
                    <Link to={link}>
                        <button type="button" onClick={clickHandler} className={`${styles.btn_two} ${floatBottom ? stylesOne.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}>{label}<span className={`${showIcon ? "material-icons vertical_align_bottom ps-2" : ""}`}>{iconValue}</span></button>
                    </Link>
                ) : (
                    <button type="button" onClick={clickHandler} className={`${styles.btn_two} ${floatBottom ? stylesOne.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}>{label}<span className={`${showIcon ? "material-icons vertical_align_bottom ps-2" : ""}`}>{iconValue}</span></button>
                )}

            </>
        )
    } else {
        return (
            <>
                {isLink ? (
                    <Link to={link}>
                        <button type="submit" onClick={clickHandler} className={`${styles.btn_two} ${floatBottom ? stylesOne.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}>{label}<span className={`${showIcon ? "material-icons vertical_align_bottom ps-2" : ""}`}>{iconValue}</span></button>
                    </Link>
                ) : (
                    <button type="submit" onClick={clickHandler} className={`${styles.btn_two} ${floatBottom ? stylesOne.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}>{label}<span className={`${showIcon ? "material-icons vertical_align_bottom ps-2" : ""}`}>{iconValue}</span></button>
                )}
            </>
        )
    }
}