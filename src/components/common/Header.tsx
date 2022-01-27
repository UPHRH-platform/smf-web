import React, { Component, Fragment } from "react";
// import { Link } from "react-router-dom";

/**
 * Header component
 */

class Header extends Component {
  // constructor(props: any) {
  //   super(props);
  // }

  render() {
    return (
      <Fragment>
        <div className="container top-header">
          <div
            className="row"
          >
            <div className="col-6 pt-3">
              <img src="./../img/Logo-Header.png" className="img-fluid" alt="Responsive image" />
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
              <li className="mr-5 active">HOME</li>
              <li className="mr-5">MY APPLICATIONS</li>
              <li className="mr-5">APPLICATIONS</li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Header;
