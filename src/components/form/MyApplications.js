import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FormService } from "../../services/form.service";
import { APP } from "../../constants";
import Notify from "../../helpers/notify";
import Header from "../common/Header";
import { HeadingOne, HeadingTwo } from "../headings";

class ListMyApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: [],
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
    FormService.getAllApplications().then(
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

  searchForms = (event) => {
    var input, filter, formContainer, formItems, a, i, txtValue;
    input = event.target.value;
    filter = input.toUpperCase();
    formContainer = document.getElementById("forms-container");
    formItems = formContainer.getElementsByClassName("form-item");
    for (i = 0; i < formItems.length; i++) {
      a = formItems[i].getElementsByClassName("form-title")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        formItems[i].style.display = "";
      } else {
        formItems[i].style.display = "none";
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
              {/* <div className="row mt-4 mb-4">
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
                          onKeyUp={(event) => this.searchForms(event)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="row" id="forms-container">
                {this.state.forms.map((form, key) => (
                  <div className="col-md-4 col-sm-12 col-12 mb-3" key={key}>
                    <div
                      className="application-item white-bg"
                      style={{ minHeight: "150px" }}
                    >
                      <h3 className="">{form.title}</h3>
                      <span className="h3-subheading d-block black-60 mb-2">
                        Submitted on:{" "}
                        {this.formatDate(`${form.createdDate}` || "2022-01-01")}
                      </span>
                      <div className="mb-3">
                        <span className="form-status">
                          Status: Under review
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
        </div>
      </Fragment>
    );
  }
}

export default ListMyApplications;
