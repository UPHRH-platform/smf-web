import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

/**
 * Header component
 */

interface LoginProps {
  history: any
}

interface LoginState {
}

class Header extends Component<LoginProps, LoginState> {
  constructor(props: any) {
    super(props);
    // console.log(this, props.history)
  }

  render() {
    return (
      <Fragment>
        <div className="container top-header">
          <div
            className="row"
          >
            <div className="col-6 pt-3">
              <img src="./../../img/Logo-Header.png" className="img-fluid" alt="Responsive image" />
            </div>
            <div className="col-6 pt-3">
              <div className="float-right user-name-avatar"><span>SM</span></div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row divider"></div>
        </div>
        <div className="container top-header">
          <div
            className="row"
          >
            <ul className="smf-menu mt-3">
              <li className="mr-5"><Link to={"/dashboard"} className={`${
                this.props.history.location.pathname.match("/dashboard")
                  ? "active"
                  : ""
              }`}>HOME</Link></li>
              <li className="mr-5"><Link to={"/dashboard"} className="">MY APPLICATIONS</Link></li>
              <li className="mr-5"><Link to={"/forms"} className={`${
                this.props.history.location.pathname.match("/forms")
                  ? "active"
                  : ""
              }`}>APPLICATIONS</Link></li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Header;
