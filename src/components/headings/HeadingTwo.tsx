import styles from "./HeadingTwo.module.css";

/**
 * HeadingTwo component renders
 * small variant of headings
 */

interface HeadingTwoProps {
    heading?: string
}

export const HeadingTwo = ({ heading }: HeadingTwoProps) => {
    return (
        <label className={`${styles.heading_two}`}>{heading}</label>
    )
}