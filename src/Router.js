import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import Auth from "./helpers/auth";

import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import FormViewer from "./pages/FormViewer/FormViewer";

/* Router function to enable routing between the various components
 * in the project with authentication as well as authorization
 */


const Router = (props) => (
  <BrowserRouter>
    <Switch>
    <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/form-viewer" component={FormViewer} />
      {/* <PrivateRoute exact path="/home" component={Dashboard} /> */}
    </Switch>
  </BrowserRouter>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

export default Router;
