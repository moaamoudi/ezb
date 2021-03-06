import "reactjs-popup/dist/index.css";
import { useAuth } from "../../Context/AuthContext";
import { Form, Button, Card, Alert } from "react-bootstrap";
import React, { useRef, useState, useEffect } from "react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "../styles/DatePicker.scss";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

export default function ProjectSettings() {
  const {
    updateProject,
    selectedProject,
    deleteProject,
    userDetails,
  } = useAuth();
  const ProjectName = useRef();
  const ProjectDescription = useRef();
  const DeleteConfirmation = useRef();
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const history = useHistory();
  const [startDate, setStartDate] = useState(
    format(new Date(selectedProject.startDate), "MMM-dd-yyyy")
  );

  const [endDate, setEndDate] = useState(
    format(new Date(selectedProject.endDate), "MMM-dd-yyyy")
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (startDate === undefined || endDate === undefined) {
      return setError("Please Enter Date!");
    }

    let updatedProject = selectedProject;
    updatedProject.projectName = ProjectName.current.value;
    updatedProject.startDate = startDate;
    updatedProject.endDate = endDate;
    updatedProject.description = ProjectDescription.current.value;

    updateProject(updatedProject);

    setError("");
  }

  function handleDelete() {
    if (DeleteConfirmation.current.value === "") {
      return setError("Please Enter Delete Confirmation!");
    } else if (
      DeleteConfirmation.current.value === selectedProject.projectName
    ) {
      deleteProject(selectedProject);
      history.push("/");
    } else {
      return setError("Please Enter Correct Delete Confirmation!");
    }

    setError("");
  }

  function onDateChange(startDate, endDate) {
    if (startDate && endDate) {
      setStartDate(format(startDate, "MMM-dd-yyyy"));
      setEndDate(format(endDate, "MMM-dd-yyyy"));
    }
  }

  useEffect(() => {
    for (let index = 0; index < selectedProject.assigned.length; index++) {
      if (selectedProject.assigned[index].email === userDetails.email) {
        setCurrentUser(selectedProject.assigned[index]);
      }
    }
  }, [selectedProject.assigned, userDetails.email]);

  return (
    <Card className="main-shadow" style={{ width: "400px" }}>
      <Card.Body>
        <h2 className="text-center mb-4">Add Project</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="ProjectName">
            <Form.Label>Project Name:</Form.Label>
            <Form.Control
              type="Name"
              defaultValue={selectedProject.projectName}
              ref={ProjectName}
              className="form-control button-bg "
            />
          </Form.Group>

          <Form.Group id="ProjectDescription">
            <Form.Label>Project Description:</Form.Label>
            <Form.Control
              type="Name"
              defaultValue={selectedProject.description}
              ref={ProjectDescription}
              className="form-control button-bg"
            />
          </Form.Group>

          <Form.Group id="ProjectDate">
            <label>Start Date & End Date:</label>
            <RangeDatePicker
              className=" react-google-flight-datepicker w-100"
              onChange={(startDate, endDate) =>
                onDateChange(startDate, endDate)
              }
              startDate={new Date(startDate)}
              endDate={new Date(endDate)}
              minDate={new Date(1900, 0, 1)}
              maxDate={new Date(2100, 0, 1)}
              dateFormat="DD MM YYYY"
              monthFormat="MMM YYYY"
              startDatePlaceholder={startDate}
              endDatePlaceholder={endDate}
              disabled={false}
              startWeekDay="sunday"
              highlightToday="true"
            />
          </Form.Group>
          <Form.Group id="DeleteConfirmation">
            <Form.Label>Delete Confirmation:</Form.Label>
            <Form.Control
              type="Name"
              ref={DeleteConfirmation}
              placeholder={"Name of Project: " + selectedProject.projectName}
              className="form-control button-bg"
            />
          </Form.Group>
          <div className="text-center flex">
            <Button
              className="w-40  mt-3"
              type="submit"
              disabled={currentUser.type !== "owner"}
            >
              Update
            </Button>
            <Button
              className="w-40 ml-2 mt-3"
              variant="danger"
              disabled={currentUser.type !== "owner"}
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </div>
          <div className="text-center"></div>
        </Form>
      </Card.Body>
    </Card>
  );
}
