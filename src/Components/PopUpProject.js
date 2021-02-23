import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import { format } from "date-fns";

export default function PopupProject() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { insertProjectToFirestore } = useAuth();
  const ProjectName = useRef();
  const ProjectDescription = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    insertProjectToFirestore(
      ProjectName.current.value,
      startDate,
      endDate,
      ProjectDescription.current.value
    );
  }

  function onDateChange(startDate, endDate) {
    if (startDate && endDate) {
      setStartDate(format(startDate, "MMM-dd-yyyy"));
      setEndDate(format(endDate, "MMM-dd-yyyy"));
    }
  }

  return (
    <>
      <Popup trigger={<button> PopUp</button>} position="center center" modal>
        <Card className="main-shadow">
          <Card.Body>
            <h2 className="text-center mb-4">Add Project</h2>
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="ProjectName">
                <Form.Label>Project Name:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={ProjectName}
                  required
                  className="form-control button-bg"
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
                  className="my-own-class-name"
                  startWeekDay="sunday"
                  highlightToday="true"
                />
              </Form.Group>

              <Button
                //   disabled={loading}
                variant="light"
                type="submit"
                className="w-100 button-bg mt-3"
              >
                Next
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Popup>
    </>
  );
}
