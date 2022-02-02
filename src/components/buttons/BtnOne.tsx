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
}

export const BtnOne = ({ label, btnType, clickHandler, isLink, link, isModal, floatBottom }: BtnOneProps) => {
    if (btnType === "button") {
        return (
            <>
                {isLink ? (
                    <Link to={link}>
                        <button type="button" onClick={clickHandler} className={`${styles.btn_one} ${floatBottom ? styles.btn_float_bottom : ''} mb-4`}>{label}</button>
                    </Link>
                ) : (
                    <button type="button" onClick={clickHandler} className={`${styles.btn_one} ${floatBottom ? styles.btn_float_bottom : ''} mb-4`}>{label}</button>
                )}

            </>
        )
    } else {
        return (
            <>
                {isLink ? (
                    <Link to={link}>
                        <button type="submit" onClick={clickHandler} className={`${styles.btn_one} ${floatBottom ? styles.btn_float_bottom : ''} mb-4`}>{label}</button>
                    </Link>
                ) : (

                    <button type="submit" onClick={clickHandler} className={`${styles.btn_one} ${floatBottom ? styles.btn_float_bottom : ''} mb-4`}>{label}</button>

                )}
            </>
        )
    }
}