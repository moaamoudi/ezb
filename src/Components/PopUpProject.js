import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";
import React, { useRef } from "react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";

export default function PopupProject() {
  const { insertProjectToFirestore } = useAuth();
  const ProjectName = useRef();

  function addp(ProjectName, StartDate, EndDate, Tasks, Description) {
    insertProjectToFirestore(
      "aaaa1122",
      "12/12/2020",
      "12/12/2021",
      "tasks",
      "testing add"
    );
  }

  function onDateChange(startDate, endDate) {}

  return (
    <>
      <Popup trigger={<button> PopUp</button>} position="center center" modal>
        <Card className="main-shadow">
          <Card.Body>
            <h2 className="text-center mb-4">Add Project</h2>
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            <Form>
              {/* onSubmit={addp} */}
              <RangeDatePicker
                startDate={new Date()}
                endDate={new Date()}
                onChange={(startDate, endDate) =>
                  onDateChange(startDate, endDate)
                }
                minDate={new Date(1900, 0, 1)}
                maxDate={new Date(2100, 0, 1)}
                dateFormat="D MMM YYYY"
                monthFormat="MMM YYYY"
                startDatePlaceholder="Start Date"
                endDatePlaceholder="End Date"
                disabled={false}
                className="my-own-class-name"
                startWeekDay="sunday"
                highlightToday="true"
              />
              <Form.Group id="ProjectName">
                <Form.Label>Project Name:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={ProjectName}
                  required
                  className="form-control button-bg"
                />
              </Form.Group>
              <Form.Group id="ProjectName">
                <Form.Label>Project Name:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={ProjectName}
                  required
                  className="form-control button-bg"
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
      <button onClick={addp}> add</button>
    </>
  );
}
