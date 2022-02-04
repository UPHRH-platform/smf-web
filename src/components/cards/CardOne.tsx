import styles from "./CardOne.module.css";

/**
 * CardOne component renders
 * smaller variant of cards
 */

interface CardOneProps {
    count?: number,
    title?: string
}

export const CardOne = ({ count, title }: CardOneProps) => {
    return (
        <div className={`${styles.card_one}`}>
            <h1>{count}</h1>
            <label>{title}</label>
        </div>
    )
}