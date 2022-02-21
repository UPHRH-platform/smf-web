import { Fragment } from "react";
import Header from "../../components/common/Header";
import { useHistory } from 'react-router-dom';
import { InspectionCompleteLayout } from "../../layouts";

/**
 * InspectionComplete page renders
 * inspection complete components
 */

interface InspectionCompleteProps {
    data?: any;
}

export const InspectionComplete = ({ data }: InspectionCompleteProps) => {
    let history = useHistory();
    return (
        <Fragment>
            <Header history={history} />
            <div className="container-fluid">
                <div className="container dashboard-inner-container mt-4">
                    <InspectionCompleteLayout />
                </div>
            </div>
        </Fragment>
    )
};
