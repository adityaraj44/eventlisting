import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...routeProps }) => {
  if (!localStorage.getItem("token")) {
    return <Redirect exact to="/login" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
