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
    };
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.loadFormDetails = this.loadFormDetails.bind(this);
    this.saveFields = this.saveFields.bind(this);
    this.populateForm = this.populateForm.bind(this);
    this.populateData = this.populateData.bind(this);
    this.validationPassed = this.validationPassed.bind(true);
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
      setTimeout(() => {
        this.populateForm(this.props.match.params.applicationId);
      }, 50);
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
          var savedFields = response.responseData[0].dataObject;
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
    var fields = this.state.formFields;
    // console.log(this.state.formFields);
    for (var key of Object.keys(fields)) {
      var element = document.getElementsByName(key);
      if (element.length > 0) {
        if (element[0].type === "checkbox" || element[0].type === "radio") {
          var len = element.length;
          let values = fields[key].split(",");
          for (var j = 0; j < len; j++) {
            if (values.includes(element[j].value)) {
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
        } else {
          element[0].value = fields[key];
        }
      }
    }
  };

  validationPassed = () => {
    let flag = true;
    let fields = this.state.formFieldGroups[this.state.headingIndex];
    for (let i = 0; i < fields.length; i++) {
      // console.log("field_" + fields[i].order);
      if (
        this.state.formFields["field_" + fields[i].order] === "" &&
        fields[i].isRequired
      ) {
        flag = false;
      }
    }
    if (!flag) {
      Notify.error("Please fill all required fields.");
    }
    return flag;
  };

  saveFields = (index) => {
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
    console.log(obj);
  };

  submitForm = () => {
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
    };
    // formDetails = JSON.stringify(formDetails);
    FormService.submit(formDetails).then(
      (response) => {
        console.log(response);
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          Notify.success(response.statusInfo.statusMessage);
          this.props.history.push("/dashboard");
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
        <Header history={this.props.history} />
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
                  <div className="col-12">
                    <div className="row mt-3">
                      <div className="col-6 ">
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
                              // }
                            }}
                            className="btn btn-primary smf-btn-primary float-left"
                          >
                            <i className="fa fa-arrow-left mr-2"></i>
                            Previous
                          </button>
                        )}
                      </div>
                      <div className="col-6">
                        <div className="pull-right">
                          {!(
                            this.props.match.params.applicationId !== null &&
                            this.props.match.params.applicationId !==
                              undefined &&
                            Helper.getUserRole() === APP.ROLE.INSTITUTION
                          ) &&
                            this.state.headingIndex ===
                              this.state.formHeadings.length - 1 && (
                              <button
                                className="btn btn-outline smf-btn-default"
                                onClick={(e) => {
                                  this.saveFields(this.state.headingIndex);
                                  if (this.validationPassed()) {
                                    this.submitForm();
                                  }
                                }}
                              >
                                Save
                              </button>
                            )}
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
                              className="btn btn-primary smf-btn-primary mr-0 ml-2"
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
                              } else {
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
                    id="content"
                    className="form-content ml-4 mb-4 p-4 fullWidth white-bg"
                  >
                    <button
                      type="button"
                      id="sidebarCollapse"
                      className={
                        "btn btn-info d-sm-block d-md-none " +
                        (this.state.showSidebar ? "d-none-imp" : "d-block-imp")
                      }
                      onClick={this.toggleSideBar}
                    >
                      <i className="fa fa-bars"></i>
                      {/* <span>Toggle Sidebar</span> */}
                    </button>
                    <form id="application-form">
                      {this.state.formFieldGroups.length > 0 &&
                        this.state.formFieldGroups[this.state.headingIndex].map(
                          (field, index) => {
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
                                return <FileUpload key={index} field={field} />;
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
                          }
                        )}
                    </form>
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
