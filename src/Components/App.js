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
import ProjectPage from "./ProjectPage";
import ContactsPage from "./ContactsPage";
import ContractsPage from "./ContractsPage";
import Calendar from "./Calendar.js";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

function App() {
  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "30px",
    transition: transitions.SCALE,
  };

  return (
    <div className="main-background">
      <Router>
        <AlertProvider template={AlertTemplate} {...options}>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/calendar" component={Calendar} />
              <PrivateRoute
                path="/:company/projects/:project"
                component={ProjectPage}
              />
              <PrivateRoute path="/profile-details" component={UpdateProfile} />
              <PrivateRoute path="/clients" component={ContactsPage} />
              <PrivateRoute path="/contracts" component={ContractsPage} />
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
        </AlertProvider>
      </Router>
    </div>
  );
}

export default App;
