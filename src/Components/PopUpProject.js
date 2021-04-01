import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import { Form, Button, Card, Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import { format } from "date-fns";
import "./styles/PopUp.css";

export default function PopupProject() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { insertProjectToFirestore } = useAuth();
  const ProjectName = useRef();
  const ProjectDescription = useRef();
  const [error, setError] = useState("");

  function handleSubmit() {
    if (startDate === undefined || endDate === undefined) {
      return setError("Please Enter Date!");
    }

    insertProjectToFirestore(
      ProjectName.current.value,
      startDate,
      endDate,
      ProjectDescription.current.value
    );

    setError("");
  }

  function onDateChange(startDate, endDate) {
    if (startDate && endDate) {
      console.log(startDate);
      setStartDate(format(startDate, "MMM-dd-yyyy"));
      setEndDate(format(endDate, "MMM-dd-yyyy"));
    }
  }

  return (
    <Popup
      trigger={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          style={{ borderRadius: "50%", backgroundColor: "#f0e9e9" }}
          height="100"
          fill="#F5A494"
          className="bi bi-plus svgOnClick"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      }
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card className="main-shadow" style={{ width: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Add Project</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              <Form.Group id="ProjectName">
                <Form.Label>Project Name:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={ProjectName}
                  required
                  className="form-control button-bg "
                />
              </Form.Group>

              <Form.Group id="ProjectDescription">
                <Form.Label>Project Description:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={ProjectDescription}
                  required
                  className="form-control button-bg"
                />
              </Form.Group>

              <Form.Group id="ProjectDate">
                <RangeDatePicker
                  className="datePicker my-own-class-name w-100"
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

              <div className="text-center">
                <Button
                  onClick={() => {
                    handleSubmit();
                    close();
                  }}
                  className="w-50  mt-3"
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
