import styles from "./CardFive.module.css";

/**
 * CardFive component renders
 * contact variant of cards
 */

interface CardFiveProps {
    content: string
}

export const CardFive = ({ content }: CardFiveProps) => {
    return (
        <div className={`${styles.card_five} p-3`}>
            <div className="col-12 p-0 m-0">
               <p>{content}</p> 
            </div>
        </div>
    )
}