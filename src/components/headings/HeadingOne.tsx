import styles from "./HeadingOne.module.css";

/**
 * HeadingOne component renders
 * larger variant of headings
 */

interface HeadingOneProps {
    heading?: string
}

export const HeadingOne = ({ heading }: HeadingOneProps) => {
    return (
        <h1 className={`${styles.heading_one}`}>{heading}</h1>
    )
}