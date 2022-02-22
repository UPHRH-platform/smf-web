import { Component, Fragment } from "react";
import Header from "../common/Header";
import { LANG, APP } from "../../constants";
import { FormService } from "../../services/form.service";
import Notify from "./../../helpers/notify";
import Input from "./fields/Input";
import Radio from "./fields/Radio";
import Checkbox from "./fields/Checkbox";
import Select from "./fields/Select";
import Toggle from "./fields/Toggle";
import Textarea from "./fields/Textarea";
// import Rating from "./fields/Rating";
import FileUpload from "./fields/FileUpload";
import MultiSelect from "./fields/MultiSelect";
import Helper from "../../helpers/auth";
import { StatusBarLarge } from "../status-bar";
// import { BtnTwo } from "../buttons";
// const $ = window.$;

class FormViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: true,
      formDetails: {},
      formFieldGroups: [],
      formHeadings: [],
      headingIndex: 0,
      formFields: {},
      formTitle: "",
      applicationDetails: {},
      showSaveAsDraft: true,
      breadCrumbData: []
    };
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.loadFormDetails = this.loadFormDetails.bind(this);
    this.saveFields = this.saveFields.bind(this);
    this.populateForm = this.populateForm.bind(this);
    this.populateData = this.populateData.bind(this);
    this.populateData = this.populateData.bind(this);
    this.disableFormElements = this.disableFormElements.bind(true);
    this.submitForm = this.submitForm.bind(this);
  }

  toggleSideBar() {
    this.setState({
      showSidebar: !this.state.showSidebar,
    });
  }

  componentDidMount() {
    this.loadFormDetails(this.props.match.params.id);
    // console.log(this.props.match.params.applicationId);
    if (
      this.props.match.params.applicationId !== null &&
      this.props.match.params.applicationId !== undefined
    ) {
      if(Helper.getUserRole() === APP.ROLE.INSTITUTION){
        this.setState({
          breadCrumbData: [
            { title: 'HOME', url: '/dashboard', icon: '' },
            { title: 'MY APPLICATIONS', url: '/applications', icon: '' },
          ]
        })
      }
      if(Helper.getUserRole() === APP.ROLE.REGULATOR){
        this.setState({
          breadCrumbData: [
            { title: 'HOME', url: '/dashboard', icon: '' },
            { title: 'ALL APPLICATIONS', url: '/applications', icon: '' },
          ]
        });
      }
      setTimeout(() => {
        this.populateForm(this.props.match.params.applicationId);
      }, 50);
    } else {
      if(Helper.getUserRole() === APP.ROLE.INSTITUTION){
        this.setState({
          breadCrumbData: [
            { title: 'HOME', url: '/dashboard', icon: '' },
            { title: 'ALL APPLICATIONS', url: '/applications', icon: '' },
          ]
        })
      }
      if(Helper.getUserRole() === APP.ROLE.REGULATOR){
        this.setState({
          breadCrumbData: [
            { title: 'HOME', url: '/dashboard', icon: '' },
            { title: 'ALL APPLICATIONS', url: '/applications', icon: '' },
          ]
        });
      }
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.loadFormDetails(this.props.match.params.id);
      // console.log(this.props.match.params.applicationId);

      if (this.props.match.params.applicationId !== null) {
        setTimeout(() => {
          this.populateForm(this.props.match.params.applicationId);
        }, 50);
      }
    }
  }

  loadFormDetails = (formId) => {
    FormService.find(formId).then(
      (response) => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          this.setState({
            breadCrumbData: [
              ...this.state.breadCrumbData,
              { title: (response.responseData && response.responseData.title) || '', url: '', icon: '' }
            ]
          })
          let fields = response.responseData.fields,
            i = 0,
            temp = [];
          for (i = 0; i < fields.length; i++) {
            if (fields[i]["fieldType"] === LANG.HEADING) {
              this.state.formHeadings.push(fields[i]["values"][0]["heading"]);
              if (i !== 0) {
                this.state.formFieldGroups.push(temp);
                temp = [];
              }
            } else if (i === 0) {
              this.state.formHeadings.push("General");
            }
            if (
              fields[i]["fieldType"] !== LANG.HEADING &&
              fields[i]["fieldType"] !== LANG.SEPARATOR
            ) {
              temp.push(fields[i]);
            }
          }
          this.state.formFieldGroups.push(temp);
          this.setState({
            formDetails: response.responseData,
            formTitle: response.responseData.title.replaceAll(" ", "_"),
          });
          // console.log(this.state.formHeadings);
          // console.log(this.state.formFieldGroups);
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

  populateForm = (applicationId) => {
    FormService.findApplication(applicationId).then(
      (response) => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          // console.log(response.responseData[0].dataObject);
          this.setState({
            applicationDetails: response.responseData,
          });
          var savedFields = response.responseData.dataObject;
          var fields = this.state.formDetails.fields;
          var newFields = {};
          // console.log(fields);
          for (var pkey of Object.keys(savedFields)) {
            for (var key of Object.keys(savedFields[pkey])) {
              for (let j = 0; j < fields.length; j++) {
                // console.log(key, fields[j].name);
                if (key === fields[j].name) {
                  newFields["field_" + fields[j].order] =
                    savedFields[pkey][key];
                }
              }
            }
          }
          this.setState({
            formFields: newFields,
            // breadCrumbData: [
            //   { title: 'HOME', url: '/dashboard', icon: '' },
            //   { title: 'MY APPLICATIONS', url: '/my-applications', icon: '' },
            // ]
          });
          setTimeout(() => {
            this.populateData();
          }, 100);
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

  populateData = () => {
    // Removing existing data starts
    var existingFields = this.state.formFieldGroups[this.state.headingIndex];
    let inputs = document.getElementsByTagName("input");
    if (
      this.props.match.params.applicationId === null ||
      this.props.match.params.applicationId === undefined
    ) {
      for (let m = 0; m < inputs.length; m++) {
        for (var key of Object.keys(existingFields))
          if (`field_${existingFields[key].order}` === inputs[m].name) {
            inputs[m].type = existingFields[key].fieldType;
          }
        inputs[m].value = "";
      }
      inputs = document.getElementsByTagName("select");
      for (let n = 0; n < inputs.length; n++) inputs[n].value = "";
    } else {
      for (let m = 0; m < inputs.length; m++) {
        for (var key of Object.keys(existingFields))
          if (`field_${existingFields[key].order}` === inputs[m].name) {
            inputs[m].type = existingFields[key].fieldType;
          }
      }
    }
    // Removing existing data ends

    // Code for files starts
    var fileElements = document.getElementsByClassName("custom-file-display");
    for (let ele1 = 0; ele1 < fileElements.length; ele1++) {
      fileElements[ele1].innerHTML = "";
      fileElements[ele1].style.display = "none";
    }
    var fileElements = document.getElementsByClassName("form-control-file");
    for (let ele2 = 0; ele2 < fileElements.length; ele2++) {
      fileElements[ele2].setAttribute("path", "");
    }
    // Code for files ends

    var fields = this.state.formFields;
    // console.log(this.state.formFields);
    for (var key of Object.keys(fields)) {
      var element = document.getElementsByName(key);
      if (element.length > 0) {
        if (element[0].type === "checkbox" || element[0].type === "radio") {
          var len = element.length;
          let values = fields[key].split(",");
          for (var j = 0; j < len; j++) {
            // console.log(values.includes(element[j].value));
            if (values.includes(element[j].value)) {
              element[j].parentNode.classList.add("selected");
              element[j].checked = true;
            }
          }
        } else if (element[0].type === "select-multiple") {
          var sel = fields[key].split(",");
          var options = document
            .getElementsByName(key)[0]
            .getElementsByTagName("option");
          for (var i in options)
            for (var k in sel)
              if (options[i].innerHTML === sel[k])
                options[i].selected = "selected";
        } else if (element[0].type !== "file") {
          element[0].value = fields[key];
        } else if (element[0].type === "file") {
          element[0].setAttribute("path", fields[key]);
          element.innerHTML = "";

          if (fields[key] !== "") {
            let temp = fields[key].split(",");
            var keyIndex = key.split("_");
            for (let l = 0; l < temp.length; l++) {
              var element = document.getElementById(
                "files-list-" + keyIndex[1]
              );
              element.style.display = "block";
              element.innerHTML +=
                '<div class="col-12 file-item">\
            <span>' +
                temp[l] +
                '</span>\
            <span \
            class="cross" \
          > \
            X \
          </span>\
          </div>';
            }
          }
        }
      }
    }

    if (
      this.props.match.params.applicationId !== null &&
      this.props.match.params.applicationId !== undefined
    ) {
      // if regulator disable form
      if (Helper.getUserRole() === APP.ROLE.REGULATOR) {
        setTimeout(() => {
          this.disableFormElements();
        }, 300);
      }
      // if institute,
      // check if the form is submitted (status : new)  - no edit & hide 'save as draft'
      // if status: Draft - enable form edit & show 'save as draft'
      if (
        Helper.getUserRole() === APP.ROLE.INSTITUTION &&
        this.state.applicationDetails.status === LANG.FORM_STATUS.NEW
      ) {
        this.setState({
          showSaveAsDraft: false,
        });
        setTimeout(() => {
          this.disableFormElements();
        }, 300);
      }
    }
  };

  disableFormElements = () => {
    // console.log("disableFormElements...");
    let fields = this.state.formFields;
    for (let key of Object.keys(fields)) {
      // console.log(key);
      let element = document.getElementsByName(key);
      if (element[0] !== undefined && element[0] !== null) {
        element = element[0];
        if (element.type === "checkbox" || element.type === "radio") {
          let elements = document.getElementsByName(key);
          for (let i = 0; i < elements.length; i++) elements[i].disabled = true;
        } else {
          if (element) element.disabled = true;
        }
      }
    }
    let fileRemoval = document.querySelectorAll(".file-item .cross");
    for (let i = 0; i < fileRemoval.length; i++)
      if (fileRemoval[i] !== undefined && fileRemoval[i] !== null)
        fileRemoval[i].style.display = "none";
  };

  validationPassed = () => {
    let flag = true;
    if (
      (this.props.match.params.applicationId === null ||
        this.props.match.params.applicationId === undefined) &&
      Helper.getUserRole() === APP.ROLE.INSTITUTION
    ) {
      for (let index = 0; index <= this.state.headingIndex; index++) {
        if (!flag) break;
        let fields = this.state.formFieldGroups[index];
        for (let i = 0; i < fields.length; i++) {
          // console.log("field_" + fields[i].order);
          if (
            this.state.formFields["field_" + fields[i].order] === "" &&
            fields[i].isRequired
          ) {
            flag = false;
            this.setState({
              headingIndex: index,
            });
            let element = document.getElementsByName(
              "field_" + fields[i].order
            );
            for (let j = 0; j < fields.length; j++)
              if (element[j])
                element[j].classList.add("is-invalid", "has-error");
            break;
          }
        }
        if (!flag) {
          Notify.error("Please fill all required fields.");
        }
      }
    }
    return flag;
  };

  saveFields = (index) => {
    if (
      this.props.match.params.applicationId === null ||
      this.props.match.params.applicationId === undefined
    ) {
      let obj = this.state.formFields,
        order = "";
      var form = document.getElementById("application-form");
      const formData = new FormData(form);
      const data = Array.from(formData.entries()).reduce(
        (memo, pair) => ({
          ...memo,
          [pair[0]]: pair[1],
        }),
        {}
      );
      for (let i = 0; i < this.state.formFieldGroups[index].length; i++) {
        order = this.state.formFieldGroups[index][i]["order"];
        obj["field_" + order] =
          data["field_" + order] !== undefined ? data["field_" + order] : "";
        var checkboxes = document.getElementsByClassName(
          "field_" + order + "_checkbox"
        );
        if (checkboxes.length) {
          if (checkboxes[0].type === "checkbox") {
            var len = checkboxes.length;
            let temp = [];
            for (var j = 0; j < len; j++) {
              if (checkboxes[j].checked) {
                temp.push(checkboxes[j].value);
              }
            }
            obj["field_" + order] = temp.join();
          }
        }
        var multiselects = document.getElementsByClassName(
          "field_" + order + "_multiselect"
        );
        if (multiselects.length) {
          var selected = [];
          for (var option of multiselects[0].options) {
            // console.log(option.value);
            if (option.selected && option.value !== "Select from dropdown") {
              selected.push(option.value);
            }
          }
          obj["field_" + order] = selected.join();
        }

        var files = document.getElementsByClassName("field_" + order + "_file");
        if (files.length) {
          obj["field_" + order] = files[0].getAttribute("path");
        }
      }
      this.setState({
        formFields: obj,
      });
    }
    // console.log(obj);
    // files={this.state.formFields["field_3"].split(",")}
    // console.log(this.state.formFields["field_3"]);
  };

  submitForm = (isDraft) => {
    var fieldsData = {},
      temp;
    var savedFields = this.state.formFields;
    var fields = this.state.formDetails.fields;
    for (const key in savedFields) {
      temp = key.split("_");
      for (let j = 0; j < fields.length; j++) {
        // console.log(temp[1], fields[j].order);
        if (temp[1] == fields[j].order) {
          fieldsData[fields[j].name] = savedFields[key];
        }
      }
    }
    var fieldGroups = {};
    for (let i = 0; i < this.state.formHeadings.length; i++) {
      fieldGroups[this.state.formHeadings[i]] = {};
      for (let j = 0; j < this.state.formFieldGroups[i].length; j++) {
        // console.log(this.state.formFieldGroups[i][j].name);
        fieldGroups[this.state.formHeadings[i]][
          this.state.formFieldGroups[i][j].name
        ] = fieldsData[this.state.formFieldGroups[i][j].name];
      }
    }
    // console.log(fieldGroups);
    let formDetails = {
      formId: this.state.formDetails.id,
      version: this.state.formDetails.version,
      dataObject: fieldGroups,
      title: this.state.formDetails.title,
      status: isDraft ? LANG.FORM_STATUS.DRAFT : LANG.FORM_STATUS.NEW,
      ...(this.props.match.params.applicationId && {
        applicationId: this.props.match.params.applicationId,
      }),
    };
    // formDetails = JSON.stringify(formDetails);
    // console.log(formDetails)
    FormService.submit(formDetails).then(
      (response) => {
        // console.log(response);
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          Notify.success(response.statusInfo.statusMessage);
          setTimeout(() => {
            this.props.history.push("/dashboard");
          }, 300);
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

  render() {
    return (
      <Fragment>
        <Header history={this.props.history} breadCrumb={this.state.breadCrumbData}/>
        <div className="container-fluid main-container">
          <div className="row">
            <div className="col-12">
              <div className="container pt-5 pl-2 pr-2">
                <div className="d-flex row mb-4">
                  <div className="col-12">
                    <h2 className="title mb-0">
                      {this.state.formDetails.title}
                    </h2>
                  </div>
                  <div className="col-12"></div>
                </div>
                <div className="d-flex">
                  <nav
                    id="sidebar"
                    className={"active" + (this.state.showSidebar ? "" : "a")}
                  >
                    <ul className="list-unstyled components">
                      {this.state.formHeadings.map((heading, i) => {
                        return (
                          <li
                            key={i}
                            onClick={(e) => {
                              this.saveFields(this.state.headingIndex);
                              if (i > this.state.headingIndex) {
                                if (this.validationPassed()) {
                                  this.setState({ headingIndex: i });
                                  setTimeout(() => {
                                    this.populateData();
                                  }, 100);
                                }
                              } else if (i !== this.state.headingIndex) {
                                this.setState({ headingIndex: i });
                                setTimeout(() => {
                                  this.populateData();
                                }, 100);
                              }
                            }}
                            className={
                              this.state.headingIndex === i ? "active" : ""
                            }
                          >
                            <a href="#">{heading}</a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>

                  <div
                    className="ml-4 fullWidth "
                  >
                    {this.props.match && this.props.match.params.applicationId && (
                      <div className="mb-4">
                        <StatusBarLarge
                          isChange={false}
                          status={this.state.applicationDetails.status}
                          label={this.state.applicationDetails.status}
                          timeStamp={this.state.applicationDetails.timestamp}
                          applicationId={
                            this.state.applicationDetails.applicationId
                          }
                          inspectionData={
                            this.state.applicationDetails.inspection
                              ? this.state.applicationDetails.inspection
                              : ""
                          }
                        />
                      </div>
                    )}
                    <div
                      id="content"
                      className="form-content  p-4 fullWidth white-bg"
                    >
                      <button
                        type="button"
                        id="sidebarCollapse"
                        className={
                          "btn btn-info d-sm-block d-md-none " +
                          (this.state.showSidebar
                            ? "d-none-imp"
                            : "d-block-imp")
                        }
                        onClick={this.toggleSideBar}
                      >
                        <i className="fa fa-bars"></i>
                        {/* <span>Toggle Sidebar</span> */}
                      </button>
                      <form id="application-form">
                        {this.state.formFieldGroups.length > 0 &&
                          this.state.formFieldGroups[
                            this.state.headingIndex
                          ].map((field, index) => {
                            // console.log(LANG.FIELD_TYPES[field.fieldType]);
                            switch (LANG.FIELD_TYPES[field.fieldType]) {
                              case LANG.FIELD_TYPES.text:
                                return (
                                  <Input
                                    key={index}
                                    field={field}
                                    title={this.state.formTitle}
                                  />
                                );
                              case LANG.FIELD_TYPES.numeric:
                                return (
                                  <Input
                                    key={index}
                                    field={field}
                                    title={this.state.formTitle}
                                  />
                                );
                              case LANG.FIELD_TYPES.date:
                                return (
                                  <Input
                                    key={index}
                                    field={field}
                                    title={this.state.formTitle}
                                  />
                                );
                              case LANG.FIELD_TYPES.email:
                                return (
                                  <Input
                                    key={index}
                                    field={field}
                                    title={this.state.formTitle}
                                  />
                                );
                              case LANG.FIELD_TYPES.dropdown:
                                return (
                                  <Select
                                    key={index}
                                    field={field}
                                    title={this.state.formTitle}
                                  />
                                );
                              case LANG.FIELD_TYPES.radio:
                                return (
                                  <Radio
                                    key={index}
                                    field={field}
                                    title={this.state.formTitle}
                                  />
                                );
                              case LANG.FIELD_TYPES.checkbox:
                                return (
                                  <Checkbox
                                    key={index}
                                    field={field}
                                    title={this.state.formTitle}
                                  />
                                );
                              case LANG.FIELD_TYPES.boolean:
                                return (
                                  <Toggle
                                    key={index}
                                    field={field}
                                    title={this.state.formTitle}
                                  />
                                );
                              case LANG.FIELD_TYPES.textarea:
                                return (
                                  <Textarea
                                    key={index}
                                    field={field}
                                    title={this.state.formTitle}
                                  />
                                );
                              // case LANG.FIELD_TYPES.rating:
                              //   return <Rating key={index} field={field} />;
                              case LANG.FIELD_TYPES.file:
                                // var fileOrder = this.state.formFieldGroups[this.state.headingIndex][index].order;
                                return (
                                  <FileUpload
                                    key={index}
                                    field={field}
                                    // files={
                                    //   this.state.formFields["field_" + fileOrder] !== undefined &&
                                    //   this.state.formFields["field_" + fileOrder] !== ""
                                    //     ? this.state.formFields[
                                    //         "field_" + fileOrder
                                    //       ].split(",")
                                    //     : []
                                    // }
                                  />
                                );
                              case LANG.FIELD_TYPES.multiselect:
                                return (
                                  <MultiSelect
                                    key={index}
                                    field={field}
                                    title={this.state.formTitle}
                                  />
                                );
                              default:
                                return <div key={index}></div>;
                            }
                          })}
                      </form>
                    </div>
                    <div className="row mt-3 mb-4">
                      <div className="col-12">
                        {this.state.headingIndex > 0 && (
                          <button
                            onClick={(e) => {
                              this.saveFields(this.state.headingIndex);
                              // if (this.validationPassed()) {
                              this.setState({
                                headingIndex: this.state.headingIndex - 1,
                              });
                              setTimeout(() => {
                                this.populateData();
                              }, 100);
                              setTimeout(() => {
                                this.populateData();
                              }, 150);
                              // }
                            }}
                            className="btn btn-primary smf-btn-primary float-left mb-3"
                          >
                            <i className="fa fa-arrow-left mr-2"></i>
                            Previous
                          </button>
                        )}
                        <div className="pull-right">
                          {
                            // !(
                            //   this.props.match.params.applicationId !== null &&
                            //   this.props.match.params.applicationId !== undefined
                            // ) &&
                            Helper.getUserRole() === APP.ROLE.INSTITUTION &&
                              this.state.showSaveAsDraft && (
                                <button
                                  className="btn btn-outline smf-btn-default mb-3"
                                  onClick={(e) => {
                                    this.saveFields(this.state.headingIndex);
                                    // if (this.validationPassed()) {
                                    this.submitForm(true);
                                    // }
                                  }}
                                >
                                  Save as draft
                                </button>
                              )
                          }
                          {
                            // !(
                            //   this.props.match.params.applicationId !== null &&
                            //   this.props.match.params.applicationId !== undefined
                            // ) &&
                            Helper.getUserRole() === APP.ROLE.INSTITUTION &&
                              this.state.headingIndex ===
                                this.state.formHeadings.length - 1 && (
                                <button
                                  className="btn smf-btn-primary mb-3"
                                  onClick={(e) => {
                                    this.saveFields(this.state.headingIndex);
                                    if (this.validationPassed()) {
                                      this.submitForm(false);
                                    }
                                  }}
                                >
                                  Submit application
                                </button>
                              )
                          }
                          {this.state.headingIndex <
                            this.state.formHeadings.length - 1 && (
                            <button
                              onClick={(e) => {
                                this.saveFields(this.state.headingIndex);
                                if (this.validationPassed()) {
                                  this.setState({
                                    headingIndex: this.state.headingIndex + 1,
                                  });
                                  setTimeout(() => {
                                    this.populateData();
                                  }, 100);
                                }
                              }}
                              className="btn btn-primary smf-btn-primary mr-0 ml-2 mb-3"
                            >
                              Next
                              <i className="fa fa-arrow-right ml-2"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FormViewer;
