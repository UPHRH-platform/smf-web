import { Link } from "react-router-dom";
import styles from "./BtnThree.module.css";
import stylesOne from "./BtnOne.module.css";

/**
 * BtnThree component renders
 * transparent variant of secondary button
 */

interface BtnThreeProps {
    label: string,
    btnType: string,
    clickHandler?: (event: any) => void
    isLink: boolean
    link: string
    isModal?: boolean
    floatBottom?: boolean
    modalId?: string
    showIcon?: boolean
    iconValue?: string
}

export const BtnThree = ({ label, btnType, clickHandler, isLink, link, isModal, floatBottom, modalId, showIcon, iconValue }: BtnThreeProps) => {
    if (btnType === "button") {
        return (
            <>
                {isLink ? (
                    <Link to={link}>
                        <button type="button" onClick={clickHandler} className={`${styles.btn_three} ${floatBottom ? stylesOne.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}><span className={`${showIcon} ? 'materical-icons: ''`}>{iconValue}</span>{label}</button>
                    </Link>
                ) : (
                    <button type="button" onClick={clickHandler} className={`${styles.btn_three} ${floatBottom ? stylesOne.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}><span className={`${showIcon} ? 'materical-icons: ''`}>{iconValue}</span>{label}</button>
                )}

            </>
        )
    } else {
        return (
            <>
                {isLink ? (
                    <Link to={link}>
                        <button type="submit" onClick={clickHandler} className={`${styles.btn_three} ${floatBottom ? stylesOne.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}><span className={`${showIcon} ? 'materical-icons: ''`}>{iconValue}</span>{label}</button>
                    </Link>
                ) : (
                    <button type="submit" onClick={clickHandler} className={`${styles.btn_three} ${floatBottom ? stylesOne.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}><span className={`${showIcon} ? 'materical-icons: ''`}>{iconValue}</span>{label}</button>
                )}
            </>
        )
    }
}