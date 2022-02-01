import React, { Component } from "react";
// import LocalizedStrings from "react-localization";
// import { translations } from "./../../../../translations.js";
import { LANG } from "./../../../constants/index";
// const $ = window.$;

// let strings = new LocalizedStrings(translations);

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "en",
    };
  }

  componentDidMount() {
    if (this.props.field.isRequired) {
      document.getElementById(
        "field-" + this.props.field.order
      ).required = true;
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
          <label htmlFor={"field-" + this.props.field.order}>
            {this.props.field.name}
          </label>
          <select
            className="custom-select"
            id={"field-" + this.props.field.order}
            name={"field_" + this.props.field.order}
          >
            <option defaultValue>Select from dropdown</option>
            {this.props.field.values.map((option, key) => (
              <option key={key} value={option.key}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default Select;
