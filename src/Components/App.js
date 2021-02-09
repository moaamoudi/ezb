import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import CompleteDetails from "./CompleteDetails";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../Context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
              <PrivateRoute exact path="/" component={NavBar,Dashboard} />
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <PrivateRoute
                  path="/update-profile"
                  component={UpdateProfile}
                />
                <PrivateRoute
                  path="/complete-details"
                  component={CompleteDetails}
                />
                <Route path="/signup" component={Signup} >
                  
                </Route>
                <Route path="/ezb" component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </div>
            </Container>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
