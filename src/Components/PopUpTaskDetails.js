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
} from "react-bootstrap";
import React, { useEffect, useState } from "react";

import "react-google-flight-datepicker/dist/main.css";
import { format } from "date-fns";
import "./styles/PopUp.css";

export function PopUpTaskDetails(props) {
  const task = props.task;
  let [subTasks] = useState([...task.subTasks]);
  let updated = false;
  let subTasksCopy = [];
  task.subTasks.forEach((temp) => {
    subTasksCopy.push(temp);
  });
  let [taskCopy, setTaskCopy] = useState(task);
  let [subtasklist, setSubtasklist] = useState(task.subTasks);
  let subTaskName = useState();
  const [error, setError] = useState("");
  const [taskCopyFinal, setTaskCopyFinal] = useState(taskCopy);
  const handleSubTaskChange = props.handleSubTaskChange;

  console.log(taskCopyFinal);
  function handleClick(sub) {
    let check = true;
    let items = [];
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
          temp.completionDate = format(new Date(), "MMM-dd-yyyy");
        } else {
          temp.completionDate = null;
        }
        items.push(temp);
      } else {
        items.push(temp);
      }
    });
    taskCopy.subTasks.forEach((item) => {
      if (item.complete) {
      } else {
        check = false;
      }
    });

    taskCopy.complete = check;
    setSubtasklist(items);
    taskCopy.subTasks = subtasklist;
    updated = true;
    setTaskCopyFinal(taskCopy);
  }

  function checkComplete() {
    let check = true;

    taskCopy.subTasks.forEach((item) => {
      if (item.complete) {
      } else {
        check = false;
      }
    });
    taskCopy.complete = check;
    updated = true;
    setTaskCopyFinal(taskCopy);
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
          updated = true;
          setTaskCopyFinal(taskCopy);
          checkComplete();
          subTaskName.value = "";
        } else {
          return setError("Duplicate SubTask Was Entered!");
        }
      } else {
        joined = taskCopy.concat({
          name: subTaskName.value,
          complete: false,
        });

        setSubtasklist(joined);
        taskCopy.subTasks = joined;
        updated = true;
        setTaskCopyFinal(taskCopy);

        subTaskName.value = "";
        checkComplete();
      }
    }

    setError("");
  }

  function handleRemove(sub) {
    const subs = taskCopy.subTasks.filter((temp) => temp.name !== sub.name);
    taskCopy.subTasks = subs;
    taskCopyFinal.subTasks = subs;
    setSubtasklist(subs);
    updated = true;
    setTaskCopyFinal(taskCopy);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSubTaskChange(taskCopyFinal);
  }

  useEffect(() => {
    if (updated) {
      setTaskCopy(taskCopy);
      setTaskCopyFinal(taskCopy);
      updated = false;
    }
  }, []);

  return (
    <Popup
      trigger={<Button>Edit</Button>}
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card
          className="main-shadow"
          style={{ width: "450px", height: "750px" }}
        >
          <Card.Body>
            <Container fluid>
              <h2 className="text-center mb-4">Task Details</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group className="text-center" id="TaskName">
                      <h4>{task.taskName}</h4>
                    </Form.Group>
                  </Col>
                  <Col md={12} className="text-center">
                    <h5>{task.taskDescripiton}</h5>
                  </Col>
                  <Col md={6}>
                    <h6>Start: {task.startDate}</h6>
                  </Col>
                  <Col md={6}>
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
                        className="form-control button-bg"
                        style={{ width: "50%" }}
                      />

                      <Button
                        style={{ width: "50%" }}
                        variant="light ml-2"
                        onClick={(e) => {
                          addItem();
                        }}
                      >
                        Add Subtask
                      </Button>
                    </Form.Group>
                  </Col>
                  <Container style={{ width: "420px", height: "300px" }}>
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
                        {subtasklist.map((sub) => (
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
                                  <img
                                    style={{
                                      borderRadius: "50%",
                                      width: "35px",
                                    }}
                                    src={sub.lastModified.photoURL}
                                    alt="Profile_Picture"
                                  ></img>
                                </div>
                              ) : (
                                <div></div>
                              )}
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
                        ))}
                      </div>
                    </Row>
                  </Container>

                  <Col md={12}>
                    <div className="text-center">
                      <Button
                        variant="light"
                        className="w-50 button-bg mt-3"
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                    <div className="text-center">
                      <Button
                        variant="light"
                        className="w-50 button-bg mt-3"
                        onClick={() => {
                          setSubtasklist(subTasks);
                          setTaskCopy(task);
                          updated = true;
                          setTaskCopyFinal(task);
                          setError("");

                          close();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Card.Body>
        </Card>
      )}
    </Popup>
  );
}