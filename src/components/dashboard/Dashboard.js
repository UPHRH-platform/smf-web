import { Component, Fragment } from "react";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import { FormService } from "../../services/form.service";
import { APP } from "../../constants";
import Notify from "../../helpers/notify";
import Helper from "../../helpers/auth";
import { InspectorHome } from "../../pages";
import { ReviewerHome } from "../../pages/Reviewer/ReviewerHome";
import { CardTwo } from "../cards";

/**
 * Dashboard component
 */

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
      const myApplicationsReq = {
        "searchObjects": [

        ]
      }
      FormService.getAllApplications(myApplicationsReq).then(
        (response2) => {
          if (response2.statusInfo.statusCode === APP.CODE.SUCCESS) {
            this.setState({
              myApplications:
                response2.responseData.length > 8
                  ? response2.responseData.splice(0, 8)
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
                    this.state.myApplications.map((i, key) => (
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
                      onClick={(e) => this.props.history.push("/available-forms")}
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
        {/* {Helper.getUserRole() === APP.ROLE.REGULATOR && (
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
        )} */}

        {/* Inspector portal */}
        {Helper.getUserRole() === APP.ROLE.INSPECTOR && <InspectorHome />}
        {/* Inspector portal */}
        {Helper.getUserRole() === APP.ROLE.REGULATOR && <ReviewerHome />}
      </Fragment>
    );
  }
}

export default Dashboard;
