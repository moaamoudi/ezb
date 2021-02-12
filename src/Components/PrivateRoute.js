import React from "react";
import { Nav } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import NavBar from "./NavBar";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <>
            <NavBar></NavBar>
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
