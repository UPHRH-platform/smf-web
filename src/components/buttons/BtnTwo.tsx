import { Link } from "react-router-dom";
import styles from "./BtnTwo.module.css";

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
}

export const BtnTwo = ({ label, btnType, clickHandler, isLink, link, isModal }: BtnTwoProps) => {
    if (btnType === "button") {
        return (
            <>
                {isLink ? (
                    <Link to={link}>
                        <button type="button" onClick={clickHandler} className={`${styles.btn_two} mb-4`}>{label}</button>
                    </Link>
                ) : (
                    <button type="button" onClick={clickHandler} className={`${styles.btn_two} mb-4`}>{label}</button>
                )}

            </>
        )
    } else {
        return (
            <>
                {isLink ? (
                    <Link to={link}>
                        <button type="submit" onClick={clickHandler} className={`${styles.btn_two} mb-4`}>{label}</button>
                    </Link>
                ) : (

                    <button type="submit" onClick={clickHandler} className={`${styles.btn_two} mb-4`}>{label}</button>

                )}
            </>
        )
    }
}