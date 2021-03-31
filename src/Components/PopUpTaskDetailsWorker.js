import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import { auth } from "../firebase.js";
import {
  Form,
  Button,
  Card,
  Col,
  Row,
  Container,
  Alert,
  Dropdown,
  Tooltip,
  OverlayTrigger,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";

import "react-google-flight-datepicker/dist/main.css";
import { format } from "date-fns";
import "./styles/PopUp.css";

export default function PopUpTaskDetailsWorker(props) {
  const task = props.task;
  const currentUser = props.currentUser;
  const projectAssigned = props.assignedUsers;
  const [updated, setUpdated] = useState(false);
  let [taskCopy, setTaskCopy] = useState(task);
  let [subtasklist, setSubtasklist] = useState(task.subTasks);
  let subTaskName = useState();
  const { deleteTask, selectedProject, handleSubTaskChangeWorker } = useAuth();
  const [error, setError] = useState("");
  const [taskCopyFinal, setTaskCopyFinal] = useState(taskCopy);

  const [reset, setReset] = useState(false);

  if (task.subTasks.length > 0) {
    subtasklist = [];
    task.subTasks.forEach((sub) => {
      if (sub.assigned !== undefined) {
        if (sub.assigned.email === currentUser.email) {
          subtasklist.push(sub);
        }
      }
    });
  }
  function handleClick(sub) {
    let check = true;
    let items = [];
    if (taskCopy.subTasks.length > 0) {
      taskCopy.subTasks.forEach((temp) => {
        if (sub.name === temp.name) {
          temp.complete = !sub.complete;
          temp.lastModified = {
            name: auth.currentUser.displayName,
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
          };
          if (sub.complete) {
            temp.completionDate = format(new Date(), "MMM-dd-yyyy HH:mm");
            if (
              new Date(temp.completionDate).getTime() >
              new Date(task.endDate).getTime()
            ) {
              temp.late =
                (new Date(temp.completionDate).getTime() -
                  new Date(task.endDate).getTime()) /
                (1000 * 3600 * 24);
            }
          } else {
            temp.completionDate = null;
            delete temp.late;
          }
          items.push(temp);
        } else {
          items.push(temp);
        }
      });
    }
    if (taskCopy.subTasks.length > 0) {
      taskCopy.subTasks.forEach((item) => {
        if (item.complete) {
        } else {
          check = false;
        }
      });
      taskCopy.complete = check;
      setSubtasklist(items);
      taskCopy.subTasks = subtasklist;
      setUpdated(true);
      setTaskCopyFinal(taskCopy);
    }
  }
  function resetForm() {
    setSubtasklist(props.task.subTasks);
    setTaskCopy(props.task);
    setTaskCopyFinal(props.task);
    setReset(false);
  }
  function checkComplete() {
    let check = true;
    if (taskCopy.subTasks.length > 0) {
      taskCopy.subTasks.forEach((item) => {
        if (item.complete) {
        } else {
          check = false;
        }
      });
      taskCopy.complete = check;
      setUpdated(true);
      setTaskCopyFinal(taskCopy);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSubTaskChangeWorker(taskCopyFinal, projectAssigned, currentUser);
  }

  useEffect(() => {
    if (updated) {
      setTaskCopy(taskCopy);
      setTaskCopyFinal(taskCopy);
      setUpdated(false);
    }
  }, [updated, taskCopy, reset]);

  return (
    <Popup
      trigger={
        subtasklist.length > 0 ? (
          <Button>Edit</Button>
        ) : (
          <div style={{ marginBottom: "20px" }}></div>
        )
      }
      position="center center"
      modal
      nested
      contentStyle={{ marginTop: "10%" }}
    >
      {(close) => (
        <Card
          className="main-shadow"
          style={{ width: "500px", height: "650px" }}
        >
          <Card.Body>
            <div
              style={{
                right: "10px",
                top: "10px",
                position: "absolute",
              }}
            ></div>
            <div>
              <h2 className="text-center mb-4">{task.taskName} Details</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12} className="text-center">
                    <h5>{task.taskDescripiton}</h5>
                  </Col>

                  <Col md={6} className="text-center">
                    <h6>Start: {task.startDate}</h6>
                  </Col>
                  <Col md={6} className="text-center">
                    <h6>End: {task.endDate}</h6>
                  </Col>
                  <Container
                    fluid
                    style={{
                      width: "420px",
                      height: "300px",
                      marginBottom: "10px",
                    }}
                  >
                    <div style={{ display: "inline-flex" }}>
                      <Col md={6} style={{ marginLeft: "-30px" }}>
                        Subtask name
                      </Col>
                      <Col md={4}>Complete</Col>
                      <Col md={5}>Last Modified</Col>
                    </div>

                    <Row>
                      <div
                        style={{
                          marginBottom: "10px",
                          height: "300px",
                          overflow: "auto",
                          width: "420px",
                        }}
                      >
                        <hr></hr>
                        {subtasklist.length > 0 ? (
                          subtasklist.map((sub) => (
                            <Container
                              style={{
                                display: "inline-flex",
                                width: "235px",
                                height: "30px",
                                marginBottom: "20px",
                              }}
                            >
                              <Col md={12}>{sub.name}</Col>

                              <Col md={3}>
                                {sub.complete ? (
                                  <div>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="22"
                                      height="22"
                                      fill="#F5A494"
                                      className="bi bi-check-square-fill svgOnClick"
                                      viewBox="0 0 16 16"
                                      onClick={() => handleClick(sub)}
                                    >
                                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
                                    </svg>
                                  </div>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    fill="#F5A494"
                                    className="bi bi-square svgOnClick"
                                    viewBox="0 0 16 16"
                                    onClick={() => handleClick(sub)}
                                  >
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                  </svg>
                                )}
                              </Col>
                              <Col md={3}>
                                {sub.lastModified !== undefined ? (
                                  <div>
                                    {sub.lastModified.photoURL ? (
                                      <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={
                                          <Tooltip id="button-tooltip-2">
                                            Last modified by:{" "}
                                            {sub.lastModified.name}
                                          </Tooltip>
                                        }
                                      >
                                        <img
                                          style={{
                                            borderRadius: "50%",
                                            width: "35px",
                                          }}
                                          src={sub.lastModified.photoURL}
                                          alt="Profile_Picture"
                                        ></img>
                                      </OverlayTrigger>
                                    ) : (
                                      <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={
                                          <Tooltip id="button-tooltip-2">
                                            Last modified by:{" "}
                                            {sub.lastModified.name}
                                          </Tooltip>
                                        }
                                      >
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
                                      </OverlayTrigger>
                                    )}
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                              </Col>
                            </Container>
                          ))
                        ) : (
                          <div className="text-center">
                            there is no subtasks in this task
                          </div>
                        )}
                      </div>
                    </Row>
                  </Container>
                </Row>
                <div className="text-center">
                  <Button className="w-50  mt-3" type="submit">
                    Save
                  </Button>
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    className="w-50  mt-3"
                    onClick={() => {
                      setSubtasklist(props.task.subTasks);
                      setTaskCopy(props.task);
                      setTaskCopyFinal(props.task);
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </Form>

              <div className="text-center">
                <Button
                  className="w-50  mt-3"
                  onClick={() => {
                    close();
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </Popup>
  );
}
