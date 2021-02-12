import { React, useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import CompleteDetails from "./CompleteDetails";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import { AuthProvider, useAuth } from "../Context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Particles from "particles-bg";
import { auth } from "../firebase";
import { render } from "@testing-library/react";
import { Component } from "react";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <div className="main-background">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute
              path="/complete-details"
              component={CompleteDetails}
            />

            <PublicRoute path="/signup" component={Signup} />
            <PublicRoute path="/ezb" component={Login} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
     </div>
  );
}

export default App;
