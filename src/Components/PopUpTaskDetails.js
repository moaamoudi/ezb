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

export default function PopUpTaskDetails(props) {
  const task = props.task;
  const [updated, setUpdated] = useState(false);
  let [taskCopy, setTaskCopy] = useState(task);
  let [subtasklist, setSubtasklist] = useState(task.subTasks);
  let subTaskName = useState();
  const { deleteTask, selectedProject } = useAuth();
  const [error, setError] = useState("");
  const [taskCopyFinal, setTaskCopyFinal] = useState(taskCopy);
  const handleSubTaskChange = props.handleSubTaskChange;

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
          } else {
            temp.completionDate = null;
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
    setError("");
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

  function addItem() {
    if (subTaskName.value !== "") {
      var joined = [];
      if (subtasklist.length > 0) {
        var found = -1;
        for (let index = 0; index < subtasklist.length; index++) {
          if (subTaskName.value === subtasklist[index].name) {
            found = 1;
          }
        }
        if (found === -1) {
          joined = subtasklist.concat({
            name: subTaskName.value,
            complete: false,
          });
          setSubtasklist(joined);
          taskCopy.subTasks = joined;
          setUpdated(true);
          setTaskCopyFinal(taskCopy);
          checkComplete();
          subTaskName.value = "";
        } else {
          return setError("Duplicate SubTask Was Entered!");
        }
      } else {
        joined = subtasklist.concat({
          name: subTaskName.value,
          complete: false,
        });

        setSubtasklist(joined);
        taskCopy.subTasks = joined;
        setUpdated(true);
        setTaskCopyFinal(taskCopy);

        subTaskName.value = "";
        checkComplete();
      }
    }

    setError("");
  }

  function handleSelectWorker(sub, temp) {
    for (let i = 0; i < taskCopy.subTasks.length; i++) {
      if (taskCopy.subTasks[i].name === sub.name) {
        if (temp === "Remove Assigned") {
          delete taskCopy.subTasks[i].assigned;
        } else {
          taskCopy.subTasks[i].assigned = temp;
        }
      }
    }

    taskCopyFinal.subTasks = taskCopy.subTasks;
    setSubtasklist(taskCopy.subTasks);
    setUpdated(true);
    setTaskCopyFinal(taskCopy);
    setError("");
  }

  function handleDelete(task) {
    deleteTask(task);
  }

  function handleRemove(sub) {
    const subs = taskCopy.subTasks.filter((temp) => temp.name !== sub.name);
    taskCopy.subTasks = subs;
    taskCopyFinal.subTasks = subs;
    setSubtasklist(subs);
    setUpdated(true);
    setTaskCopyFinal(taskCopy);
    setError("");
  }

  function handleSubmit() {
    handleSubTaskChange(taskCopyFinal);
    setError("");
  }

  useEffect(() => {
    if (updated) {
      setTaskCopy(taskCopy);
      setTaskCopyFinal(taskCopy);
      setSubtasklist(taskCopy.subTasks);
      setUpdated(false);
    }
    setTaskCopy(task);
    setTaskCopyFinal(task);
    setSubtasklist(task.subTasks);
  }, [updated, taskCopy, task]);

  return (
    <Popup
      trigger={<Button>Edit</Button>}
      position="center center"
      modal
      nested
      contentStyle={{ marginTop: "10%" }}
    >
      {(close) => (
        <Card
          className="main-shadow"
          style={{ width: "800px", height: "780px" }}
        >
          <Card.Body>
            <div
              style={{
                right: "10px",
                top: "10px",
                position: "absolute",
              }}
            >
              <Dropdown drop="down">
                <Dropdown.Toggle
                  variant="transperant"
                  style={{ fontSize: "0px" }}
                  id="dropdown-basic"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-three-dots-vertical"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div>
                    <Dropdown.Item
                      as="button"
                      onClick={() => {
                        handleDelete(task);
                      }}
                    >
                      <h6>Delete Task</h6>
                    </Dropdown.Item>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div>
              <h2 className="text-center mb-4">{task.taskName} Details</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form>
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

                  <Col md={12} className="mt-3">
                    <Form.Group
                      id="taskDiscription"
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        ref={(a) => (subTaskName = a)}
                        placeholder="Enter Subtask Name"
                        className="form-control "
                        style={{ width: "50%" }}
                      />

                      <Button
                        style={{ width: "40%", marginLeft: "10%" }}
                        onClick={(e) => {
                          addItem();
                        }}
                      >
                        Add Subtask
                      </Button>
                    </Form.Group>
                  </Col>

                  <Container
                    fluid
                    style={{
                      width: "700px",
                      height: "300px",
                      marginBottom: "10px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <Col md={6} style={{ marginLeft: "-30px" }}>
                        Subtask name
                      </Col>
                      <Col md={4}>Complete</Col>
                      <Col md={5}>Last Modified</Col>
                    </div>

                    <div
                      style={{
                        marginBottom: "10px",
                        height: "300px",
                        overflow: "auto",
                        width: "700px",
                      }}
                    >
                      <hr></hr>
                      {subtasklist.length > 0 ? (
                        subtasklist.map((sub) => (
                          <Container
                            style={{
                              display: "inline-flex",
                              width: "380px",
                              height: "30px",
                              marginBottom: "20px",
                            }}
                          >
                            <Col md={6}>{sub.name}</Col>

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
                            <Col md={8} className="">
                              <DropdownButton
                                as={ButtonGroup}
                                key="right"
                                id={`dropdown-button-drop-right`}
                                drop="down"
                                style={{ width: "30%" }}
                                title={
                                  sub.assigned !== undefined
                                    ? sub.assigned.name
                                    : "Select Worker"
                                }
                              >
                                {selectedProject.assigned.length > 0 ? (
                                  <div>
                                    {sub.assigned !== undefined ? (
                                      <Dropdown.Item
                                        onSelect={() => {
                                          handleSelectWorker(
                                            sub,
                                            "Remove Assigned"
                                          );
                                        }}
                                      >
                                        <div style={{ display: "flex" }}>
                                          <div style={{ width: "40%" }}>
                                            {"Remove Assigned"}
                                          </div>
                                        </div>
                                      </Dropdown.Item>
                                    ) : (
                                      <></>
                                    )}
                                    {selectedProject.assigned.map((temp) => (
                                      <>
                                        {temp.type !== "owner" ? (
                                          <Dropdown.Item
                                            onSelect={() => {
                                              handleSelectWorker(sub, temp);
                                            }}
                                          >
                                            <div style={{ display: "flex" }}>
                                              <div style={{ width: "40%" }}>
                                                {temp.name}
                                              </div>
                                            </div>
                                          </Dropdown.Item>
                                        ) : (
                                          <></>
                                        )}
                                      </>
                                    ))}
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                              </DropdownButton>
                            </Col>
                            <Col md={1}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                fill="#F5A494"
                                className="bi bi-trash svgOnClick"
                                viewBox="0 0 16 16"
                                onClick={() => handleRemove(sub)}
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                              </svg>
                            </Col>
                          </Container>
                        ))
                      ) : (
                        <div className="text-center">
                          there is no subtasks in this task
                        </div>
                      )}
                    </div>
                  </Container>

                  <Col md={12} style={{ marginTop: "15px" }}>
                    <div className="text-center">
                      <Button
                        className="w-50  mt-3"
                        onClick={() => {
                          handleSubmit();
                          close();
                        }}
                      >
                        Save
                      </Button>
                    </div>
                    <div className="text-center">
                      <Button
                        className="w-50  mt-3"
                        onClick={() => {
                          setTaskCopy(task);
                          setTaskCopyFinal(task);
                          setSubtasklist(task.subTasks);
                          setUpdated(true);
                        }}
                      >
                        Reset
                      </Button>
                    </div>

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
                  </Col>
                </Row>
              </Form>
            </div>
          </Card.Body>
        </Card>
      )}
    </Popup>
  );
}
