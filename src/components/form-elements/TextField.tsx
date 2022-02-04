import { HeadingFour } from "../headings";
import styles from "./TextField.module.css";

/**
 * TextField component renders
 * text type questions
 */

interface TextFieldProps {
    label?: string
    placeholder?: string
    showLabel: boolean
    type: string
    changeHandler?: (event: any) => void
    enableCheck?: boolean
    checkboxId?: string
    checkBoxValue?: string
    checkBoxLabel?: string
}

export const TextField = ({ label, changeHandler, placeholder, showLabel, type, enableCheck, checkboxId, checkBoxValue, checkBoxLabel }: TextFieldProps) => {
    return (
        <div className={`${styles.text_field_input}`}>
            {showLabel && (
                <>
                    <HeadingFour heading={label} />
                    <br />
                </>
            )}
            <input type={type} placeholder={placeholder} />

            {enableCheck && (
                <div className="form-check">
                    <input className="form-check-input mt-2" type="checkbox" value={checkBoxValue} id={checkboxId} />
                    <label className={`${styles.text_field_checkbox_label} form-check-label ps-2 pt-2`} htmlFor={checkboxId}>
                        {checkBoxLabel}
                    </label>
                </div>
            )}
        </div>
    )
}