import styles from "./CardFour.module.css";

/**
 * CardFour component renders
 * contact variant of cards
 */

interface CardFourProps {
    title: string
    subTitle?: string
    showLogo: boolean
}

export const CardFour = ({ title, subTitle, showLogo }: CardFourProps) => {
    return (
        <div className={`${styles.card_four} p-4`}>
            <div className="col-12 p-0 m-0">
                <div className="row p-0 m-0">
                    {showLogo && (
                        <div className={`${styles.card_four_logo} col-sm-12 col-md-2 col-lg-2 col-xl-2`}>
                            <p className={`${styles.card_four_logo_text}`}>{title.split(' ')[0][0] + title.split(' ')[1][0]}</p>
                        </div>
                    )}

                    <div className={`${showLogo ? "col-sm-12 col-md-10 col-lg-10 col-xl-10" : "col-12"}`}>
                        <h1>{title}</h1>
                        <label>{subTitle}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}