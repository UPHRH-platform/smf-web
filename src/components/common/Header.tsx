import React, { Component, Fragment } from "react";
import Auth from "../../helpers/auth";

/**
 * Header component
 */
 interface headerState {
  user: any
}
class Header extends Component<{}, headerState> {
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
                <li className="mr-5 active">HOME</li>
                <li className="mr-5">MY APPLICATIONS</li>
                <li className="mr-5">APPLICATIONS</li>
              </ul>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Header;
