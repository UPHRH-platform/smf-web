import React, { Component } from "react";
// import LocalizedStrings from "react-localization";
// import { translations } from "./../../../../translations.js";
import { LANG } from "./../../../constants/index";
// const $ = window.$;

// let strings = new LocalizedStrings(translations);

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldType: "",
      language: "en",
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
    data.append('photo',event.target.files[0] );
    data.append('name', 'Test Name');
    data.append('desc', 'Test description');
    console.log('handleUploadfile:: data -- ', data)
    // fetch("http://localhost:3001/todo/upload", {
    //      method: 'POST',
    //      headers: {
    //          'Accept': 'application/json',
    //      },
    //      body: data
    // }).then((response) =>  {
    //    return response.text();
    // })
  }

  render() {
    // strings.setLanguage(
    //   localStorage.getItem("language") || this.state.language
    // );
    return (
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
            name={this.props.title + "-field" + this.props.field.order}
            className="form-control-file"
            onChange={this.handleUploadfile}
            // placeholder="Type here"
            // autoComplete="off"
          />
        </div>
      </div>
    );
  }
}

export default FileUpload;
