import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import {
  Form,
  Button,
  Card,
  Alert,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import React, { useRef, useState } from "react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import { format } from "date-fns";
import "./styles/PopUp.css";

export default function PopUptask() {
  let [subtasklist, setSubtasklist] = useState([]);
  const { insertTaskToFirestore, selectedProject } = useAuth();
  let taskName = useRef();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const taskDiscription = useRef();
  let subTaskName = useState();
  const [error, setError] = useState("");

  function handleSubmit() {
    if (startDate === undefined || endDate === undefined) {
      return setError("Please Enter Date!");
    }
    if (
      new Date(startDate).getTime() <
        new Date(selectedProject.startDate).getTime() ||
      new Date(endDate).getTime() > new Date(selectedProject.endDate).getTime()
    ) {
      return setError(
        <p>
          Please Enter Correct Dates!
          <br />
          Note: Dates should be within Project period
        </p>
      );
    }
    insertTaskToFirestore(
      taskName.current.value,
      taskDiscription.current.value,
      startDate,
      endDate,
      subtasklist
    );
    setSubtasklist([]);

    setError("");
  }

  function addItem() {
    //checking the text field is not empty
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
        subTaskName.value = "";
      }
    }
    setError("");
  }

  function onDateChange(startDate, endDate) {
    if (startDate && endDate) {
      setStartDate(format(startDate, "MMM-dd-yyyy"));
      setEndDate(format(endDate, "MMM-dd-yyyy"));
    }
  }

  function handleRemove(task) {
    const newList = subtasklist.filter((Task) => Task.name !== task);
    setSubtasklist(newList);
  }

  return (
    <Popup
      trigger={<Button> Add Task</Button>}
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card className="main-shadow" style={{ width: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Add Task</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="taskName">
                <Form.Label>Task Name:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={taskName}
                  required
                  className="form-control button-bg "
                />
              </Form.Group>

              <Form.Group id="taskDiscription">
                <Form.Label>Task Description:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={taskDiscription}
                  required
                  className="form-control button-bg"
                />
              </Form.Group>

              <Form.Group id="ProjectDate">
                <RangeDatePicker
                  className="datePickerTask"
                  onChange={(startDate, endDate) =>
                    onDateChange(startDate, endDate)
                  }
                  minDate={new Date(1900, 0, 1)}
                  maxDate={new Date(2100, 0, 1)}
                  dateFormat="DD MM YYYY"
                  monthFormat="MMM YYYY"
                  startDatePlaceholder="Start Date"
                  endDatePlaceholder="End Date"
                  disabled={false}
                  startWeekDay="sunday"
                  highlightToday="true"
                />
              </Form.Group>
              <Form.Label style={{ display: "unset" }}>
                SubTask name:
              </Form.Label>
              <Form.Group id="taskDiscription" style={{ display: "flex" }}>
                <Form.Control
                  ref={(a) => (subTaskName = a)}
                  placeholder="enter task"
                  className="form-control button-bg"
                  style={{ width: "50%" }}
                />

                <Button
                  style={{ width: "50%" }}
                  onClick={(e) => {
                    addItem();
                  }}
                >
                  Add SubTask
                </Button>
              </Form.Group>
              <div style={{ height: "150px", overflow: "auto", width: "100%" }}>
                {subtasklist.length > 0 ? (
                  <Container fluid style={{ width: "95%" }}>
                    {subtasklist.map((sub) => (
                      <Row>
                        <Col md={10}>{sub.name}</Col>
                        <Col md={1}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="#F5A494"
                            className="bi bi-trash svgOnClick"
                            viewBox="0 0 16 16"
                            onClick={() => handleRemove(sub.name)}
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
                  </Container>
                ) : (
                  <div />
                )}
              </div>

              <div className="text-center">
                <Button
                  className="w-50  mt-3"
                  onClick={() => {
                    handleSubmit();
                    close();
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="text-center">
                <Button
                  className="w-50  mt-3"
                  onClick={() => {
                    setSubtasklist([]);
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
