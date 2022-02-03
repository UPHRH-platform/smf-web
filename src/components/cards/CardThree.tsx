import styles from "./CardThree.module.css";

/**
 * CardThree component renders
 * basic layout of generic cards
 */

interface CardThreeProps {
    children?: any
}

export const CardThree = ({ children }: CardThreeProps) => {
    return (
        <div className={`${styles.card_three}`}>
            {children}
        </div>
    )
}