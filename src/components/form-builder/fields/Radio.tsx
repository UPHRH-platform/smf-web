
/**
 * Radio component which renders 
 * radio feilds for the forms
 */
 interface RadioProps {
    field?: any
}

export const Radio = ({ field }: RadioProps) => {
    return (
        <div className="form-group">
            <div className="col-md-12 only-label">
                <label htmlFor="dateOfAssessment">
                    {field.values[0].heading}
                </label>
                <p>{field.values[0].subHeading}</p>
            </div>
        </div>
    );
};
