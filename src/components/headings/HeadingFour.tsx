import styles from "./HeadingFour.module.css";

/**
 * HeadingFour component renders
 * larger variant of headings
 */

interface HeadingFourProps {
    heading?: string
}

export const HeadingFour = ({ heading }: HeadingFourProps) => {
    return (
        <label className={`${styles.heading_four}`}>{heading}</label>
    )
}