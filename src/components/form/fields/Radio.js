import React, { Component } from "react";
// import LocalizedStrings from "react-localization";
// import { translations } from "./../../../../translations.js";
import { LANG } from "./../../../constants/index";
// const $ = window.$;

// let strings = new LocalizedStrings(translations);

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "en",
    };
  }

  componentDidMount() {
    // if (this.props.field.isRequired) {
    //   let radioOptions = document.querySelectorAll(
    //     "input[name=field_" + this.props.field.order + "]"
    //   );
    //   radioOptions[0].checked = true;
    // }
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
          <div className="row">
            <div className="col-md-12">
              {this.props.field.values.map((option, key) => (
                <div className="radio" key={key}>
                  <label
                    htmlFor={"field-" + this.props.field.order + key}
                    className={
                      "mr-2 noselect custom-radio radio-label-" +
                      this.props.field.order
                    }
                  >
                    <input
                      type="radio"
                      className={
                        "mr-2 field_" + this.props.field.order + "_radio"
                      }
                      name={"field_" + this.props.field.order}
                      id={"field-" + this.props.field.order + key}
                      value={option.key}
                    />
                    {" " + option.value}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Radio;
