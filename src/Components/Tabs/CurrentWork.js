import React, { useState } from "react";
import TaskPopUp from "../popUptask";
import NotePopUp from "../PopUpNote";
import LineChart from "../LineChart";
import { auth } from "../../firebase.js";
import { PopUpTaskDetails } from "../PopUpTaskDetails";
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
import { TabList } from "react-tabs";

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
    let subTasksCopy = [];
    task.subTasks.forEach((sub) => {
      subTasksCopy.push(sub);
    });
    let taskCopy = {
      complete: task.complete,
      endDate: task.endDate,
      startDate: task.startDate,
      subTasks: subTasksCopy,
      taskDescripiton: task.taskDescripiton,
      taskName: task.taskName,
    };
    let items = [];
    let check = true;
    console.log(task);

    taskCopy.subTasks.forEach((temp) => {
      if (sub.name === temp.name) {
        temp.complete = !sub.complete;
        console.log(auth.currentUser);
        temp.lastModified = {
          name: auth.currentUser.displayName,
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          photoURL: auth.currentUser.photoURL,
        };
        items.push(temp);
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

    taskCopy.complete = check;
    taskCopy.subTasks = items;
    handleSubTaskChange(taskCopy);
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

                        <div className="text-center mt-3">
                          <PopUpTaskDetails
                            task={task}
                            handleSubTaskChange={handleSubTaskChange}
                          ></PopUpTaskDetails>
                        </div>

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
                              {note.creator.photoURL ? (
                                <img
                                  style={{
                                    borderRadius: "50%",
                                    width: "35px",
                                    padding: "4px",
                                  }}
                                  src={note.creator.photoURL}
                                  alt="Profile_Picture"
                                ></img>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="35"
                                  height="35"
                                  fill="currentColor"
                                  className="bi bi-person-circle"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                  />
                                </svg>
                              )}
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
