import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          < div className="inline-block">
            <NavBar></NavBar>
            <SideBar className="inline-block"/>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
