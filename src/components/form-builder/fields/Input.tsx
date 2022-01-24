import React, { useEffect, useState } from "react";
import { LANG } from "./../../../constants/index"

/**
 * Input component which renders 
 * input fields for the forms
 */
interface InputProps {
    field?: any
}

export const Input = ({ field }: InputProps) => {
    const [fieldType, setFieldType] = useState("");

    useEffect(() => {
        // if (
        //     LANG.FIELD_TYPES.numeric === LANG.FIELD_TYPES[field.fieldType]
        // ) {
        //     setFieldType(LANG.NUMBER);
        // } else {
        //     setFieldType(field.fieldType)
        // }
        // if (field.isRequired) {
        //     document.getElementById(
        //         "field-" + field.order
        //     ).required = true;
        // }
    }, [])
    return (
        <div className="form-group">
            <div
                className={`col-md-${field.width ? field.width : LANG.DEFAULT_COL
                    }`}
            >
                <label htmlFor={"field-" + field.order}>
                    {field.name}
                </label>

                {fieldType !== "number" && (
                    <input
                        type={fieldType}
                        id={"field-" + field.order}
                        name={"field-" + field.order}
                        className="form-control"
                        placeholder="Type here..."
                        autoComplete="off"
                    />
                )}

                {fieldType === "number" && (
                    <input
                        type={fieldType}
                        id={"field-" + field.order}
                        name={"field-" + field.order}
                        className="form-control"
                        step=".01"
                        placeholder="Type here..."
                        autoComplete="off"
                    />
                )}
            </div>
        </div>
    );
};
