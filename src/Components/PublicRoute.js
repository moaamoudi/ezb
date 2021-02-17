import React from "react";
import { Container } from "react-bootstrap";
import { Route } from "react-router-dom";
import Particles from "react-tsparticles";
import "./styles/particles.css";

export default function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            <div className="defaultParticles">
              {" "}
              <Particles
                id="tsparticles"
                options={{
                  background: {
                    color: {
                      value: "#ebe8e7",
                    },
                  },
                  fpsLimit: 60,
                  interactivity: {
                    detectsOn: "canvas",

                    events: {
                      onClick: {
                        enable: true,
                        mode: "push",
                      },
                      onHover: {
                        enable: true,
                        mode: "repulse",
                      },
                      resize: true,
                    },
                    modes: {
                      bubble: {
                        distance: 400,
                        duration: 2,
                        opacity: 0.8,
                        size: 40,
                      },
                      push: {
                        quantity: 4,
                      },
                      repulse: {
                        distance: 200,
                        duration: 0.4,
                      },
                    },
                  },
                  particles: {
                    color: {
                      value: "#f7a392",
                    },
                    links: {
                      color: "black",
                      distance: 150,
                      enable: false,
                      opacity: 0.5,
                      width: 1,
                    },
                    collisions: {
                      enable: true,
                    },
                    move: {
                      direction: "none",
                      enable: true,
                      outMode: "bounce",
                      random: false,
                      speed: 6,
                      straight: false,
                    },
                    number: {
                      density: {
                        enable: true,
                        value_area: 800,
                      },
                      value: 80,
                    },
                    opacity: {
                      value: 0.5,
                    },
                    shape: {
                      type: "circle",
                    },
                    size: {
                      random: true,
                      value: 10,
                    },
                  },
                  detectRetina: true,
                }}
              />
            </div>

            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <Component {...props} />
              </div>
            </Container>
          </>
        );
      }}
    ></Route>
  );
}
