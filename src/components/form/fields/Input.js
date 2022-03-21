import React, { Component } from "react";
// import LocalizedStrings from "react-localization";
// import { translations } from "./../../../../translations.js";
import { LANG } from "./../../../constants/index";
// const $ = window.$;

// let strings = new LocalizedStrings(translations);

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldType: "",
      language: "en",
      isInvalid: false,
    };
    this.validateEmailInput = this.validateEmailInput.bind(this);
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

  validateEmailInput = (e) => {
    let inputData = e.target.value;
    //eslint-disable-next-line
    let allowedFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputData.match(allowedFormat)) {
      this.setState({
        isInvalid: false,
      });
    } else {
      this.setState({
        isInvalid: true,
      });
    }
  };

  render() {
    // console.log(this.props.field.fieldType);
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
            {this.props.field.isRequired && (
              <span title="Required" className="required">
                &nbsp; *
              </span>
            )}
          </label>

          {this.props.field.fieldType !==
            LANG.FIELD_TYPES.email.toLowerCase() && (
            <input
              type={
                this.props.field.fieldType === LANG.FIELD_TYPES.numeric
                  ? "number"
                  : this.state.fieldType
              }
              id={"field-" + this.props.field.order}
              name={"field_" + this.props.field.order}
              className="form-control"
              placeholder="Type here"
              autoComplete="off"
            />
          )}

          {this.props.field.fieldType ===
            LANG.FIELD_TYPES.email.toLowerCase() && (
            <div className="">
              <input
                type="email"
                id={"field-" + this.props.field.order}
                name={"field_" + this.props.field.order}
                className="form-control"
                placeholder="Type here"
                autoComplete="off"
                onChange={this.validateEmailInput}
              />
              {this.state.isInvalid && (
                <p className="invalid-input">Invalid email!</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Input;
