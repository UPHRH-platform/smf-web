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
          <label>{this.props.field.name}</label>
          {this.props.field.values.map((option, key) => (
            <div className="form-check" key={key}>
              <label htmlFor={"field-" + this.props.field.order} >
                &nbsp;&nbsp;&nbsp;
                <input
                  type="checkbox"
                  name={this.props.title + "-field" + this.props.field.order}
                  className="form-check-input"
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
