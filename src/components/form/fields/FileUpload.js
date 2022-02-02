import React, { Component } from "react";
// import LocalizedStrings from "react-localization";
// import { translations } from "./../../../../translations.js";
import { LANG, APP } from "./../../../constants/index";
import { FormService } from "../../../services/form.service";
import Notify from "./../../../helpers/notify";
// const $ = window.$;

// let strings = new LocalizedStrings(translations);

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldType: "",
      language: "en",
      fileURL: "",
      filesUploaded: this.props.files || [],
    };
    this.handleUploadfile = this.handleUploadfile.bind(this)
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
      });
    }
    if (this.props.field.isRequired) {
      document.getElementById(
        "field-" + this.props.field.order
      ).required = true;
    }
  }

  handleUploadfile = (event) => {
    event.preventDefault();
    const data = new FormData();
    console.log('event.target.files', event.target.files[0])
    if (event.target.files[0]) {
      data.append('files', event.target.files[0]);
      FormService.uploadfile(
        data
      ).then(
        response => {
          if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
            // this.props.history.push("/dashboard");
            // console.log('SUCESS response :', response)
            // console.log(response.responseData[0])
            this.setState({
              fileURL: [...this.state.fileURL, response.responseData[0]],
              filesUploaded: [
                ...this.state.filesUploaded,
                {
                  'name': event.target.files[0].name,
                  'url': response.responseData[0]
                }
              ]
            });
            console.log(this.state.filesUploaded)
          } else {
            Notify.error(response.statusInfo.errorMessage);
          }
        },
        error => {
          error.statusInfo
            ? Notify.error(error.statusInfo.errorMessage)
            : Notify.error(error.message);
        },
      );
    }
    return;
  }

  removeFileSelected = (file, index) => {
    const updatedFileURL = this.state.fileURL.filter((url) => {
      console.log(file.url)
      console.log(url)
      return url !== file.url
    })
    const updatedFilesUploaded = this.state.filesUploaded.filter(function (obj) {
      return obj.name !== file.name;
    });
    this.setState({
      filesUploaded: [...updatedFilesUploaded],
      fileURL: [...updatedFileURL]
    })
    document.getElementById(
      "field-" + this.props.field.order
    ).value = '';
  }

  render() {
    // strings.setLanguage(
    //   localStorage.getItem("language") || this.state.language
    // );
    return (
      <>
      <div
            className={`col-md-${this.props.field.width ? this.props.field.width : LANG.DEFAULT_COL
              }`}
        >
        <div className="form-group">
          <div
            className={`custom-file`}
          >
            <input
              type={this.state.fieldType}
              id={"field-" + this.props.field.order}
              name={"field_" + this.props.field.order}
              path={this.state.fileURL}
              accept="image/jpg, image/jpeg, image/png, application/pdf"
              className="form-control-file custom-file-input"
              onChange={(e) => { this.handleUploadfile(e) }}
            // placeholder="Type here"
            // autoComplete="off"
            />
            <label className="custom-file-label" htmlFor={"field-" + this.props.field.order}>{this.props.field.name}</label>
          </div>
        </div>
        {this.state.filesUploaded && this.state.filesUploaded.length > 0 &&
          <div className="custom-file-display">
            {this.state.filesUploaded.map((file, index) => (
              <div className="file-item" key={index}>
                <span>{file.name}</span>
                <span className="close" onClick={(e) => this.removeFileSelected(file, index)}><i className="fa fa-close"></i></span>
              </div>
            ))}
          </div>
        }
        </div>
      </>
    );
  }
}

export default FileUpload;
