import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  Form,
  Button,
  Card,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import React, { useRef, useState } from "react";

import "./styles/PopUp.css";
import { useAuth } from "../Context/AuthContext";

export default function PopUpAddEmployee() {
  const { insertEmployeeToFirestore, projects } = useAuth();
  const [selected, setSelected] = useState(projects[0]);
  const [Employee, setEmployee] = useState("Administrator");
  const EmployeeName = useRef();
  const EmployeeEmail = useRef();
  let [projectlist, setProjectlist] = useState([]);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    insertEmployeeToFirestore(
      EmployeeName.current.value,
      EmployeeEmail.current.value,
      Employee,
      projectlist
    );
  }

  function handleSelect(project) {
    setSelected(project);
  }

  function addItem() {
    if (selected !== null) {
      var joined = [];
      if (projectlist.length > 0) {
        var found = -1;
        for (let index = 0; index < projectlist.length; index++) {
          if (selected.projectName === projectlist[index].projectName) {
            found = 1;
          }
        }
        if (found === -1) {
          joined = projectlist.concat(selected);
          setProjectlist(joined);
        } else {
          return setError("Duplicate SubTask Was Entered!");
        }
      } else {
        joined = projectlist.concat(selected);

        setProjectlist(joined);
      }
    }
    setError("");
  }

  function handleRemove(temp) {
    const newList = projectlist.filter(
      (temp2) => temp2.projectName !== temp.projectName
    );
    setProjectlist(newList);
  }

  return (
    <Popup
      trigger={<Button> Add Employee</Button>}
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card className="main-shadow" style={{ width: "500px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Add Employee to company</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="EmployeeName">
                <Form.Label>Employee Name:</Form.Label>

                <Form.Control
                  type="Name"
                  ref={EmployeeName}
                  required
                  className="form-control button-bg"
                />
              </Form.Group>
              <Form.Group id="ProjectName">
                <Form.Label>Employee Email: </Form.Label>

                <Form.Control
                  type="Name"
                  ref={EmployeeEmail}
                  required
                  className="form-control button-bg "
                />
              </Form.Group>

              <Form.Group id="Employeetype">
                <Form.Label>Employee type:</Form.Label>
                <Form.Control
                  as="select"
                  className="mr-sm-2"
                  id="inlineFormCustomSelect"
                  custom
                  onChange={(Event) => setEmployee(Event.target.value)}
                  required
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Worker">Worker</option>
                </Form.Control>
              </Form.Group>
              <Form.Label>Assign Employee to Project:</Form.Label>
              <Form.Group
                id="taskDiscription"
                style={{ display: "inline-flex", width: "100%" }}
              >
                <DropdownButton
                  as={ButtonGroup}
                  key="right"
                  id={`dropdown-button-drop-right`}
                  drop="right"
                  style={{ width: "50%", margin: "20px" }}
                  title={selected.projectName}
                >
                  {projects.length > 0 ? (
                    <div>
                      {projects.map((temp) => (
                        <Dropdown.Item
                          onSelect={() => {
                            handleSelect(temp);
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <div style={{ width: "90%" }}>
                              {temp.projectName}
                            </div>
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
                  Assign Project
                </Button>
              </Form.Group>
              {projectlist.length > 0 ? (
                <div>
                  {projectlist.map((temp) => (
                    <Container className="mb-3">
                      <Row>
                        <Col md={6} className="text-center">
                          {temp.projectName}
                        </Col>
                        <Col md={6} className="text-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="#F5A494"
                            className="bi bi-trash svgOnClick"
                            onClick={() => {
                              handleRemove(temp);
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
                    </Container>
                  ))}
                </div>
              ) : (
                <div />
              )}

              <div className="text-center">
                <Button className="w-50 mt-3" type="submit">
                  Add Employee
                </Button>
              </div>
              <div className="text-center">
                <Button
                  className="w-50 mt-3"
                  onClick={() => {
                    close();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Popup>
  );
}
