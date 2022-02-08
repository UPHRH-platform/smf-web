import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FormService } from "../../services/form.service";
import { APP } from "../../constants";
import Notify from "../../helpers/notify";
import Header from "../common/Header";
import { HeadingOne, HeadingTwo } from "../headings";
import { CardTwo } from "../cards";

class ListMyApplications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forms: [],
        };
        this.searchApplications = this.searchApplications.bind(this);
    }

    formatDate(dateParam) {
        const date = new Date(`${dateParam}`);
        return date
            .toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })
            .replace(/ /g, " ");
    }

    componentDidMount() {
        const myApplicationsReq = {
            "searchObjects": [

            ]
        }
        FormService.getAllApplications(myApplicationsReq).then(
            (response) => {
                if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
                    this.setState({
                        forms: response.responseData,
                    });
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

    searchApplications = (event) => {
        var input, filter, formContainer, formItems, a, i, txtValue;
        input = event.target.value;
        filter = input.toUpperCase();
        formContainer = document.getElementById("forms-container");
        formItems = formContainer.getElementsByClassName("application-item");
        for (i = 0; i < formItems.length; i++) {
            a = formItems[i].getElementsByClassName("form-title")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                formItems[i].parentNode.style.display = "";
            } else {
                formItems[i].parentNode.style.display = "none";
            }
        }
    };

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    render() {
        return (
            <Fragment>
                <Header history={this.props.history} />
                <div className="container-fluid main-container h-100 heightMin">
                    <div className="container dashboard-inner-container">
                        <div className="tabText">
                            <div className="row">
                                <div className="col-md-10 col-sm-12 col-12">
                                    <HeadingOne heading="My applications" />
                                    {this.state.forms && this.state.forms.length ? (
                                        <HeadingTwo heading="These are the active application (s) submitted by you." />
                                    ) : (
                                        <HeadingTwo
                                            heading="There is no active applications. Select one from the below
                    list to apply."
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="row mt-4 mb-4">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group has-search">
                                                <i className="material-icons form-control-feedback">
                                                    search
                                                </i>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="search-roles"
                                                    placeholder="Search for an application"
                                                    autoComplete="off"
                                                    onKeyUp={(event) => this.searchApplications(event)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row" id="forms-container">
                                {this.state.forms.map((i, key) => (
                                    <div
                                        className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mb-3"
                                        key={i.applicationId}
                                    >
                                        <CardTwo
                                            title={i.title}
                                            name={i.createdBy}
                                            time={`Created on: ${i.createdDate}`}
                                            showStatus={true}
                                            status={i.status}
                                            statusLabel={i.status}
                                            showBtn={true}
                                            type="button"
                                            btnText="View application"
                                            isLink={true}
                                            link={
                                                "/applications/" +
                                                i.formId
                                                + "/" +
                                                i.applicationId
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ListMyApplications;
