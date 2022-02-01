import styles from "./HeadingOne.module.css";

/**
 * HeadingOne component renders
 * larger variant of headings
 */

interface SideNavigationProps {
    text?: string
    isSelected?: string
}

export const SideNavigation = ({ text, isSelected }: SideNavigationProps) => {
    return (
        <label className={`${isSelected} ? ${styles.side_navigation_unselected} : ${styles.side_navigation_selected}`}>{text}</label>
    )
}