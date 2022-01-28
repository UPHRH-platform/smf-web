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
import Rating from "./fields/Rating";
import FileUpload from "./fields/FileUpload";
import MultiSelect from "./fields/MultiSelect";
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
    };
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.loadFormDetails = this.loadFormDetails.bind(this);
  }

  toggleSideBar() {
    console.log("toggleSideBar");
    this.setState({
      showSidebar: !this.state.showSidebar,
    });
  }

  componentDidMount() {
    this.loadFormDetails(this.props.match.params.id);
  }

  componentDidUpdate(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.loadFormDetails(this.props.match.params.id);
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

  render() {
    return (
      <Fragment>
        <Header history={this.props.history} />
        <div className="container-fluid main-container">
          <div className="row">
            <div className="col-12">
              <div className="container pt-5 pl-2 pr-2">
                <div className="d-flex row mb-4">
                  <div className="col-md-3">
                    <h2 className="title mb-0">
                      {this.state.formDetails.title}
                    </h2>
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-6">
                        {this.state.headingIndex > 0 && (
                          <button
                            onClick={(e) =>
                              this.setState({
                                headingIndex: this.state.headingIndex - 1,
                              })
                            }
                            className="btn btn-primary smf-btn-primary float-left"
                            style={{ marginLeft: "-30px" }}
                          >
                            <i className="fa fa-arrow-left mr-2"></i>
                            Previous
                          </button>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="pull-right">
                          <button className="btn btn-outline smf-btn-default">
                            Save
                          </button>
                          {this.state.headingIndex <
                            this.state.formHeadings.length - 1 && (
                            <button
                              onClick={(e) =>
                                this.setState({
                                  headingIndex: this.state.headingIndex + 1,
                                })
                              }
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
                              this.setState({ headingIndex: i });
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
                    <form>
                      {this.state.formFieldGroups.length > 0 &&
                        this.state.formFieldGroups[this.state.headingIndex].map(
                          (field, index) => {
                            switch (LANG.FIELD_TYPES[field.fieldType]) {
                              case LANG.FIELD_TYPES.text:
                                return <Input key={index} field={field} />;
                              case LANG.FIELD_TYPES.numeric:
                                return <Input key={index} field={field} />;
                              case LANG.FIELD_TYPES.date:
                                return <Input key={index} field={field} />;
                              case LANG.FIELD_TYPES.email:
                                return <Input key={index} field={field} />;
                              case LANG.FIELD_TYPES.dropdown:
                                return <Select key={index} field={field} />;
                              case LANG.FIELD_TYPES.radio:
                                return <Radio key={index} field={field} />;
                              case LANG.FIELD_TYPES.checkbox:
                                return <Checkbox key={index} field={field} />;
                              case LANG.FIELD_TYPES.boolean:
                                return <Toggle key={index} field={field} />;
                              case LANG.FIELD_TYPES.textarea:
                                return <Textarea key={index} field={field} />;
                              case LANG.FIELD_TYPES.rating:
                                return <Rating key={index} field={field} />;
                              case LANG.FIELD_TYPES.file:
                                return <FileUpload key={index} field={field} />;
                              case LANG.FIELD_TYPES.multiselect:
                                return (
                                  <MultiSelect key={index} field={field} />
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
