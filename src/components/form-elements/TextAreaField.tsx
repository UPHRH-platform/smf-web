import { useState } from "react";
import { HeadingFour } from "../headings";
import styles from "./TextAreaField.module.css";

/**
 * TextArea component renders
 * textarea type questions
 */

interface TextAreaFieldProps {
    label?: string
    placeholder?: string
    showLabel: boolean
    changeHandler?: (event: any) => void
    showStatus?: boolean
    value?: string
}

export const TextAreaField = ({ label, changeHandler, placeholder, showLabel, showStatus, value }: TextAreaFieldProps) => {
    const [characterCount, setCharacterCount] = useState(0);

    const updateCharacterCount = (e: any) => {
        e.preventDefault();

        setCharacterCount(e.target.value.length);
    }

    return (
        <div className={`${styles.custom_width}`}>
            <div className={`${styles.text_field_input}`} >
                {showLabel && (
                    <>
                        <HeadingFour heading={label} />
                        <br />
                    </>
                )}
                <textarea placeholder={placeholder} rows={4} className={`${styles.text_area_input}`} onChange={changeHandler} onKeyUp={(e) => { updateCharacterCount(e) }} maxLength={200} />

                {showStatus && (
                    <p className={`${styles.text_area_status} float-end`}>{`${characterCount}/200 characters`}</p>
                )}
            </div>
        </div>
    )
}