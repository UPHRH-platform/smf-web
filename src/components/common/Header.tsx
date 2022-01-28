import React, { Component, Fragment } from "react";
import Auth from "../../helpers/auth";
import { Link } from "react-router-dom";

/**
 * Header component
 */
 interface LoginProps {
  history: any
}

interface LoginState {
  user: any
}
class Header extends Component<LoginProps, LoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: Auth.get('authToken'),
    };
  }

  getUserInitials(userName: string) {
    if (userName) {
      const userNameArr = userName.split(' ').slice(0, 2)
      return userNameArr.map((u) => u[0]).join('').toUpperCase()
    } else {
      return ''
    }
  }

  render() {
    return (
      <Fragment>
        <div className="container-fluid white-bg">

          <div className="container top-header">
            <div
              className="row"
            >
              <div className="col-6 pt-3">
                <img src="img/smf-header-logo.svg" className="img-fluid" alt="Responsive image" />
              </div>
              <div className="col-6 pt-3">
                <div className="float-right user-name-avatar">
                  <span>{this.getUserInitials(this.state.user && this.state.user.name || 'Christy Fernandes')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row divider custom-divider"></div>
          </div>
          <div className="container top-header">
            <div
              className="row"
            >
              <ul className="smf-menu mt-3">
                <li className="mr-5 active">
                  <Link to={"/dashboard"} className={`${
                  this.props.history.location.pathname.match("/dashboard")
                    ? "active"
                    : ""
                }`}>HOME</Link>
                </li>
                <li className="mr-5">
                  <Link to={"/dashboard"} className="">MY APPLICATIONS</Link>
                </li>
                <li className="mr-5">
                  <Link to={"/forms"} className={`${
                  this.props.history.location.pathname.match("/forms")
                    ? "active"
                    : ""
                }`}>APPLICATIONS</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Header;
