import { HeadingFour } from "../headings";
import styles from "./SelectField.module.css";

/**
 * SelectField component renders
 * select type questions
 */

interface SelectFieldProps {
    label?: string
    option: any
    placeholder?: string
    showLabel: boolean
    selectName: string
    selectId: string
    changeHandler?: (event: any) => void
    isReadOnly?: boolean
}

export const SelectField = ({ label, changeHandler, option, showLabel, placeholder, selectName, selectId, isReadOnly }: SelectFieldProps) => {
    return (
        <div className="">
            {showLabel && (
                <>
                    <HeadingFour heading={label} />
                    <br />
                </>
            )}
            <select name={selectName} id={selectId} className={`${styles.select_field_input}`} defaultValue={placeholder}>
                {placeholder && (
                    <option disabled className={`${styles.select_field_input_placeholder}`}>{placeholder}</option>
                )}

                {option.map((i: any, j: any) => {
                    return <option value={i.value} key={j}>{i.label}</option>
                })}
            </select>
        </div>
    )
}