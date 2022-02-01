import { Component, Fragment } from "react";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import { FormService } from "../../services/form.service";
import { APP } from "../../constants";
import Notify from "../../helpers/notify";
import Helper from "../../helpers/auth";
import { CardOne } from "../cards/CardOne";

/**
 * Dashboard component
 */

const InspectorMetrics = [
  {
    id: 0,
    count: 2,
    title: "Total pending",
  },
  {
    id: 1,
    count: 1,
    title: "Received today",
  },
  {
    id: 2,
    count: 1,
    title: "In progress",
  },
  {
    id: 3,
    count: 0,
    title: "Reviewed today",
  },
  {
    id: 4,
    count: 32,
    title: "Reviewed in total",
  },
];

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forms: [],
      myApplications: [],
    };
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
    if (Helper.getUserRole() === APP.ROLE.INSTITUTION) {
      FormService.get().then(
        (response) => {
          if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
            this.setState({
              forms:
                response.responseData.length > 6
                  ? response.responseData.splice(0, 6)
                  : response.responseData,
            });
            // console.log(response.responseData);
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
      // my applications section
      FormService.getAllApplications().then(
        (response2) => {
          if (response2.statusInfo.statusCode === APP.CODE.SUCCESS) {
            this.setState({
              myApplications:
                response2.responseData.length > 6
                  ? response2.responseData.splice(0, 6)
                  : response2.responseData,
            });
            // console.log(response2.responseData);
          } else {
            Notify.error(response2.statusInfo.errorMessage);
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

  render() {
    return (
      <Fragment>
        <Header history={this.props.history} />
        {Helper.getUserRole() === APP.ROLE.INSTITUTION && (
          <Fragment>
            <div className="container-fluid main-container">
              <div className="container dashboard-inner-container pt-3 pb-3">
                <div className="row">
                  <div className="col-md-10 col-sm-12 col-12 ">
                    <h2>My applications</h2>
                    {true ? (
                      <p className="h2-subheading">
                        These are the active application (s) submitted by you.
                      </p>
                    ) : (
                      <p className="h2-subheading">
                        There is no active applications. Select one from the
                        below list to apply.
                      </p>
                    )}
                  </div>
                  <div className="col-md-2 col-sm-12 col-12 ">
                    <button
                      onClick={(e) => this.props.history.push("/applications")}
                      className="btn btn-default smf-btn-default float-right mr-0"
                    >
                      SEE ALL
                    </button>
                  </div>
                </div>
                <div className="row mt-3">
                  {this.state.myApplications.length > 0 &&
                    this.state.myApplications.map((form, key) => (
                      <div className="col-md-4 col-sm-12 col-12 mb-3" key={key}>
                        <div
                          className="application-item white-bg"
                          style={{ minHeight: "150px" }}
                        >
                          <h3 className="">{form.title}</h3>
                          <span className="h3-subheading d-block black-60 mb-2">
                            Submitted on:{" "}
                            {this.formatDate(
                              `${form.createdDate}` || "2022-01-01"
                            )}
                          </span>
                          <div className="mb-3">
                            <span className="form-status">
                              Status: {form.status}
                            </span>
                          </div>
                          <Link
                            to={
                              "/applications/" +
                              form.formId +
                              "/" +
                              form.applicationId
                            }
                            className="btn btn-default smf-btn-default highlighted mt-3"
                            disabled
                          >
                            View application
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="container-fluid bottom-container">
              <div className="container dashboard-inner-container">
                <div className="row">
                  <div className="col-md-10 col-sm-12 col-12 pt-5">
                    <h2>Available forms</h2>
                    <p className="h2-subheading">
                      These are the available appplication forms for you apply.
                      Click on any of them to start filling
                    </p>
                  </div>
                  <div className="col-md-2 col-sm-12 col-12 pt-5">
                    <button
                      className="btn btn-default smf-btn-default float-right mr-0"
                      onClick={(e) => this.props.history.push("/my-forms")}
                    >
                      SEE ALL
                    </button>
                  </div>
                </div>
                <div className="row mt-3">
                  {this.state.forms.length > 0 &&
                    this.state.forms.map((form, key) => (
                      <div className="col-md-4 mb-4 col-sm-12 col-12" key={key}>
                        <div
                          className="application-item"
                          style={{ minHeight: "150px" }}
                        >
                          <h3 className="">{form.title}</h3>
                          <p className="h3-subheading">
                            {form.description != null
                              ? form.description
                              : "Application form"}
                          </p>
                          <Link
                            to={"/forms/" + form.id}
                            className="btn btn-default smf-btn-default highlighted mt-3"
                          >
                            Apply
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Fragment>
        )}
        {Helper.getUserRole() === APP.ROLE.REGULATOR && (
          <Fragment>
            <div className="container-fluid">
              <div className="container dashboard-inner-container">
                <div className="row pt-5">
                  <div className="col-md-12 col-sm-12 col-12 mb-3">
                    <h2>Your activity</h2>
                  </div>
                  <div className="col-md-2 col-sm-4 col-6 mb-3">
                    <div className="activity-item">
                      <h2 className="">12</h2>
                      <p className="h3-subheading mt-4">Total pending</p>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-4 col-6 mb-3">
                    <div className="activity-item">
                      <h2 className="">8</h2>
                      <p className="h3-subheading mt-4">Recieved today</p>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-4 col-6 mb-3">
                    <div className="activity-item">
                      <h2 className="">4</h2>
                      <p className="h3-subheading mt-4">Pending from past</p>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-4 col-6 mb-3">
                    <div className="activity-item">
                      <h2 className="">7</h2>
                      <p className="h3-subheading mt-4">Total pending</p>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-4 col-6 mb-3">
                    <div className="activity-item">
                      <h2 className="">3</h2>
                      <p className="h3-subheading mt-4">In progress</p>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-4 col-6 mb-3">
                    <div className="activity-item">
                      <h2 className="">12</h2>
                      <p className="h3-subheading mt-4">Reviewed in total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid main-container">
              <div className="container dashboard-inner-container">
                <div className="row pt-5">
                  <div className="col-md-10 col-sm-10 col-10">
                    <h2>Pending applications</h2>
                    <p className="h2-subheading">
                      These are the latest applications which are pending for
                      your review/approval.
                    </p>
                  </div>
                  <div className="col-md-2 col-sm-2 col-2">
                    <button className="btn btn-default smf-btn-default float-right mr-0">
                      SEE ALL
                    </button>
                  </div>
                </div>

                <div className="row mt-3 pb-5">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item, key) => {
                    return (
                      <div className="col-md-3 col-sm-6 col-12 mb-3" key={key}>
                        <div className="dashboard-form-item">
                          <h3 className="">Form {item}</h3>
                          <p className="h3-subheading">
                            <b>Collage name</b>
                            <br />
                            Recieved on: dd/mm/yyy.
                          </p>
                          <div>
                            <button className="form-item-button">
                              Status: New
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
        {Helper.getUserRole() === APP.ROLE.INSPECTOR && (
          <Fragment>
            <div className="container-fluid">
              <div className="container dashboard-inner-container mt-4">
                <div className="row">
                  {InspectorMetrics.map((i, j) => {
                    return(
                      <div
                      className="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2"
                      key={i.id}
                    >
                      <CardOne count={i.count} title={i.title} />
                    </div>
                    )
                   ;
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

export default Dashboard;
