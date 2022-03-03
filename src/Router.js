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
import {
  InspectorApplications,
  ViewApplications,
  RegulatorAllApplications,
  ReviewApplication,
  InspectionSummary,
  InspectionComplete,
} from "./pages";
// import ReviewerApplications from "./pages/Reviewer/ReviewerApplications";
import { Manage } from "./pages/Reviewer/manage";
import { CreateUser } from "./pages/Reviewer/CreateUser";

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
      <PrivateRoute exact path="/available-forms" component={MyForms} />
      <PrivateRoute
        exact
        path="/all-applications"
        component={InspectorApplications}
      />
      <PrivateRoute
        exact
        path="/inspector/:id/:applicationId"
        component={ViewApplications}
      />
      {/* <PrivateRoute
        exact
        path="/reviewer/all-applications"
        component={ReviewerApplications}
      /> */}
      <PrivateRoute exact path="/manage" component={Manage} />
      <PrivateRoute exact path="/create-user" component={CreateUser} />
      <PrivateRoute exact path="/edit-user/:id" component={CreateUser} />
      <PrivateRoute
        exact
        path="/reviewer/all-applications"
        component={RegulatorAllApplications}
      />
      <PrivateRoute
        exact
        path="/regulator/:id/:applicationId"
        component={ReviewApplication}
      />
      <PrivateRoute
        exact
        path="/inspection-summary/:id/:applicationId"
        component={InspectionSummary}
      />
      <PrivateRoute
        exact
        path="/inspection-complete"
        component={InspectionComplete}
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
