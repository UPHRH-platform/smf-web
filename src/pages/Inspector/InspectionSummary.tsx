import { Fragment, useEffect } from "react";
import Header from "../../components/common/Header";
import { useHistory } from 'react-router-dom';
import { InspectionSummaryLayout } from "../../layouts";

/**
 * InspectionSummary page renders
 * inspector summary components
 */

interface InspectionSummaryProps {
    data?: any;
}

export const InspectionSummary = ({ data }: InspectionSummaryProps) => {
    let history = useHistory();
    
    return (
        <Fragment>
            <Header history={history} />
            <div className="container-fluid">
                <div className="container dashboard-inner-container mt-4">
                    <InspectionSummaryLayout data={history}/>
                </div>
            </div>
        </Fragment>
    )
};
