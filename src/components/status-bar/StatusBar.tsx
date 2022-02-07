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
            {status && status === "New" || status === 'Submitted' && (
                <label className={`${styles.status_one_label} px-3`}>{`Status: ${label}`}</label>
            )}
            {status && status === "Under inspection" && (
                <label className={`${styles.status_two_label} px-3`}>{`Status: ${label}`}</label>
            )}
        </div>
    )
}