import styles from "./HeadingThree.module.css";

/**
 * HeadingThree component renders
 * small variant of headings
 */

interface HeadingThreeProps {
    title?: string
}

export const HeadingThree = ({ title }: HeadingThreeProps) => {
    return (
        <h5 className={`${styles.heading_three}`}>{title}</h5>
    )
}