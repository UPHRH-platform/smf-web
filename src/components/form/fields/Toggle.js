import React, { Component } from "react";
// import LocalizedStrings from "react-localization";
// import { translations } from "./../../../../translations.js";
import { LANG } from "./../../../constants/index";
// const $ = window.$;

// let strings = new LocalizedStrings(translations);

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "en",
    };
  }

  handleChange = (event) => {};

  componentDidMount() {
    if (this.props.field.fieldType === LANG.FIELD_TYPES.boolean.toLowerCase()) {
      setTimeout(() => {
        let booleanField = document.getElementById(
          `field-${this.props.field.order}`
        );

        booleanField.type = "checkbox";
      }, 250);
    }
  }

  componentDidUpdate() {
    if (this.props.field.fieldType === LANG.FIELD_TYPES.boolean.toLowerCase()) {
      setTimeout(() => {
        let booleanField = document.getElementById(
          `field-${this.props.field.order}`
        );

        booleanField.type = "checkbox";
      }, 250);
    }
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
          <label>
            {this.props.field.name}
            {this.props.field.isRequired && (
              <span title="Required" className="required">
                &nbsp; *
              </span>
            )}
          </label>
          <br />

          <label className="switch">
            <input
              type="checkbox"
              id={"field-" + this.props.field.order}
              name={"field_" + this.props.field.order}
              className={
                "mr-2 field_" +
                this.props.field.order +
                "_boolean"
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    );
  }
}

export default Toggle;
