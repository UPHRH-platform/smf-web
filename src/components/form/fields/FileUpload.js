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
    // console.log('event.target.files', event.target.files[0])
    if(event.target.files[0]) {
      data.append('files',event.target.files[0] );
      FormService.uploadfile(
        data
      ).then(
        response => {
          if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
            // this.props.history.push("/dashboard");
            // console.log('SUCESS response :', response)
            // console.log(response.responseData[0])
            this.setState({
              fileURL: response.responseData[0],
            });
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

  render() {
    // strings.setLanguage(
    //   localStorage.getItem("language") || this.state.language
    // );
    return (
      <>
      <div className="form-group">
        <div
          className={`col-md-${
            this.props.field.width ? this.props.field.width : LANG.DEFAULT_COL
          }`}
        >
          <label htmlFor={"field-" + this.props.field.order}>
            {this.props.field.name}
          </label>
          <input
            type={this.state.fieldType}
            id={"field-" + this.props.field.order}
            name={"field_" + this.props.field.order}
            path={this.state.fileURL}
            className="form-control-file"
            onChange={(e) => {this.handleUploadfile(e)}}
            // placeholder="Type here"
            // autoComplete="off"
          />
        </div>
      </div>
      {/* <div className="input-group mb-3">
      <div className="custom-file">
        <input type="file" className="custom-file-input" id="inputGroupFile03"/>
        <label className="custom-file-label" htmlFor="inputGroupFile03">Choose file</label>
      </div>
    </div> */}
      </>
    );
  }
}

export default FileUpload;
