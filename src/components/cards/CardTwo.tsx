import { BtnOne } from "../buttons";
import { StatusBar } from "../status-bar";
import styles from "./CardTwo.module.css";

/**
 * CardTwo component renders
 * larger variant of cards
 */

interface CardTwoProps {
    title?: string,
    name?: string,
    time?: string,
    showStatus: boolean,
    status: string,
    statusLabel: string,
    showBtn: boolean,
    type: string,
    btnText: string
    isLink: boolean,
    link: string
}

export const CardTwo = ({ title, name, time, showStatus, status, showBtn, btnText, type, statusLabel, isLink, link }: CardTwoProps) => {
    return (
        <div className={`${styles.card_two}`}>
            <h1>{title}</h1>
            <label className={`${styles.label_one}`}>{name}</label>
            <p className={`${styles.label_two}`}>{time}</p>
            {showStatus && (
                <StatusBar status={status} label={statusLabel} />
            )}
            {showBtn && (
                <BtnOne btnType={type} label={btnText} isLink={isLink} link={link} floatBottom={true} />
            )}
        </div>
    )
}