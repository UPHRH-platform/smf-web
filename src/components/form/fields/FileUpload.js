/* eslint-disable no-multi-str */
import { Component } from "react";
// import LocalizedStrings from "react-localization";
// import { translations } from "./../../../../translations.js";
import { LANG, APP } from "./../../../constants/index";
import { FormService } from "../../../services/form.service";
import Notify from "./../../../helpers/notify";
const $ = window.$;

// let strings = new LocalizedStrings(translations);

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldType: "",
      fieldOrder: "",
      language: "en",
      fileURL: "",
      filesUploaded: this.props.files || [],
    };
    this.handleUploadfile = this.handleUploadfile.bind(this);
  }

  componentDidMount() {
    if (
      LANG.FIELD_TYPES.numeric === LANG.FIELD_TYPES[this.props.field.fieldType]
    ) {
      this.setState({
        fieldType: LANG.NUMBER,
      });
    } else {
      this.setState({
        fieldType: this.props.field.fieldType,
        fieldOrder: this.props.field.fieldOrder,
      });
    }
    if (this.props.field.isRequired) {
      document.getElementById(
        "field-" + this.props.field.order
      ).required = true;
    }
    // $(function () {
    $(document).on(
      "click",
      `#files-list-${this.props.field.order} .cross`,
      (e) => {
        let item =
            e.currentTarget.parentNode.parentNode.childNodes[0].children[0]
              .innerText;
        e.currentTarget.parentNode.remove();
        var elements = document.getElementById(
          `files-${this.props.field.order}`
        );

        var temp = document
          .getElementById("field-" + this.props.field.order)
          .getAttribute("path");
        if (temp !== "" && temp != null) {
          temp = temp.split(",");
          let index = temp.indexOf(item);
          if (index !== -1) {
            temp.splice(index, 1);
          }
          temp.join(",");
        } else {
          temp = "";
        }
        document
          .getElementById("field-" + this.props.field.order)
          .setAttribute("path", temp);

        if (elements.children === null) {
          elements.style.display = "none";
        } else if (elements.children.length === 0) {
          elements.style.display = "none";
        }
      }
    );
    // });
  }

  componentDidUpdate(nextProps) {
    if (nextProps.field.order !== this.state.fieldOrder) {
      $(document).on(
        "click",
        `#files-list-${this.props.field.order} .cross`,
        (e) => {
          let item =
            e.currentTarget.parentNode.parentNode.childNodes[0].children[0]
              .innerText;
          e.currentTarget.parentNode.remove();
          var elements = document.getElementById(
            `files-${this.props.field.order}`
          );

          var temp = document
            .getElementById("field-" + this.props.field.order)
            .getAttribute("path");
          if (temp !== "" && temp != null) {
            temp = temp.split(",");
            let index = temp.indexOf(item);
            if (index !== -1) {
              temp.splice(index, 1);
            }
            temp.join(",");
          } else {
            temp = "";
          }
          document
            .getElementById("field-" + this.props.field.order)
            .setAttribute("path", temp);

          if (elements.children === null) {
            elements.style.display = "none";
          } else if (elements.children.length === 0) {
            elements.style.display = "none";
          }
        }
      );
    }
  }

  handleUploadfile = (event) => {
    event.preventDefault();
    const data = new FormData();
    // console.log('event.target.files', event.target.files[0])
    if (event.target.files[0]) {
      data.append("files", event.target.files[0]);
      FormService.uploadfile(data).then(
        (response) => {
          if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
            var element = document.getElementById(
              "files-list-" + this.props.field.order
            );
            element.style.display = "block";
            element.innerHTML +=
              '<div class="col-12 file-item">\
            <span>' +
              response.responseData[0] +
              '</span>\
            <span \
            class="cross" \
          > \
            X \
          </span>\
          </div>';
            var temp = document
              .getElementById("field-" + this.props.field.order)
              .getAttribute("path");
            if (temp !== "" && temp != null) {
              temp = temp.split(",");
              temp.push(response.responseData[0]);
              temp.join(",");
            } else {
              temp = response.responseData[0];
            }
            // alert(temp);
            document
              .getElementById("field-" + this.props.field.order)
              .setAttribute("path", temp);
            this.setState({
              fileURL: [...this.state.fileURL, response.responseData[0]],
              filesUploaded: [
                ...this.state.filesUploaded,
                response.responseData[0],
              ],
            });

            // this.state.filesUploaded.push(response.responseData[0]);
            // this.setState({
            //   fileURL:this.state.filesUploaded.join(",")
            // })
            // console.log(response.responseData[0].name);
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
    return;
  };

  removeFileSelected = (e) => {
    e.currentTarget.parentNode.remove();
    var elements = document.getElementById("files-" + this.props.field.order);
    if (elements.children.length === 0) {
      elements.style.display = "none";
    }
  };

  render() {
    // strings.setLanguage(
    //   localStorage.getItem("language") || this.state.language
    // );
    return (
      <>
        <div
          className={`mb-3 col-md-${
            this.props.field.width ? this.props.field.width : LANG.DEFAULT_COL
          }`}
        >
          <div className="form-group">
            <label htmlFor={"field-" + this.props.field.order}>
              {this.props.field.name}
              {this.props.field.isRequired && (
                <span title="Required" className="required">
                  &nbsp; *
                </span>
              )}
            </label>
            <div className={`custom-file`}>
              <input
                type={this.state.fieldType}
                id={"field-" + this.props.field.order}
                name={"field_" + this.props.field.order}
                path=""
                accept={APP.FILE_UPLOAD_ALLOWED_FORMATS}
                className={
                  "form-control-file custom-file-input field_" +
                  this.props.field.order +
                  "_file"
                }
                onChange={(e) => {
                  this.handleUploadfile(e);
                }}
                // placeholder="Type here"
                // autoComplete="off"
              />
              <label
                className="custom-file-label"
                htmlFor={"field-" + this.props.field.order}
              ></label>
            </div>
          </div>
          <div
            style={{ display: "none" }}
            className="custom-file-display"
            id={"files-list-" + this.props.field.order + ""}
          ></div>
          {/* {this.state.filesUploaded && this.state.filesUploaded.length > 0 && (
            <div className="custom-file-display mt-2">
              {this.state.filesUploaded.map((file, index) => (
                <div className="file-item" key={index}>
                  <Link 
                  // target="_blank" to={file.replace("https://", "//")}
                  to={"#"}
                  >
                    {file}
                  </Link>
                  <span
                    className="close"
                    onClick={(e) => this.removeFileSelected(file, index)}
                  >
                    <i className="fa fa-close"></i>
                  </span>
                </div>
              ))}
            </div>
          )} */}
        </div>
      </>
    );
  }
}

export default FileUpload;
