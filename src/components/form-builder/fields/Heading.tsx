
/**
 * Heading component which renders 
 * heading for the forms
 */
interface HeadingProps {
    field?: any
}

export const Heading = ({ field }: HeadingProps) => {
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
