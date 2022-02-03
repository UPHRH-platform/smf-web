import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FormService } from "../../services/form.service";
import { APP } from "../../constants";
import Notify from "../../helpers/notify";
import Header from "./../common/Header";

class ListForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: [],
    };
    this.getFormShortCode = this.getFormShortCode.bind(this);
  }

  componentDidMount() {
    FormService.get().then(
      (response) => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          // console.log(response.responseData);
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

  getFormShortCode = (name) => {
    let shortCode;
    if (name.length) {
      let words = name.split(" ");
      if (words[0]) {
        shortCode = words[0].charAt(0);
      }
      if (words[1]) {
        shortCode = shortCode + words[1].charAt(0);
      }
    }
    return shortCode;
  };

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
            <div className="row tabText">
              <div className="row col-md-12">
                <div className="row col-md-12 mt-5">
                  <div className="col-md-12">
                    <h2 className="mb-4">Manage</h2>
                  </div>
                </div>
                <div className="row col-md-12 mt-4">
                  <div className="col-md-4">
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
                  <div className="col-md-8">
                    <Link to="/forms/add" className="pull-right">
                      <button className="btn btn-default smf-btn-default-inverse">
                        Create new
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="row col-md-12 mt-4" id="forms-container">
                  {/* {this.state.forms.map((form, key) => (
                    <div className="col-md-4 form-item mb-4" key={key}>
                      <div
                        className="application-item"
                        style={{ minHeight: "150px", backgroundColor: "#fff" }}
                      >
                        <h3 className="form-title">{form.title}</h3>
                        <p className="h3-subheading">
                          {form.description != null
                            ? form.description
                            : "Application form"}
                        </p>
                        <Link
                          to={"/forms/" + form.id + "/edit"}
                          className="btn btn-default smf-btn-default highlighted mt-3"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  ))} */}
                  <table className="table table-smf">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Form name</th>
                        <th scope="col">Status</th>
                        {/* <th scope="col">Published/created on</th> */}
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.forms.map((form, key) => (
                        <tr key={key} className="form-item">
                          <th scope="row" className="form-title">
                            {form.title}
                          </th>
                          <td>Published</td>
                          {/* <td></td> */}
                          <td className="td-preview">
                            <Link to={`/forms/${form.id}`}>Preview</Link>
                          </td>
                          <td className="td-preview">
                            <Link to={`/forms/${form.id}/edit`}>Edit</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ListForms;
