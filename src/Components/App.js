import { React } from "react";
import Signup from "./Signup";
import Login from "./Login";
import CompleteDetails from "./CompleteDetails";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import InnerCompleteDetails from "./InnerCompleteDetails";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import { AuthProvider } from "../Context/AuthContext";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./styles/App.css";
import PublicRoute from "./PublicRoute";


function App() {
  return (
    <div className="main-background">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <InnerCompleteDetails
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
