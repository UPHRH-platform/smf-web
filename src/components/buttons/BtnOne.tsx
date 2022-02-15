import { Link } from "react-router-dom";
import styles from "./BtnOne.module.css";

/**
 * BtnOne component renders
 * outlined variant of primary button
 */

interface BtnOneProps {
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

export const BtnOne = ({ label, btnType, clickHandler, isLink, link, isModal, floatBottom, modalId, showIcon, iconValue }: BtnOneProps) => {
    if (btnType === "button") {
        return (
            <>
                {isLink ? (
                    <Link to={link}>
                        {isModal ? <button type="button" onClick={clickHandler} className={`${styles.btn_one} ${floatBottom ? styles.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}>{label}</button> : <button type="button" onClick={clickHandler} className={`${styles.btn_one} ${floatBottom ? styles.btn_float_bottom : ''} mb-4`}>{label}</button>}
                    </Link>
                ) : (
                    <>
                        {isModal ? <button type="button" onClick={clickHandler} className={`${styles.btn_one} ${floatBottom ? styles.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}>{label}</button> : <button type="button" onClick={clickHandler} className={`${styles.btn_one} ${floatBottom ? styles.btn_float_bottom : ''} mb-4`}>{label}</button>}
                    </>
                )}

            </>
        )
    } else {
        return (
            <>
                {isLink ? (
                    <Link to={link}>
                        {isModal ? <button type="submit" onClick={clickHandler} className={`${styles.btn_one} ${floatBottom ? styles.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}>{label}</button> : <button type="submit" onClick={clickHandler} className={`${styles.btn_one} ${floatBottom ? styles.btn_float_bottom : ''} mb-4`}>{label}</button>}
                    </Link>
                ) : (
                    <>
                        {isModal ? <button type="submit" onClick={clickHandler} className={`${styles.btn_one} ${floatBottom ? styles.btn_float_bottom : ''} mb-4`} data-toggle="modal" data-target={`#${modalId}`}>{label}</button> : <button type="submit" onClick={clickHandler} className={`${styles.btn_one} ${floatBottom ? styles.btn_float_bottom : ''} mb-4`}>{label}</button>}
                    </>
                )}
            </>
        )
    }
}