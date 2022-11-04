/* eslint-disable no-mixed-operators */
import { Component, Fragment } from "react";
import Auth from "../../helpers/auth";
import { Link } from "react-router-dom";
import { UserService } from "../../services/user.service";
import { APP } from "../../constants";
import Helper from "../../helpers/auth";
import { Breadcrumbs } from "./Breadcrumbs";

/**
 * Header component
 */
interface LoginProps {
  history: any;
  breadCrumb?: any;
}

interface LoginState {
  userName: any;
  userInfo: any;
}
const userRole = Helper.getUserRole();
class Header extends Component<LoginProps, LoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      userName: Auth.get("username"),
      userInfo: {},
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    let userDetails: any = localStorage.getItem("user");

    let userObj = {
      firstName: JSON.parse(userDetails).firstName,
      lastName: JSON.parse(userDetails).lastName,
    };

    this.setState({
      userInfo: userObj,
    });
  }

  getUserInitials(userName: string) {
    // console.log('userName: ', userName)

    if (userName) {
      const userNameArr = userName.split(".").slice(0, 2);
      return userNameArr
        .map((u) => u[0])
        .join("")
        .toUpperCase();
    } else {
      return "";
    }
  }

  logout() {
    UserService.logout();
    this.props.history.push("/login");
  }

  render() {
    return (
      <Fragment>
        <div className="container-fluid white-bg">
          <div className="container top-header">
            <div className="row">
              <div className="col-6 pt-3">
                <img
                  src="./../../img/smf-header-logo.svg"
                  className="img-fluid"
                  alt="SMF logo"
                />
              </div>
              <div className="col-6 pt-3">
                <div className="">
                  <div className="dropdown">
                    <div
                      className="float-right user-name-avatar"
                      role="button"
                      id="dropdownMenuLinkThree"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span>
                        {this.getUserInitials(
                          (this.state.userName && this.state.userName) || "G"
                        )}
                      </span>
                    </div>
                    <ul
                      className="dropdown-menu cursorStyleOne custom-dropdown-1 dropdown-menu-right"
                      aria-labelledby="dropdownMenuLinkThree"
                    >
                      <label className="username-1 px-4 pb-0 mb-0">
                        {Object.keys(this.state.userInfo)
                          ? this.state.userInfo.firstName +
                            " " +
                            this.state.userInfo.lastName
                          : ""}
                      </label>
                      <br />
                      <label className="email-1 px-4 ">
                        {this.state.userName && this.state.userName}
                      </label>
                      <br />
                      <label
                        className="dropdown-item px-4 cursorStyleOne"
                        onClick={this.logout}
                      >
                        Logout
                      </label>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row divider custom-divider"></div>
          </div>
          <div className="container top-header">
            <div className="row h100">
              {(this.props.history.location.pathname.match("/dashboard") ||
                !this.props.breadCrumb ||
                !this.props.breadCrumb.length) && (
                <ul className="smf-menu mt-3">
                  <li className="mr-3 mr-sm-2 mr-md-5 mr-lg-5 active">
                    <Link
                      to={"/dashboard"}
                      className={`${
                        this.props.history.location.pathname.match("/dashboard")
                          ? "active"
                          : ""
                      }`}
                    >
                      HOME
                    </Link>
                  </li>
                  {userRole === APP.ROLE.INSTITUTION && (
                    <li className="mr-3 mr-sm-2 mr-md-5 mr-lg-5">
                      <Link
                        to={"/applications"}
                        className={`${
                          this.props.history.location.pathname.match(
                            "/applications"
                          )
                            ? "active"
                            : ""
                        }`}
                      >
                        MY APPLICATIONS
                      </Link>
                    </li>
                  )}
                  {userRole === APP.ROLE.INSTITUTION && (
                    <li className="mr-3 mr-sm-2 mr-md-5 mr-lg-5">
                      <Link
                        to={"/available-forms"}
                        className={`${
                          this.props.history.location.pathname.match(
                            "/available-forms"
                          )
                            ? "active"
                            : ""
                        }`}
                      >
                        AVAILABLE FORMS
                      </Link>
                    </li>
                  )}
                  {(userRole === APP.ROLE.REGULATOR || userRole === APP.ROLE.SUPER_ADMIN) && (
                    <>
                      <li className="mr-3 mr-sm-2 mr-md-5 mr-lg-5">
                        <Link
                          to={"/reviewer/all-applications"}
                          className={`${
                            this.props.history.location.pathname.match(
                              "/all-applications"
                            )
                              ? "active"
                              : ""
                          }`}
                        >
                          ALL APPLICATIONS
                        </Link>
                      </li>
                      <li className="mr-3 mr-sm-2 mr-md-5 mr-lg-5">
                        <Link
                          to={"/manage"}
                          className={`${
                            this.props.history.location.pathname.match(
                              "/manage"
                            ) ||
                            this.props.history.location.pathname.match("/forms")
                              ? "active"
                              : ""
                          }`}
                        >
                          MANAGE
                        </Link>
                      </li>
                    </>
                  )}
                  {userRole === APP.ROLE.INSPECTOR && (
                    <li className="mr-3 mr-sm-2 mr-md-5 mr-lg-5">
                      <Link
                        to={"/all-applications"}
                        className={`${
                          this.props.history.location.pathname.match(
                            "/all-applications"
                          )
                            ? "active"
                            : ""
                        }`}
                      >
                        ALL APPLICATIONS
                      </Link>
                    </li>
                  )}
                  {(userRole === APP.ROLE.REGULATOR || userRole === APP.ROLE.SUPER_ADMIN) && (
                    <li className="">
                      <Link
                        to={"/analytics"}
                        className={`${
                          this.props.history.location.pathname.match(
                            "/analytics"
                          )
                            ? "active"
                            : ""
                        }`}
                      >
                        DASHBOARD
                      </Link>
                    </li>
                  )}
                </ul>
              )}
              {!this.props.history.location.pathname.match("/dashboard") &&
                this.props.breadCrumb &&
                this.props.breadCrumb.length > 0 && (
                  <Breadcrumbs
                    data={this.props.breadCrumb}
                    historyData={this.props.history}
                  />
                )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Header;
