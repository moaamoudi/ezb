
import "reactjs-popup/dist/index.css";
import { useAuth } from "../../Context/AuthContext";
import { Form, Button, Card, Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "../styles/DatePicker.scss";
import { format } from "date-fns";


export default function ProjectSettings() {
  
  const { updateProject ,selectedProject} = useAuth();
  const ProjectName = useRef();
  const ProjectDescription = useRef();
  const DeleteConfirmation = useRef();
  const [error, setError] = useState("");
const [startDate, setStartDate] = useState(format(new Date(selectedProject.startDate), "MMM-dd-yyyy"));
  const [endDate, setEndDate] = useState(format(new Date(selectedProject.endDate), "MMM-dd-yyyy"));
  function handleSubmit(e) {
    e.preventDefault();
    if (startDate === undefined || endDate === undefined) {
      return setError("Please Enter Date!");
    }
    const updatedProject = {
      ProjectName: ProjectName.current.value,
      startDate: startDate,
      endDate: endDate,
      ProjectDescription: ProjectDescription.current.value,
    };
    // updateProject(updatedProject);

    setError("");
  }
  function handleDelete(){
      if(DeleteConfirmation.current.value === ""){
        return setError("Please Enter Delete Confirmation!");
      }else if(DeleteConfirmation.current.value === selectedProject.projectName){

      }else{
        return setError("Please Enter Correct Delete Confirmation!");
      }


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
    <Card className="main-shadow" style={{ width: "400px" }}>
      <Card.Body>
        <h2 className="text-center mb-4">Add Project</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="ProjectName">
            <Form.Label>Project Name:</Form.Label>
            <Form.Control
              type="Name"
              placeholder={selectedProject.projectName}
              ref={ProjectName}
              
              className="form-control button-bg "
            />
          </Form.Group>

          <Form.Group id="ProjectDescription">
            <Form.Label>Project Description:</Form.Label>
            <Form.Control
              type="Name"
              placeholder={selectedProject.description}
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
              placeholder={"Name of Project: "+selectedProject.projectName}
              className="form-control button-bg"
            />
          </Form.Group>
          <div className="text-center flex">
            <Button className="w-40  mt-3" type="submit">
              Update
            </Button>
            <Button className="w-40 ml-2 mt-3" variant="danger" type="submit"
            onClick={()=>handleDelete}
            >
              Delete
            </Button>
          </div>
          <div className="text-center">
            
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
