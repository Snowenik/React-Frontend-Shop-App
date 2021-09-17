import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({ component: Component, to, ...rest }) => {
  return (
    <Route {...rest}>
      {localStorage.getItem("jwt") ? <Redirect to={to} /> : <Component />}
    </Route>
  );
};

export const PrivateRoute = ({ component: Component, to, ...rest }) => {
  return (
    <Route {...rest}>
      {localStorage.getItem("jwt") ? <Component /> : <Redirect to={to} />}
    </Route>
  );
};
