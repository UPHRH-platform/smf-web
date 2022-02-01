import styles from "./BtnOne.module.css";

/**
 * BtnOne component renders
 * outlined variant of primary button
 */

interface BtnOneProps {
    label: string,
    btnType: string,
    clickHandler?: (event: any) => void;
}

export const BtnOne = ({ label, btnType, clickHandler }: BtnOneProps) => {
    if (btnType === "button") {
        return (
            <button type="button" onClick={clickHandler} className={`${styles.btn_one} mb-4`}>{label}</button>
        )
    } else {
        return (
            <button type="submit" onClick={clickHandler} className={`${styles.btn_one} mb-4`}>{label}</button>
        )
    }
}