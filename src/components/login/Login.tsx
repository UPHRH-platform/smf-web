import React, { Component } from "react";
import { UserService } from "../../services/user.service";
import Auth from "../../helpers/auth";
import Notify from "../../helpers/notify";
import { APP } from "../../constants";
import { Link } from "react-router-dom";

/**
 * Login component
 */
interface LoginState {
  email: string
  enterOTPEnabled: boolean
}

interface LoginProps {
  history: any
}

interface LoginState {
}
class Login extends Component<LoginProps, LoginState> {
  formLayout: any
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      enterOTPEnabled: false,
    };
    if (Auth.isLoggedIn()) {
      this.props.history.push("dashboard");
    }
    // for email/password login
    this.handleSubmit = this.handleSubmit.bind(this);

    // for email/OTP login
    this.getOTP = this.getOTP.bind(this);
    this.loginWithOTP = this.loginWithOTP.bind(this)
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
          this.props.history.push("/dashboard");
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

  getOTP(event: any) {
    event.preventDefault();
    const email = event.target.email.value
    UserService.getOTP(
      event.target.email.value,
    ).then(
      response => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          localStorage.setItem("user", JSON.stringify(response.responseData));
          // this.props.history.push("/dashboards");
        } else {
          Notify.error(response.statusInfo.errorMessage);
        }
        this.setState({
          enterOTPEnabled: true,
          email
        })
        console.log('this.enterOTPEnabled', this.state.enterOTPEnabled)
      },
      error => {
        error.statusInfo
          ? Notify.error(error.statusInfo.errorMessage)
          : Notify.error(error.message);
        this.setState({
          enterOTPEnabled: true,
          email
        })
        console.log('this.enterOTPEnabled', this.state.enterOTPEnabled)
      },
    );
    return;

  }

  loginWithOTP(event: any) {
    event.preventDefault();
    UserService.login(
      this.state.email,
      event.target.otp.value
    ).then(
      response => {
        if (response.statusInfo.statusCode === APP.CODE.SUCCESS) {
          localStorage.setItem("user", JSON.stringify(response.responseData));
          this.props.history.push("/dashboard");
        } else {
          Notify.error(response.statusInfo.errorMessage);
        }
      },
      error => {
        error.statusInfo
          ? Notify.error(error.statusInfo.errorMessage)
          : Notify.error(error.message);
      },
    );
    return;
  }

  render() {
    return (
      <>
        <div className="d-md-flex d-lg-flex d-xl-flex fullHeight login-root text-center">
          {/* <div className="col-md-3 d-none d-md-block d-lg-block d-xl-block">
          </div> */}
          <div className="col-xs-12 col-md-7 col-lg-6 col-xl-5  centerAlign verticalCenter " style={{ maxWidth: '100vw' }}>
            <img src="img/Logo - Login.svg" className="mb-5 login-logo" alt="SMF-logo" />
            <div className="row mt-5 d-none d-md-block d-lg-block d-xl-block">

            </div>
            <div className="row">
              <div className="col-12  login-container">
                <h4 className="mb-4">Login</h4>
                {!this.state.enterOTPEnabled &&
                  <form className="form-signin" onSubmit={this.getOTP}>
                    <label className="form-label" htmlFor="inputEmail" >
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
                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      id="loginBtn"
                      type="submit"
                    >
                      Get otp
                    </button>
                  </form>
                }
                {this.state.enterOTPEnabled &&
                  <form className="form-signin" onSubmit={this.loginWithOTP}>
                    <label className="form-label" htmlFor="inputEmail" >
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      id="inputOTP"
                      name="otp"
                      className="form-control"
                      placeholder="Enter OTP"
                      autoFocus={true}
                      required
                    />
                    <small id="otpHelp" className="form-text text-muted">
                      Enter the 6 digit OTP sent to your email address.
                    </small>
                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      id="loginBtn"
                      type="submit"
                    >
                      SIGN IN
                    </button>
                  </form>
                }
                {/* <form className="form-signin" onSubmit={this.handleSubmit}>
                  <label className="form-label" htmlFor="inputEmail" >
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
                  <label className="form-label" htmlFor="inputPassword" >
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
                </form> */}
              </div>
            </div>
          </div>
          {/* <div className="col-md-3 d-none d-md-block d-lg-block d-xl-block">
          </div> */}
        </div>
      </>
    );
  }
}

export default Login;
