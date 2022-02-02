import styles from "./StatusBarLarge.module.css";

/**
 * StatusGreen component renders
 * new variant of status bar
 */

interface StatusBarLargeProps {
    label?: string
    status?: string
    description?: string
    showBtn?: boolean
    btnText?: string
}

export const StatusBarLarge = ({ label, status, description, showBtn, btnText }: StatusBarLargeProps) => {
    return (
        <div className={`${styles.status_bar}`}>
            {status && status === "New" && (
                <label className={`${styles.status_one_label} px-3`}>{`Status: ${label}`}</label>
            )}
            {status && status === "Under inspection" && (
                <label className={`${styles.status_two_label} px-3`}>{`Status: ${label}`}</label>
            )}
        </div>
    )
}