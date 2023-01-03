import { Component, Fragment } from "react";
// import BrandNavBar from "../../dashboard/components/common/BrandNavBar";
// import HeaderNavBar from "../../dashboard/components/common/HeaderNavBar";
// import Sidebar from "../common/Sidebar";
import LocalizedStrings from "react-localization";
import { translations } from "./../../translations.js";
import Field from "./elements/Field";
import Separator from "./elements/Separator";
import Heading from "./elements/Heading";
import { LANG, APP } from "./../../constants";
import { FormService } from "./../../services/form.service";
import Notify from "./../../helpers/notify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Header from "./../common/Header";
import Sortable from "sortablejs";
import { BtnTwo } from "../buttons/BtnTwo";
import { BtnOne } from "../buttons/BtnOne";
import {ConfirmModal } from "../../components/modal";

let strings = new LocalizedStrings(translations);

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.addElement = this.addElement.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.resetElements = this.resetElements.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.saveFormDetails = this.saveFormDetails.bind(this);
    this.state = {
      language: "en",
      formElements: [],
      formTitle: "",
      formDetails: {
        id: "",
        version: "",
        title: "",
        description: "",
        fields: [],
      },
      breadcrumbData: [],
      showDuplicateConfirmModal: false,
    };
  }

  componentDidMount() {
    // $(".sortable").sortable();
    // (function () {
    //   let el = document.getElementById("items");
    //   Sortable.create(el, { animation: 300 });
    // })("docReady", window);
    (function () {
      let el = document.getElementById("items");
      Sortable.create(el, { animation: 300 });
    })();
    this.setState({
      breadcrumbData: [
        { title: "HOME", url: "/dashboard", icon: "" },
        { title: "MANANGE", url: "/manage", icon: "" },
        { title: "APPLICATION FORM", url: "", icon: "" },
      ],
    });
    if (this.props.match.params.id) {
      let addFormItem = document.getElementById("active");
      if (addFormItem) {
        addFormItem.classList.add("active");
      }
      FormService.find(this.props.match.params.id).then(
        (response) => {
          if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
            this.setState({
              formDetails: response.responseData,
              formTitle: response.responseData.title,
              breadcrumbData: [
                ...this.state.breadcrumbData,
                { title: response.responseData.title || "", url: "", icon: "" },
                { title: "Edit form", url: "", icon: "" },
              ],
            });
            document.getElementById("id").value = response.responseData.id;
            document.getElementById("version").value =
              response.responseData.version;
            if (response.responseData.fields) {
              response.responseData.fields.map((element) => {
                switch (element.fieldType) {
                  case LANG.SEPARATOR:
                    return this.addElement(LANG.SEPARATOR);
                  case LANG.HEADING:
                    return this.addElement(LANG.HEADING);
                  default:
                    return this.addElement(LANG.FIELD);
                }
              });
            }
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
    } else {
      this.setState({
        breadcrumbData: [
          { title: "HOME", url: "/dashboard", icon: "" },
          { title: "MANANGE", url: "/manage", icon: "" },
          { title: "APPLICATION FORM", url: "", icon: "" },
          { title: "CREATE FORM", url: "", icon: "" },
        ],
      });
      //   this.props.eraseFormDetails();
    }
  }

  handleChange = (event) => {
    event.persist();
    this.setState((prevState) => ({
      ...prevState,
      formDetails: {
        ...prevState.formDetails,
        [event.target.name]: event.target.value,
      },
    }));
    let formName = document.getElementById("form-name");
    if (
      document
        .querySelector("#title")
        .classList.contains("input-highlight-error-1")
    ) {
      document
        .querySelector("#title")
        .classList.remove("input-highlight-error-1");
    }
    if (event.target.name === "title" && formName) {
      formName.innerHTML = event.target.value;
    }
  };

  addElement = (element) => {
    this.state.formElements.push(element);
    this.setState({
      formElements: this.state.formElements,
    });
  };

  removeElement = (index) => {
    // console.log(this.state.formElements);

    confirmAlert({
      title:
        this.state.formElements[index] === "heading"
          ? LANG.HEADING_REMOVAL_WARNING
          : LANG.CONFIRM_TO_REMOVE,
      message:
        this.state.formElements[index] === "heading"
          ? LANG.CONFIRM_TO_REMOVE_2
          : LANG.ARE_YOU_SURE_YOU_WANT_TO_DO_THIS,
      buttons: [
        {
          label: LANG.REMOVE,
          onClick: () => {
            delete this.state.formElements[index];
            this.setState({
              formElements: this.state.formElements,
            });
          },
        },
        {
          label: LANG.CANCEL,
          onClick: () => {
            return false;
          },
        },
      ],
    });
  };

  resetElements = () => {
    this.setState({
      formElements: [],
      formDetails: {},
    });
  };

  submit = (isDraft) => {
    let formData = {};
    formData.id = this.state.formDetails.id;
    formData.version = this.state.formDetails.version;
    formData.title = this.state.formDetails.title;
    formData.description = this.state.formDetails.description;
    let allowSubmission = false;

    if (document.querySelector("#title").value === "") {
      document.querySelector("#title").classList.add("input-highlight-error-1");
    }

    if (isDraft) {
      formData.status = LANG.FORM_STATUS.DRAFT;
    } else {
      formData.status = LANG.FORM_STATUS.PUBLISH;
    }
    formData.fields = [];
    let cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
      let field = {};
      field.refApi = "";
      field.logicalGroupCode = "";
      field.name = cards[i].querySelector(".fieldName").value;
      field.fieldType = cards[i].querySelector(".fieldType").value;
      field.values = [];

      if (field.name === "") {
        cards[i]
          .querySelector(".fieldName")
          .classList.add("input-highlight-error-1");
      }

      if (
        field.fieldType !== LANG.HEADING ||
        field.fieldType !== LANG.SEPARATOR
      ) {
        let tags = cards[i].querySelectorAll(".input-tag__tags li");
        for (let j = 0; j < tags.length; j++) {
          if (j + 1 < tags.length) {
            let tag = tags[j].innerHTML.split("<");
            if (tag[0]) {
              let option = {};
              option.key = tag[0];
              option.value = tag[0];
              field.values.push(option);
            }
          }
        }
        let width = cards[i].querySelector(".width");
        if (width) {
          field.width = parseInt(width.value);
        } else {
          field.width = null;
        }
        let isRequired = cards[i].querySelector(".isRequired");
        if (isRequired) {
          field.isRequired = cards[i].querySelector(".isRequired").checked;
        } else {
          field.isRequired = false;
        }
      }
      field.order = i + 1;
      if (field.fieldType === LANG.HEADING) {
        field.values = [];
        let heading = {};
        heading.heading = cards[i].querySelector(".heading").value;
        heading.subHeading = cards[i].querySelector(".subHeading").value;

        if (heading.heading === "") {
          cards[i]
            .querySelector(".heading")
            .classList.add("input-highlight-error-1");
          allowSubmission = false;
        } else {
          if (
            cards[i]
              .querySelector(".heading")
              .classList.contains("input-highlight-error-1")
          ) {
            cards[i]
              .querySelector(".heading")
              .classList.remove("input-highlight-error-1");
          }
          allowSubmission = true;
        }
        field.values.push(heading);
      }
      formData.fields.push(field);
    }

    if (allowSubmission) {
      this.saveFormDetails(formData,false);
    } else {
      Notify.error("Kindly fill all the fields");
    }
  };

  saveFormDetails = (formData, isDuplicate) => {
    FormService.add(formData).then(
      (response) => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          if(isDuplicate) {
            Notify.success("Duplicate form is added successfully");
            this.setState({showDuplicateConfirmModal: false});
          }else {
            Notify.success(response.statusInfo.statusMessage);
          }
          
          //   this.props.updateParent(response.responseData.id);
          setTimeout(() => {
            this.props.history.push("/manage?tab=1");
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

  duplicateForm= () => {
    let formData = {...this.state.formDetails, id: "", title: 'Copy of '+ this.state.formDetails.title};
    this.saveFormDetails(formData, true);
  }

  render() {
    const { formDetails,  showDuplicateConfirmModal } = this.state;
    strings.setLanguage(
      localStorage.getItem("language") || this.state.language
    );
    return (
      <Fragment>
        <Header
          history={this.props.history}
          breadCrumb={this.state.breadcrumbData}
        />
        <div className="container-fluid main-container h-100 heightMin">
          <div className="container dashboard-inner-container">
            <div className="row tabText">
              <div className="col-md-12 ">
                <div className="row">
                  <div className="col-12 mt-5">
                    <div className="d-flex pull-right">
                      <div className="mr-3">
                        <BtnOne
                          label="Cancel"
                          btnType="button"
                          isLink={false}
                          link=""
                          clickHandler={(e) =>
                            this.props.history.push("/manage?tab=1")
                          }
                        />
                      </div>
                      {this.state.formDetails.status !==
                        LANG.FORM_STATUS.NEW && (
                        <div className="mr-3">
                          <BtnOne
                            label="Save as draft"
                            btnType="button"
                            isLink={false}
                            link=""
                            clickHandler={(e) => this.submit(true)}
                          />
                        </div>
                      )}
                      {this.state.formDetails.status ===
                        LANG.FORM_STATUS.DRAFT && (
                        <div className="mr-3">
                            <BtnOne
                            label="Duplicate"
                            btnType="button"
                            isLink={false}
                            link=""
                            clickHandler={(e) =>  this.setState({ showDuplicateConfirmModal: true})}
                          />
                        </div>
                      )}
                      <div className="mr-0">
                        <BtnTwo
                          label="Submit"
                          btnType="button"
                          isLink={false}
                          link=""
                          clickHandler={(e) => this.submit(false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <form autoComplete="new-password" id="add-form">
                      {/* <div className="row col-md-12 pt-4">
                        <div className="col-md-3 text-center mt-2 pointer">
                          <i className="fa fa-trash fa-2x"></i> Delete form
                        </div>
                      </div> */}
                      <div style={{ visibility: "hidden" }}>
                        <input
                          type="text"
                          name="id"
                          id="id"
                          value={this.state.formDetails.id || ""}
                          onChange={this.handleChange}
                        />
                        <input
                          type="text"
                          name="version"
                          id="version"
                          value={this.state.formDetails.version || ""}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="field-name">
                              Application heading
                            </label>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              className="form-control input-bg-2"
                              placeholder="Type here"
                              onChange={this.handleChange}
                              onBlur={this.handleChange}
                              value={this.state.formDetails.title || ""}
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="field-name">
                              Application description
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              className="form-control input-bg-2"
                              placeholder="Type here"
                              onChange={this.handleChange}
                              onBlur={this.handleChange}
                              value={this.state.formDetails.description || ""}
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      <div className="card-columns row mt-4">
                        <div className="col-md-12">
                          <div className="sortable" id="items">
                            {this.state.formElements &&
                              this.state.formElements.map((element, index) => {
                                switch (element) {
                                  case LANG.FIELD:
                                    return (
                                      <Field
                                        key={index}
                                        index={index}
                                        data={
                                          this.state.formDetails.fields
                                            ? this.state.formDetails.fields[
                                                index
                                              ]
                                            : null
                                        }
                                        removeElement={this.removeElement}
                                      />
                                    );
                                  case LANG.SEPARATOR:
                                    return (
                                      <Separator
                                        key={index}
                                        index={index}
                                        data={
                                          this.state.formDetails.fields
                                            ? this.state.formDetails.fields[
                                                index
                                              ]
                                            : null
                                        }
                                        removeElement={this.removeElement}
                                      />
                                    );
                                  case LANG.HEADING:
                                    return (
                                      <Heading
                                        key={index}
                                        index={index}
                                        data={
                                          this.state.formDetails.fields
                                            ? this.state.formDetails.fields[
                                                index
                                              ]
                                            : null
                                        }
                                        removeElement={this.removeElement}
                                      />
                                    );
                                  default:
                                    return <></>;
                                }
                              })}
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="row">
                      <div className="col-12 mt-3 mb-4">
                        {/* <div className="field-options"> */}
                        <div className="row">
                          <div
                            onClick={() => this.addElement(LANG.HEADING)}
                            className="col-6"
                          >
                            <button className="btn btn-default smf-btn-default">
                              {/* <i className="material-icons absolute">title</i> */}
                              Add section
                            </button>
                          </div>
                          <div
                            onClick={() => this.addElement(LANG.FIELD)}
                            className="col-6"
                          >
                            <button className="btn btn-default smf-btn-default pull-right  mr-0">
                              {/* <i className="material-icons absolute">add</i> */}
                              Add question
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => this.addElement(LANG.SEPARATOR)}
                      style={{ display: "none" }}
                    >
                      <button className="btn btn-default smf-btn-default">
                        <i className="material-icons absolute">drag_handle</i>
                        <span className="button-text">Add separator</span>
                      </button>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showDuplicateConfirmModal && (
          <ConfirmModal
            title="Duplicate Form"
            onConfirm={this.duplicateForm}
            onCancel={() => {
              this.setState({showDuplicateConfirmModal: false});
            }}
          > Do you want to delete {formDetails?.title} ?</ConfirmModal>
        )}
      </Fragment>
    );
  }
}

export default AddForm;
