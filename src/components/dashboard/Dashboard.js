import { Component, Fragment } from "react";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import { FormService } from "../../services/form.service";
import { APP } from "../../constants";
import Notify from "../../helpers/notify";
import { UserService } from "../../services/user.service";

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
    return date.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    }).replace(/ /g, ' ');

  }

  componentDidMount() {
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

    // my applications section
    FormService.getAllApplications().then(
      (response) => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          this.setState({
            myApplications: response.responseData,
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

  render() {
    return (
      <Fragment>
        <Header history={this.props.history}/>
        <div className="container-fluid main-container">
          <div className="container dashboard-inner-container pt-3 pb-3">
            <div
              className="row"
            >
              <div className="col-md-10 col-sm-12 col-12 ">
                <h2>My applications</h2>
                {true ? 
                  <p className="h2-subheading">These are the active application (s) submitted by you.</p>
                  :  
                  <p className="h2-subheading">There is no active applications. Select one from the below list to apply.</p>
                }
               
              </div>
              <div className="col-md-2 col-sm-12 col-12 ">
                <Link to={"/my-applications"} className="btn btn-default smf-btn-default float-right mr-0">
                  SEE ALL
                </Link>
              </div>
            </div>
            <div
              className="row mt-3"
            >
              {this.state.myApplications.splice(0, 6).map((form, key) => (
                <div className="col-md-4 col-sm-12 col-12" key={key}>
                    <div className="application-item white-bg"  style={{minHeight: "150px"}}>
                      <h3 className="">{form.dataObject.title}</h3>
                      <span className="h3-subheading d-block black-60 mb-2">Submitted on: {this.formatDate(`${form.createdDate}` || '2022-01-01')}</span>
                      <div className="mb-3">
                        <span className="form-status">Status: Under review</span>
                      </div>
                      <Link to={"/forms/" + form.dataObject.id} className="btn btn-default smf-btn-default highlighted mt-3">
                        View application
                      </Link>
                    </div>
                </div>
              ))}
              {/* <div className="col-md-4 col-sm-12 col-12">
                <div className="application-item white-bg">
                  <h3 className="">Application name</h3>
                  <span className="h3-subheading d-block black-60 mb-2">Submitted on: {this.formatDate('2022-01-01')}</span>
                  <div className="mb-3">
                    <span className="form-status">Status: Under review</span>
                  </div>
                  <Link to={"/forms/" + '123'} className="btn btn-default smf-btn-default highlighted mt-3">
                        View application
                  </Link>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 col-12">
                <div className="application-item white-bg">
                  <h3 className="">Application name</h3>
                  <span className="h3-subheading d-block black-60 mb-2">Submitted on: 25 Jan 2022</span>
                  <div className="mb-3">
                    <span className="form-status">Status: Under review</span>
                  </div>
                  <button className="btn btn-default smf-btn-default highlighted mt-3">View application</button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="container-fluid bottom-container">
          <div className="container dashboard-inner-container">
            <div
              className="row"
            >
              <div className="col-md-10 col-sm-12 col-12">
                <h2>Available forms</h2>
                <p className="h2-subheading">These are the available appplication forms for you apply. Click on any of them to start filling</p>
              </div>
              <div className="col-md-2 col-sm-12 col-12">
                <button className="btn btn-default smf-btn-default float-right mr-0">SEE ALL</button>
              </div>
            </div>
            <div className="row mt-3">
              {this.state.forms.splice(0, 6).map((form, key) => (
                <div className="col-md-4 mb-4 col-sm-12 col-12" key={key}>
                    <div className="application-item"  style={{minHeight: "150px"}}>
                      <h3 className="">{form.title}</h3>
                      <p className="h3-subheading">
                      {form.description!= null ? form.description : 'Application form'}
                      </p>
                      <Link to={"/forms/" + form.id} className="btn btn-default smf-btn-default highlighted mt-3">
                        Apply
                      </Link>
                    </div>
                </div>
              ))}
              {/* <div className="col-md-4 col-sm-12 col-12">
                <div className="application-item">
                  <h3 className="">Application name</h3>
                  <p className="h3-subheading">In oculis quidem rerum necessitatibus saepe eveniet, ut et via.</p>
                  <button className="btn btn-default smf-btn-default highlighted mt-3">Apply</button>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 col-12">
                <div className="application-item">
                  <h3 className="">Application name</h3>
                  <p className="h3-subheading">In oculis quidem rerum necessitatibus saepe eveniet, ut et via.</p>
                  <button className="btn btn-default smf-btn-default highlighted mt-3">Apply</button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;
