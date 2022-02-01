import { Fragment } from "react";
import { HeadingOne, HeadingTwo } from "../../components/headings";
import { CardTwo } from "../../components/cards";
import Header from "../../components/common/Header";
import { useHistory } from 'react-router-dom';

/**
 * ViewApplications component renders
 * application detail page layout and its UI components
 */


interface ViewApplicationsProps {
    data?: any
}

export const ViewApplications = ({ data }: ViewApplicationsProps) => {

    let history = useHistory();
    return (
        <Fragment>
            <Header history={history} />
            <div className="container-fluid">
                <div className="container dashboard-inner-container mt-4">
                    <div className="row">
                        <HeadingOne heading="Paramedical degree" />
                    </div>

                    <div className="row">
                        <div className="col-sm-12 col-md-3 col-lg-4 col-xl-4 col-xxl-4">
                            
                        </div>
                        <div className="col-sm-12 col-md-9 col-lg-8 col-xl-8 col-xxl-8">
                            
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}