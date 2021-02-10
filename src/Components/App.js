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
import "./App.css";
import Particles from "particles-bg";

function App() {
  let config = {
    num: [1, 20],
    rps: 1,
    radius: [20, 30],
    life: [3, 5],
    v: [0.1, 1],
    tha: [0.1, 100],
    // body: "./img/icon.png", // Whether to render pictures
    rotate: [0, 20],
    alpha: [0.6, 0],
    scale: [1, 0.1],
    position: "all", // all or center or {x:1,y:1,width:100,height:100}
    color: ["random", "#ff0000"],
    cross: "cross", // cross or bround
    random: 10, // or null,
    g: 1, // gravity
     f: [2, -1], // force
    onParticleUpdate: (ctx, particle) => {
      ctx.beginPath();
      ctx.rect(
        particle.p.x,
        particle.p.y,
        particle.radius * 2,
        particle.radius * 2
      );
      ctx.fillStyle = particle.color;
      ctx.fill();
      ctx.closePath();
    },
  };

  return (
    <div className="main-background">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />

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

                <Route path="/signup" component={Signup} />
                <Route path="/ezb" component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </div>
            </Container>
          </Switch>
        </AuthProvider>
      </Router>
      <Particles type="custom" config={config} bg={true} />
      {/* <Particles color="#b9b8b8" num={20} type="lines" bg={true} v="0.1" /> */}
    </div>
  );
}

export default App;
