import { Component, Fragment } from "react";
import Header from "./../../components/common/Header";
import { Link } from "react-router-dom";
import { FormService } from "./../../services/form.service";
import { APP } from "./../../constants";
import Notify from "./../../helpers/notify";
import Helper from "./../../helpers/auth";
import { ViewApplications } from "..";

/**
 * ReviewerApplications Component
 */

interface ReviewerApplicationsProps {
    history: any
}

interface ReviewerApplicationsState {
    applications: Array<{
        title: string,
        createdDate: Date,
        status: string
    }>,
    filteredApplications: Array<{
        title: string,
        createdDate: Date,
        status: string
    }>,
    currentStatus: string,
}

const FORM_STATUS = [
    "New",
    "Under review",
    "Returned",
    "Sent for inspection",
    "Inspection completed",
    "Approved"
];

class ReviewerApplications extends Component<ReviewerApplicationsProps, ReviewerApplicationsState> {
    constructor(props: any) {
        super(props);

        this.state = {
            applications: [],
            filteredApplications: [],
            currentStatus: "New",
        };
        this.filterApplications = this.filterApplications.bind(this);
    }

    componentDidMount() {
        if (Helper.getUserRole() === APP.ROLE.REGULATOR) {
            let data = {
                "searchObjects": [
                ]
            };
            FormService.getAllApplications(data).then(
                (response) => {
                    if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
                        this.setState({
                            applications:
                                response.responseData,
                        });
                        this.filterApplications("New");
                    } else {
                        Notify.error(response.statusInfo.errorMessage);
                    }
                },
                (error) => {
                    error.statusInfo
                        ? Notify.error(error.statusInfo.errorMessage)
                        : Notify.error(error.message);
                }
            );
        }
    }

    filterApplications = (status: string) => {
        // if (status === "New") status = "Submitted";
        let applications = [];
        for (let i = 0; i < this.state.applications.length; i++) {
            if (this.state.applications[i].status === status || (status === "New" && this.state.applications[i].status === "Submitted")) {
                applications.push(this.state.applications[i]);
            }
        }
        this.setState({
            currentStatus: status,
            filteredApplications: applications
        });

    }

    formatDate(dateParam: any) {
        const date = new Date(`${dateParam}`);
        return date
            .toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })
            .replace(/ /g, " ");
    }

    render() {
        return (
            <Fragment>
                <Header history={this.props.history} />

                {Helper.getUserRole() === APP.ROLE.REGULATOR && (
                    <Fragment>
                        <div className="container-fluid">
                            <div className="container dashboard-inner-container">
                                <div className="row mt-5">
                                    <div className="col-md-12 col-sm-12 col-12">
                                        <h2>All applications</h2>
                                    </div>
                                </div>

                                <div className="row mt-5 pl-3">
                                    <div className="col-md-12 item-container">
                                        {FORM_STATUS.map((status, key) => {
                                            return (
                                                <Link
                                                    key={key}
                                                    to={"#"}
                                                    onClick={e => this.filterApplications(status)}
                                                    className={`tab paddingTop10 ml-0 pl-4 pr-4 pt-3 pb-2 ${status === this.state.currentStatus ? 'active' : ''} `}
                                                >
                                                    {status}
                                                </Link>
                                            );
                                        })}
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid main-container">
                            <div className="container dashboard-inner-container">

                                <div className="row mt-1 pb-5">
                                    {this.state.filteredApplications.map((application, key) => {
                                        return (
                                            <div className="col-md-3 col-sm-6 col-12 mb-3" key={key}>
                                                <div className="dashboard-form-item">
                                                    <h3 className="">{application.title}</h3>
                                                    <p className="h3-subheading">
                                                        <b>Collage name</b>
                                                        <br />
                                                        Recieved on: {" "}
                                                        {this.formatDate(
                                                            `${application.createdDate}` || "2022-01-01"
                                                        )}
                                                    </p>
                                                    <div>
                                                        <button className="form-item-button">
                                                            Status: {application.status}
                                                        </button>
                                                    </div>
                                                    <div className="mt-3">
                                                        <button className="btn btn-default smf-btn-default highlighted mt-2">
                                                            View application
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}

            </Fragment>
        );
    }
}

export default ReviewerApplications;
