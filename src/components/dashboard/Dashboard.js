import { Component, Fragment } from "react";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import { FormService } from "../../services/form.service";
import { APP } from "../../constants";
import Notify from "../../helpers/notify";
import Helper from "../../helpers/auth";

/**
 * Dashboard component
 */

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forms: [],
    };
  }

  componentDidMount() {
    // console.log(Helper.getUserRole());
    if (Helper.getUserRole() === APP.ROLE.INSTITUTE) {
      FormService.get().then(
        (response) => {
          if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
            this.setState({
              forms: response.responseData,
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
    }
  }

  render() {
    return (
      <Fragment>
        <Header history={this.props.history} />
        {Helper.getUserRole() === APP.ROLE.INSTITUTE && (
          <Fragment>
            <div className="container-fluid main-container">
              <div className="container dashboard-inner-container">
                <div className="row">
                  <div className="col-md-8 col-sm-12 col-12 pt-5">
                    <h2>My applications</h2>
                    <p className="h2-subheading">
                      There is no active applications. Select one from the below
                      list to apply.
                    </p>
                  </div>
                  <div className="col-md-4 col-sm-12 col-12"></div>
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
                    <button className="btn btn-default smf-btn-default float-right">
                      SEE ALL
                    </button>
                  </div>
                </div>
                <div className="row mt-3">
                  {this.state.forms.splice(0, 6).map((form, key) => (
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
                    <button className="btn btn-default smf-btn-default float-right">
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
      </Fragment>
    );
  }
}

export default Dashboard;
