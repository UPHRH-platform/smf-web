import React, { Component, Fragment } from "react";
import Auth from "../../helpers/auth";
import { Link } from "react-router-dom";
import { UserService } from "../../services/user.service";

/**
 * Header component
 */
 interface LoginProps {
  history: any
}

interface LoginState {
  userName: any
}
class Header extends Component<LoginProps, LoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      userName: Auth.get('username'),
    };
    this.logout = this.logout.bind(this);
  }

  getUserInitials(userName: string) {
    console.log('userName: ', userName)
    if (userName) {
      const userNameArr = userName.split('.').slice(0, 2)
      return userNameArr.map((u) => u[0]).join('').toUpperCase()
    } else {
      return ''
    }
  }

  logout = () => {
    console.log('UserService.logout called')
    UserService.logout();
    this.props.history.push("/login");
  };

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
              <div className="dropdown">
                <div className="float-right user-name-avatar"  
                role="button"
                id="dropdownMenuLinkThree"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                  <span>
                    {this.getUserInitials(this.state.userName && this.state.userName || 'G')}
                  </span>
                <div
                className="dropdown-menu profileDropdown mr-5 cursorStyleOne"
                aria-labelledby="dropdownMenuLinkThree"
              >
                
                <p
                  className="dropdown-item dateFilterTextColor"
                  onClick={this.logout}
                >
                  Logout
                </p>
              </div>
                </div>
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
