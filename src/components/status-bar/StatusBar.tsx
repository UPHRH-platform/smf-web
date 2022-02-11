import { LANG } from "../../constants";
import styles from "./StatusBar.module.css";

/**
 * StatusGreen component renders
 * new variant of status bar
 */

interface StatusBarProps {
    label?: string
    status?: string
}

export const StatusBar = ({ label, status }: StatusBarProps) => {
    return (
        <div className={`${styles.status_bar}`}>
            {status && 
            (
                status === LANG.FORM_STATUS.NEW ||
                status === LANG.FORM_STATUS.DRAFT
            ) 
            && (
                <label className={`${styles.status_one_label} px-3 m-0`}>{`Status: ${label}`}</label>
            )}
            {status && status === "Under inspection" && (
                <label className={`${styles.status_two_label} px-3 m-0`}>{`Status: ${label}`}</label>
            )}
        </div>
    )
}