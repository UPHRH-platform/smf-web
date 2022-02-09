import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FormService } from "../../services/form.service";
import { APP } from "../../constants";
import Notify from "../../helpers/notify";
import Header from "./../common/Header";
import { BtnTwo } from "../buttons";

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

  // static propTypes = {
  //   match: PropTypes.object.isRequired,
  //   location: PropTypes.object.isRequired,
  //   history: PropTypes.object.isRequired,
  // };

  render() {
    return (
      <Fragment>
        <div className="row pt-2">
          <div className="col-sm-12 col-md-4">
            <form className="">
              <div className="input-group mb-2 mr-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="search-roles"
                  placeholder="Search for an application"
                  autoComplete="off"
                  onKeyUp={(event) => this.searchForms(event)}
                />
              </div>
            </form>
            
            {/* <div className="col-md-8">
                    <Link to="/forms/add" className="pull-right">
                      <button className="btn btn-default smf-btn-default-inverse">
                        Create new
                      </button>
                    </Link>
                  </div> */}
          </div>
          <div className="col-sm-12 col-md-8 text-right">
              <BtnTwo btnType="button" label="Create new" isLink={true} link={`/forms/add`} floatBottom={false} isModal={false} />
          </div>
        </div>
        <div className="row pt2">
          <div className="col-12" id="forms-container">
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
      </Fragment>
    );
  }
}

export default ListForms;
