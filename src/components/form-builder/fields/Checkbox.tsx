import { LANG } from "./../../../constants/index"

/**
 * Checkbox component which renders 
 * checkbox for the forms
 */
interface CheckboxProps {
    field?: any
}

export const Checkbox = ({ field }: CheckboxProps) => {
    return (
        <div className="form-group">
            <div
                className={`col-md-${field.width ? field.width : LANG.DEFAULT_COL
                    }`}
            >
                <label>{field.name}</label>
                {field.values.map((option: any, key: any) => (
                    <div className="checkbox" key={key}>
                        <label htmlFor={"field-" + field.order}>
                            <input
                                className="mr-2"
                                type="checkbox"
                                name={"field-" + field.order}
                                value={option.key}
                            />
                            {" " + option.value}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};
