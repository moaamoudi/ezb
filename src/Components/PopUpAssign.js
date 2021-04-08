import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import {
  Form,
  Button,
  Card,
  Col,
  Row,
  Container,
  Alert,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "react-google-flight-datepicker/dist/main.css";
import "./styles/PopUp.css";

export default function PopUpAssign(props) {
  const [error, setError] = useState("");
  const [selected, setSelected] = useState();
  const {
    selectCompany,
    selectedProject,
    updateProject,
    createNotification,
  } = useAuth();
  let [userList] = useState([]);
  let found = false;
  let [users, setUsers] = useState([]);

  useEffect(() => {
    for (let i = 0; i < selectCompany.users.length; i++) {
      console.log(selectCompany.users.length);
      for (let j = 0; j < selectedProject.assigned.length; j++) {
        if (
          selectCompany.users[i].email === selectedProject.assigned[j].email
        ) {
          found = true;
          break;
        } else {
        }
      }
      if (!found) {
        userList.push(selectCompany.users[i]);
      }
      found = false;
    }
  }, []);

  function updateUserType(user, type) {
    let temp = [];
    for (let i = 0; i < users.length; i++) {
      temp.push(users[i]);
    }
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].email === user.email) {
        temp[i].type = type;
      }
    }
    setUsers(temp);
    setError("");
  }

  function addItem() {
    if (selected !== null) {
      var joined = [];
      if (users.length > 0) {
        var found = -1;
        for (let index = 0; index < users.length; index++) {
          if (selected.email === users[index].email) {
            found = 1;
          }
        }
        if (found === -1) {
          joined = users.concat(selected);
          setUsers(joined);
        } else {
          return setError("Duplicate Employee Was Entered!");
        }
      } else {
        joined = users.concat(selected);

        setUsers(joined);
      }
    }
    setError("");
  }

  function handleRemove(temp) {
    const newList = users.filter((temp2) => temp2.email !== temp.email);

    setUsers(newList);
  }

  function handleSelect(user) {
    setSelected(user);
    setError("");
  }

  function handleSubmit() {
    let temp = {
      companyName: selectedProject.companyName,
      description: selectedProject.description,
      email: selectedProject.email,
      endDate: selectedProject.endDate,
      startDate: selectedProject.startDate,
      id: selectedProject.id,
      projectName: selectedProject.projectName,
      uid: selectedProject.uid,
      assigned: selectedProject.assigned,
    };

    for (let i = 0; i < users.length; i++) {
      temp.assigned.push(users[i]);
    }

    updateProject(temp);

    for (let i = 0; i < users.length; i++) {
      createNotification(
        users[i].email,
        "You Have Been Added To Project " +
          selectedProject.projectName +
          " As a " +
          users[i].type +
          " In Company " +
          selectCompany.companyName +
          "."
      );
    }

    setError("");
  }

  return (
    <Popup
      trigger={<Button>Add Worker</Button>}
      position="center center"
      modal
      nested
      contentStyle={{ marginTop: "10%" }}
    >
      {(close) => (
        <Card
          className="main-shadow"
          style={{ width: "500px", height: "600px" }}
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
              <h2 className="text-center mb-4">{} Add Worker</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form>
                <Form.Group style={{ display: "inline-flex", width: "100%" }}>
                  <DropdownButton
                    as={ButtonGroup}
                    key="right"
                    id={`dropdown-button-drop-right`}
                    drop="right"
                    style={{ width: "50%", margin: "20px" }}
                    title={
                      selected !== undefined
                        ? selected.name
                        : "Select an Employee"
                    }
                  >
                    {userList.length > 0 ? (
                      <div>
                        {userList.map((temp) => (
                          <Dropdown.Item
                            onSelect={() => {
                              handleSelect(temp);
                            }}
                          >
                            <div style={{ display: "flex" }}>
                              <div style={{ width: "90%" }}>{temp.name}</div>
                            </div>
                          </Dropdown.Item>
                        ))}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </DropdownButton>

                  <Button
                    style={{ width: "50%", margin: "20px" }}
                    onClick={(e) => {
                      addItem();
                    }}
                  >
                    Assign Worker
                  </Button>
                </Form.Group>
                <Row>
                  <Col>
                    <Container
                      fluid
                      style={{
                        height: "200px",
                        overflow: "auto",
                        textAlign: "center",
                      }}
                    >
                      {users.length > 0 ? (
                        <div>
                          {users.map((user) => (
                            <Row style={{ margin: "10px 0 10px 0" }}>
                              <Col>{user.name}</Col>
                              <Col>
                                <DropdownButton
                                  as={ButtonGroup}
                                  key="right"
                                  id={`dropdown-button-drop-right`}
                                  drop="right"
                                  title={
                                    user.type !== undefined
                                      ? user.type
                                      : "Select Role"
                                  }
                                >
                                  {props.currentUser.type === "owner" ? (
                                    <div>
                                      <Dropdown.Item
                                        onSelect={() => {
                                          user.type = "Administrator";
                                          updateUserType(user, "Administrator");
                                        }}
                                      >
                                        <div style={{ display: "flex" }}>
                                          <div style={{ width: "90%" }}>
                                            {"Administrator"}
                                          </div>
                                        </div>
                                      </Dropdown.Item>
                                      <Dropdown.Item
                                        onSelect={() => {
                                          user.type = "Worker";
                                          updateUserType(user, "Worker");
                                        }}
                                      >
                                        <div style={{ display: "flex" }}>
                                          <div style={{ width: "90%" }}>
                                            {"Worker"}
                                          </div>
                                        </div>
                                      </Dropdown.Item>
                                    </div>
                                  ) : (
                                    <div>
                                      <Dropdown.Item
                                        onSelect={() => {
                                          user.type = "Worker";
                                          updateUserType(user, "Worker");
                                        }}
                                      >
                                        <div style={{ display: "flex" }}>
                                          <div style={{ width: "90%" }}>
                                            {"Worker"}
                                          </div>
                                        </div>
                                      </Dropdown.Item>
                                    </div>
                                  )}
                                </DropdownButton>
                              </Col>
                              <Col>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  fill="#F5A494"
                                  className="bi bi-trash svgOnClick"
                                  onClick={() => {
                                    handleRemove(user);
                                  }}
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                  <path
                                    fill-rule="evenodd"
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                  />
                                </svg>
                              </Col>
                            </Row>
                          ))}
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </Container>
                  </Col>
                  <Col md={12} style={{ marginTop: "15px" }}>
                    <div className="text-center">
                      <Button
                        className="w-50  mt-3"
                        onClick={() => {
                          if (users.length === 0) {
                            setError("Please Select An Employee To Assign");
                          } else {
                            let found = false;
                            for (let i = 0; i < users.length; i++) {
                              if (users[i].type === undefined) {
                                found = true;
                              }
                            }

                            if (found) {
                              setError("Please Assign a Role to All Employees");
                            } else {
                              handleSubmit();
                              close();
                            }
                          }
                        }}
                      >
                        Add
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
