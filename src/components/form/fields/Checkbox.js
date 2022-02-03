import React, { Component } from "react";
// import LocalizedStrings from "react-localization";
// import { translations } from "./../../../../translations.js";
import { LANG } from "./../../../constants/index";
// const $ = window.$;

// let strings = new LocalizedStrings(translations);

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "en",
    };
  }

  handleChange = (event) => {};

  getCheckedStatus = (option) => {
    console.log('option :: ', option)
    setTimeout(() => {
      return document.getElementById(option).checked
    }, 500)
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
          {this.props.field.values.map((option, key) => (
            <div className="custom-form-check form-check" key={key}>
              <label htmlFor={"field-" + this.props.field.order+key} className={
                    "mr-2 noselect custom-checkbox "}>
                <input
                  type="checkbox"
                  name={"field_" + this.props.field.order}
                  id={"field-" + this.props.field.order+key}
                  className={
                    "mr-2 form-check-input field_" +
                    this.props.field.order +
                    "_checkbox"
                  }
                  value={option.key}
                />
                {" " + option.value}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Checkbox;
