import React, { Component } from "react";
import { UserService } from "../../services/user.service";
import Auth from "../../helpers/auth";
import Notify from "../../helpers/notify";
import { APP } from "../../constants";
import { Link } from "react-router-dom";

/**
 * Login component
 */

class Login extends Component {
  constructor(props:any) {
    super(props);
    if (Auth.isLoggedIn()) {
      // this.props.history.push("home");
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    // Notify.success('This is a test message.');
  }

  handleSubmit(event: any) {
    event.preventDefault();
    UserService.login(
      event.target.email.value,
      event.target.password.value
    ).then(
      response => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          localStorage.setItem("user", JSON.stringify(response.responseData));
          // this.props.history.push("/dashboards");
        } else {
          Notify.error(response.statusInfo.errorMessage);
        }
      },
      error => {
        error.statusInfo
          ? Notify.error(error.statusInfo.errorMessage)
          : Notify.error(error.message);
      }
    );
    return;
  }

  render() {
    return (
      <div className="d-md-flex d-lg-flex d-xl-flex fullHeight">
        <div
          className="col-md-7 d-none d-md-block d-lg-block d-xl-block"
          style={{ background: "white" }}
        >
          <div className="col-12 mt-4 ml-3 pl-2 ml-md-3 ml-lg-4 ml-xl-4 pl-md-2 pl-lg-3 pl-xl-3">
            <img src="img/tarento_text.svg" alt="brand cover" />
          </div>
          <div className="col-12 verticalCenter ml-4 pr-3 ml-md-4 ml-lg-5 ml-xl-5">
            <img src="img/rain_logo_text.svg" alt="accelerator cover" />
            <h1 className="pt-3">Realtime analytics and insights</h1>
            <p>
              Supercharge your business with the power of Data. <br />
              Find out more by exploring our demo
            </p>
            <Link to="/featurePage">
              <button className="btn explore-btn">Explore feature</button>
            </Link>
          </div>
          {/*<img
            className="centerAlign"
            src="img/logoTarento.png"
            alt="brand cover"
            height="158"
            width="400"
          />*/}
        </div>
        <div className="col-md-5 d-md-flex d-lg-flex d-xl-flex loginRightBg fullHeight">
          <div className="d-none d-sm-block d-md-none d-lg-none">
            <div className="col-12 mt-4">
              <img src="img/logowhite.png" alt="brand cover" />
            </div>
          </div>
          <div className="centerAlign verticalCenter" style={{ width: "85%" }}>
            <div className="loginForm text-center">
              <form className="form-signin" onSubmit={this.handleSubmit}>
                <h1 className="h4 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="inputEmail"
                  name="email"
                  className="form-control"
                  placeholder="Email address"
                  autoFocus={true}
                  required
                />
                <label htmlFor="inputPassword" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="inputPassword"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  required
                />
                <button
                  className="btn btn-lg btn-primary btn-block"
                  id="loginBtn"
                  type="submit"
                >
                  Login
                </button>
                {/*<p className="text-center">
                  <Link to="login" className="forgot">
                    Forgot password?
                  </Link>
                </p>*/}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
