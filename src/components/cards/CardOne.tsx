import styles from "./CardOne.module.css";

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