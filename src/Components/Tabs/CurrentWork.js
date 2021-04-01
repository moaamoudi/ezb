import React, { useState, useEffect } from "react";
import TaskPopUp from "../popUptask";
import NotePopUp from "../PopUpNote";
import LineChart from "../LineChart";
import PopUpTaskDetails from "../PopUpTaskDetails";
import PopUpEmpDetailsAssigned from "../PopUpEmpDetailsAssigned";
import {
  Card,
  Col,
  Container,
  Row,
  ProgressBar,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import "../styles/currentWork.css";
import PopUpTaskDetailsWorker from "../PopUpTaskDetailsWorker";

export default function CurrentWork() {
  const selectedProject = JSON.parse(localStorage.getItem("selectedProject"));
  const {
    selectedProjectTasks,
    handleSubTaskChange,
    selectedProjectNotes,
    deleteNote,
    userDetails,
  } = useAuth();

  function handleDelete(note) {
    deleteNote(note);
  }

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    for (let index = 0; index < selectedProject.assigned.length; index++) {
      if (selectedProject.assigned[index].email === userDetails.email) {
        setCurrentUser(selectedProject.assigned[index]);
      }
    }
  }, []);

  function calculateProgress() {
    let counter = 0;
    if (selectedProjectTasks.length > 0) {
      selectedProjectTasks.forEach((temp) => {
        if (temp.complete) {
          counter++;
        }
      });
    }
    return counter;
  }

  function calculateSubProgress(task) {
    let counter = 0;
    if (selectedProjectTasks) {
      for (let index = 0; index < task.subTasks.length; index++) {
        if (task.subTasks[index].complete) {
          counter++;
        }
      }
    }
    return counter;
  }

  return (
    <div>
      <div>
        <LineChart />
      </div>

      <Container
        style={{
          padding: "10px",
          display: "inline-flex",
          alignItems: "center",
        }}
        fluid
      >
        <Row style={{ width: "100%", alignContent: "center" }}>
          <Col md={4} style={{ alignContent: "center" }}>
            <Card
              className="main-shadow"
              style={{
                width: "400px",
                height: "520px",
                marginLeft: "15px",
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
                    (calculateProgress() / selectedProjectTasks.length) *
                      100 !==
                    100
                      ? (
                          (calculateProgress() / selectedProjectTasks.length) *
                          100
                        ).toFixed(2) + "%"
                      : (calculateProgress() / selectedProjectTasks.length) *
                          100 +
                        "%"
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
                    {selectedProjectTasks.length > 0 ? (
                      selectedProjectTasks.map((task) => (
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
                            style={{
                              marginBottom: "-10px",
                              marginTop: "-10px",
                            }}
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
                                (calculateSubProgress(task) /
                                  task.subTasks.length) *
                                  100 !==
                                100
                                  ? (
                                      (calculateSubProgress(task) /
                                        task.subTasks.length) *
                                      100
                                    ).toFixed(2) + "%"
                                  : (calculateSubProgress(task) /
                                      task.subTasks.length) *
                                      100 +
                                    "%"
                              }
                            />
                          </Col>

                          <div className="text-center mt-3">
                            {currentUser.type === "owner" ? (
                              <>
                                <PopUpTaskDetails
                                  task={task}
                                  handleSubTaskChange={handleSubTaskChange}
                                ></PopUpTaskDetails>
                              </>
                            ) : (
                              <div>
                                {currentUser.type === "Worker" ? (
                                  <PopUpTaskDetailsWorker
                                    task={task}
                                    handleSubTaskChange={handleSubTaskChange}
                                    currentUser={currentUser}
                                    assignedUsers={selectedProject.assigned}
                                  ></PopUpTaskDetailsWorker>
                                ) : (
                                  <PopUpTaskDetails
                                    task={task}
                                    handleSubTaskChange={handleSubTaskChange}
                                  ></PopUpTaskDetails>
                                )}
                              </div>
                            )}
                          </div>

                          <hr />
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div
                  style={{ position: "absolute", right: "5%", bottom: "5%" }}
                >
                  {currentUser.type !== "Worker" ? <TaskPopUp /> : <div></div>}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Row>
              <Card
                className="main-shadow"
                style={{ width: "400px", height: "100px", marginTop: "20px" }}
              >
                <Card.Body>
                  <h4>Project Description</h4>
                  {selectedProject.description ? (
                    selectedProject.description
                  ) : (
                    <></>
                  )}
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
                      {selectedProjectNotes.length > 0 ? (
                        selectedProjectNotes.map((note) => (
                          <Container style={{ marginBottom: "10px" }}>
                            <Row>
                              <Col md={12}>
                                <div
                                  style={{
                                    textAlign: "right",
                                    top: "0",
                                    marginTop: "5px",
                                  }}
                                >
                                  {" "}
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
                                            handleDelete(note);
                                          }}
                                        >
                                          <h6 style={{ fontSize: "14px" }}>
                                            Delete Note
                                          </h6>
                                        </Dropdown.Item>
                                      </div>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              </Col>
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
                        ))
                      ) : (
                        <div className="text-center"> There are no Notes! </div>
                      )}
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
          <Col md={4} style={{ alignContent: "center" }}>
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
                <h4>Assigned Workers</h4>
                <div
                  style={{
                    overflow: "auto",
                    maxHeight: "350px",
                    padding: "25 px",
                  }}
                >
                  <div>
                    {selectedProject.assigned.length > 0 ? (
                      selectedProject.assigned.map((worker) => (
                        <div
                          style={{
                            width: "79%",

                            marginTop: "15px",
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <Col md={2}>
                              <div>
                                {" "}
                                {worker.photoURL ? (
                                  <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={
                                      <Tooltip id="button-tooltip-2">
                                        {worker.name}
                                      </Tooltip>
                                    }
                                  >
                                    <img
                                      style={{
                                        borderRadius: "50%",
                                        width: "35px",
                                      }}
                                      src={worker.photoURL}
                                      alt="Profile_Picture"
                                    ></img>
                                  </OverlayTrigger>
                                ) : (
                                  <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={
                                      <Tooltip id="button-tooltip-2">
                                        {worker.name}
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
                            </Col>
                            <Col md={5}>
                              {" "}
                              <h6 style={{ fontSize: "14px" }}>
                                {worker.name}
                              </h6>
                            </Col>
                            <Col md={5}>
                              <h6 style={{ fontSize: "14px" }}>
                                {worker.type}
                              </h6>
                            </Col>

                            {currentUser.type === "Worker" ? (
                              <></>
                            ) : (
                              <Col>
                                {worker.type === "owner" ||
                                currentUser.type === "Worker" ||
                                currentUser.type === "owner" ? (
                                  <></>
                                ) : (
                                  <PopUpEmpDetailsAssigned Emp={worker} />
                                )}
                              </Col>
                            )}
                          </div>

                          <Col
                            style={{
                              marginBottom: "-10px",
                              marginTop: "-10px",
                            }}
                          ></Col>

                          <hr />
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
