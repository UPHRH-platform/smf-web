import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FormService } from "../../services/form.service";
import { APP } from "../../constants";
import Notify from "../../helpers/notify";
import Header from "../common/Header";

class MyForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: [],
    };
    this.searchForms = this.searchForms.bind(this);
  }

  componentDidMount() {
    FormService.get().then(
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
                <div className="col-md-10 col-sm-12 col-12 ">
                  <h2>My forms</h2>
                  {this.state.forms && this.state.forms.length ? (
                    <p className="h2-subheading">
                      These are the active form (s).
                    </p>
                  ) : (
                    <p className="h2-subheading">
                      These are the available appplication forms for you apply.
                      Click on any of them to start filling
                    </p>
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
                          placeholder="Search for a form"
                          autoComplete="off"
                          onKeyUp={(event) => this.searchForms(event)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row" id="forms-container">
                {this.state.forms.map((form, key) => (
                  <div className="col-md-4 mb-4 col-sm-12 col-12" key={key}>
                    <div
                      className="application-item white-bg"
                      style={{ minHeight: "150px" }}
                    >
                      <h3 className="form-title">{form.title}</h3>
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
        </div>
      </Fragment>
    );
  }
}

export default MyForms;
