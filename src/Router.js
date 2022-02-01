import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import Auth from "./helpers/auth";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import FormViewer from "./components/form/FormViewer";
import ListForms from "./components/form/ListForms";
import AddForm from "./components/form/AddForm";
import MyApplications from "./components/form/MyApplications";
import MyForms from "./components/form/MyForms";
import { InspectorApplications, ViewApplications } from "./layouts";

/* Router function to enable routing between the various components
 * in the project with authentication as well as authorization
 */

const Router = (props) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/forms" component={ListForms} />
      <PrivateRoute exact path="/forms/add" component={AddForm} />
      <PrivateRoute exact path="/forms/:id/edit" component={AddForm} />
      <PrivateRoute exact path="/forms/:id" component={FormViewer} />
      <PrivateRoute
        exact
        path="/applications/:id/:applicationId"
        component={FormViewer}
      />
      <PrivateRoute exact path="/applications" component={MyApplications} />
      <PrivateRoute exact path="/my-forms" component={MyForms} />
      <PrivateRoute
        exact
        path="/all-applications"
        component={InspectorApplications}
      />
      <PrivateRoute
        exact
        path="/all-applications/:id"
        component={ViewApplications}
      />
      {/* <PrivateRoute exact path="/home" component={Dashboard} /> */}
    </Switch>
  </BrowserRouter>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

export default Router;
