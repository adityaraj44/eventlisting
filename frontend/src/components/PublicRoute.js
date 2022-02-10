import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ children, ...routeProps }) => {
  if (localStorage.getItem("token")) {
    return <Redirect exact to="/notes" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
