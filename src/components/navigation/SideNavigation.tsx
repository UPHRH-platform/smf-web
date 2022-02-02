import styles from "./SideNavigation.module.css";

/**
 * SideNavigation component renders
 * side menu for the applications
 */

interface SideNavigationProps {
    text?: string
    isSelected?: boolean
    clickHandler?: (event: any) => void
}

export const SideNavigation = ({ text, isSelected, clickHandler }: SideNavigationProps) => {
    if (isSelected) {
        return (
            <p className={`${styles.side_navigation_selected} p-3 m-0`} onClick={clickHandler}>{text}</p>
        )
    } else {
        return (
            <p className={`${styles.side_navigation_unselected} p-3 m-0`} onClick={clickHandler}>{text}</p>
        )
    }
}