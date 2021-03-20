import React, { useState } from "react";
import TaskPopUp from "../popUptask";
import NotePopUp from "../PopUpNote";
import LineChart from "../LineChart";
import { auth } from "../../firebase.js";
import {
  Card,
  Col,
  Container,
  Row,
  ProgressBar,
  Collapse,
} from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import "../styles/currentWork.css";
import { ListGroupCollapse } from "./ListGroupCollapse.js";

export default function CurrentWork() {
  const selectedProject = JSON.parse(localStorage.getItem("selectedProject"));
  const {
    selectedProjectTasks,
    handleSubTaskChange,
    selectedProjectNotes,
  } = useAuth();

  function calculateProgress() {
    let counter = 0;
    selectedProjectTasks.forEach((temp) => {
      if (temp.complete) {
        counter++;
      }
    });
    return counter;
  }

  function handleClick(sub, task) {
    let items = [];
    let check = true;
    task.subTasks.forEach((temp) => {
      if (sub.name === temp.name) {
        sub.complete = !sub.complete;
        console.log(auth.currentUser);
        sub.lastModified = {
          name: auth.currentUser.displayName,
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          photoURL: auth.currentUser.photoURL,
        };
        items.push(sub);
      } else {
        items.push(temp);
      }
    });
    items.forEach((item) => {
      if (item.complete) {
      } else {
        check = false;
      }
    });

    task.complete = check;
    task.subTasks = items;
    handleSubTaskChange(task);
  }

  function calculateSubProgress(task) {
    let counter = 0;

    for (let index = 0; index < task.subTasks.length; index++) {
      if (task.subTasks[index].complete) {
        counter++;
      }
    }
    return counter;
  }

  return (
    <div>
      <div>
        <LineChart />
      </div>

      <Container style={{ padding: "10px" }}>
        <Row style={{ width: "100%" }}>
          <Col style={{ alignContent: "center" }}>
            <Card
              className="main-shadow"
              style={{
                width: "400px",
                height: "520px",
                marginLeft: "-15px",
                marginTop: "20px",
              }}
            >
              <Card.Body>
                <h4>Tasks</h4>
                <ProgressBar
                  variant={"YOU_PICK_A_NAME"}
                  className="mt-3 mb-3"
                  now={
                    (calculateProgress() / selectedProjectTasks.length) * 100
                  }
                  label={
                    calculateProgress() + "/" + selectedProjectTasks.length
                  }
                ></ProgressBar>
                <div
                  style={{
                    overflow: "auto",
                    maxHeight: "350px",
                    padding: "25 px",
                  }}
                >
                  <div>
                    {selectedProjectTasks.map((task) => (
                      <div
                        style={{
                          width: "100%",

                          marginTop: "15px",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <Col md={10}>
                            <h5>{task.taskName}</h5>
                          </Col>
                          <Col md={2}>
                            {task.complete ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                fill="#F5A494"
                                class="bi bi-check-square-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                fill="#F5A494"
                                class="bi bi-square"
                                viewBox="0 0 16 16"
                              >
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                              </svg>
                            )}
                          </Col>
                        </div>

                        <Col
                          style={{ marginBottom: "-10px", marginTop: "-10px" }}
                        >
                          <ProgressBar
                            className="mt-3 mb-3 test22"
                            variant={"YOU_PICK_A_NAME"}
                            now={
                              (calculateSubProgress(task) /
                                task.subTasks.length) *
                              100
                            }
                            label={
                              calculateSubProgress(task) +
                              "/" +
                              task.subTasks.length
                            }
                          />
                        </Col>
                        <ListGroupCollapse
                          task={task}
                          handleClick={handleClick}
                        ></ListGroupCollapse>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{ position: "absolute", right: "5%", bottom: "5%" }}
                >
                  <TaskPopUp />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Row>
              <Card
                className="main-shadow"
                style={{ width: "400px", height: "100px", marginTop: "20px" }}
              >
                <Card.Body>
                  <h4>Project Description</h4>
                  {selectedProject.description}
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Card
                className="main-shadow"
                style={{
                  width: "400px",
                  height: "400px",
                  marginBottom: "50px",
                  marginTop: "20px",
                }}
              >
                <Card.Body>
                  <h4>Notes</h4>
                  <div>
                    <div
                      style={{
                        overflow: "auto",
                        maxHeight: "270px",
                      }}
                    >
                      {selectedProjectNotes.map((note) => (
                        <Container style={{ marginBottom: "10px" }}>
                          <Row>
                            <Col md={3}>
                              <img
                                style={{
                                  borderRadius: "50%",
                                  width: "35px",
                                  padding: "4px",
                                }}
                                src={note.creator.photoURL}
                                alt="Profile_Picture"
                              ></img>
                            </Col>
                            <Col md={9}>{note.creator.name}</Col>

                            <Col md={12} style={{ textAlign: "center" }}>
                              <hr
                                style={{
                                  marginTop: "-1px",
                                  marginBottom: "-2px",
                                }}
                              ></hr>
                              {note.msg}
                            </Col>
                            <Col md={8}></Col>
                            <Col md={4} style={{ textAlign: "right" }}>
                              <Row>{note.dateOfCreation} </Row>
                            </Col>
                            <Col md={12}>
                              {" "}
                              <hr
                                style={{
                                  marginTop: "-1px",
                                  marginBottom: "-2px",
                                }}
                              ></hr>
                            </Col>
                          </Row>
                        </Container>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{ position: "absolute", right: "5%", bottom: "5%" }}
                  >
                    <NotePopUp />
                  </div>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
