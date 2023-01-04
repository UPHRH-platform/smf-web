import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { FormService } from "../../services/form.service";
import { APP, LANG } from "../../constants";
import Notify from "../../helpers/notify";
import { BtnTwo } from "../buttons";
import {ConfirmModal } from "../../components/modal";
import Helper from "../../helpers/auth";

class ListForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: [],
      isAdmin: Helper.isAdmin(),
      formToDelete: {},
      showConfirmModal: false,
    };
    this.getFormShortCode = this.getFormShortCode.bind(this);
  }

  componentDidMount() {
    this.getAllForms();
  }

  getAllForms = () => {
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
  };

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

  submit = (form, isPublish) => {
    let formData = {};
    formData.id = form.id;
    formData.version = form.version;
    formData.title = form.title;
    if (isPublish) {
      formData.status = LANG.FORM_STATUS.PUBLISH;
    } else {
      formData.status = LANG.FORM_STATUS.UNPUBLISH;
    }
    this.saveFormDetails(formData, false);
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

  deleteForm = () => {
    const formData = {...this.state.formToDelete, status: LANG.FORM_STATUS.DELETED}
    saveFormDetails(formData, true);
  }


  saveFormDetails = (formData, isDelete) => {
    FormService.add(formData).then(
      (response) => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          if(isDelete) {
            this.setState({showConfirmModal:  false});
            Notify.success("Form deleted successfully")
          }else {
            Notify.success(response.statusInfo.statusMessage);
          }
          //   this.props.updateParent(response.responseData.id);
          setTimeout(() => {
            this.getAllForms();
          }, 500);
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
    const { isAdmin, showConfirmModal, formToDelete } = this.state;
    return (
      <Fragment>
        <div className="row pt-2">
          <div className="col-sm-12 col-md-4">
            <form className="">
              <div className="input-group mb-2 mr-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="searchRoles"
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
            <BtnTwo
              btnType="button"
              label="Create new form"
              isLink={true}
              link={`/forms/add`}
              floatBottom={false}
              isModal={false}
            />
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
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.forms.map((form, key) => (
                  <tr key={key} className="form-item">
                    <th scope="row" className="form-title">
                      {form.title}
                    </th>
                    <td className="form-title text-capitalize">
                      {form.status.toLowerCase()}
                    </td>
                    <td className="">
                      {form.status === LANG.FORM_STATUS.PUBLISH && (
                        // <button type="button" className="btn btn-link td-preview">Unpublish</button>
                        <span
                          className="d-inline-block td-preview cursor-pointer"
                          onClick={(e) => this.submit(form, false)}
                        >
                          Unpublish
                        </span>
                      )}
                      {(form.status === LANG.FORM_STATUS.NEW ||
                        form.status === LANG.FORM_STATUS.UNPUBLISH) && (
                        <span
                          className="d-inline-block td-preview cursor-pointer"
                          onClick={(e) => this.submit(form, true)}
                        >
                          publish
                        </span>
                      )}
                      {/* {
                        form.status === LANG.FORM_STATUS.DRAFT && 
                        <span className="font-weight-bold black-60">Draft</span>
                      } */}
                    </td>
                    {/* <td></td> */}
                    <td className="td-preview">
                      <Link to={`/forms/${form.id}`}>Preview</Link>
                    </td>
                    <td className="td-preview">
                      {form.status === LANG.FORM_STATUS.DRAFT && (
                        <>
                        <Link to={`/forms/${form.id}/edit`}>Edit</Link>
                        {isAdmin && (
                          <span 
                           className="ml-3 text-danger  pointer"  
                           onClick={
                             () => {
                               this.setState({formToDelete: form, showConfirmModal:true})
                             }
                           }>Delete</span>
                         )}
                         </>
                      )}
                      {form.status !== LANG.FORM_STATUS.DRAFT && (
                        <span className="font-weight-bold black-16">Edit</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showConfirmModal && (
          <ConfirmModal
            title="Delete Form"
            onConfirm={this.deleteForm}
            onCancel={() => {
              this.setState({showConfirmModal: false, formToDelete: {}});
            }}
          > Do you want to delete {formToDelete?.title} ?</ConfirmModal>
        )}
      </Fragment>
    );
  }
}

export default ListForms;
