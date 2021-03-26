import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import {
  Form,
  Button,
  Card,
  Dropdown,
  DropdownButton,
  Alert,
} from "react-bootstrap";
import React, { useRef, useState } from "react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import { format } from "date-fns";
import "./styles/PopUp.css";

export default function PopUptask() {
  let [subtasklist, setSubtasklist] = useState([]);
  const { insertTaskToFirestore } = useAuth();
  let taskName = useRef();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const taskDiscription = useRef();
  let subTaskName = useState();
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (startDate === undefined || endDate === undefined) {
      return setError("Please Enter Date!");
    }
    insertTaskToFirestore(
      taskName.current.value,
      taskDiscription.current.value,
      startDate,
      endDate,
      subtasklist
    );

    setError("");
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
              {subtasklist.length > 0 ? (
                <DropdownButton
                  id="dropdown-button-drop-right"
                  drop="right"
                  title="SubTasks"
                >
                  {subtasklist.map((task) => (
                    <div key={task}>
                      <Dropdown.Item>
                        <div style={{ display: "flex" }}>
                          <div style={{ width: "90%" }}>{task.name}</div>

                          <Button
                            onClick={() => handleRemove(task.name)}
                          >
                            X
                          </Button>
                        </div>
                      </Dropdown.Item>
                      <hr style={{ width: "100%", margin: "0" }} />
                    </div>
                  ))}
                </DropdownButton>
              ) : (
                <div />
              )}

              <div className="text-center">
                <Button
                  className="w-50  mt-3"
                  type="submit"
                >
                  submit
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
