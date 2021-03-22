import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Form, Button, Card } from "react-bootstrap";
import React, { useRef, useState } from "react";
import emailJS from 'emailjs-com';


import "./styles/PopUp.css";
import { useAuth } from "../Context/AuthContext";

export default function PopUpAddEmployee() {

const {insertEmployeeToFirestore} = useAuth()
const [Employee,setEmployee]=useState("Administrator");
const EmployeeType=useRef()
const EmployeeName=useRef()
const EmployeeEmail=useRef()
const [ProjectsToBeAccessed,setAccessedProjects]=useState([])
const user = JSON.parse(localStorage.getItem("userDetails"));

function handleSubmit(e) {
  e.preventDefault();
  insertEmployeeToFirestore(EmployeeName.current.value,EmployeeEmail.current.value,Employee);
}
      //  console.log(variables)


  return (
    <Popup
      trigger={<Button className="mb-2" style={{marginRight:"60%"}}> Add Employee</Button>}
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
                  ref = {EmployeeEmail}
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
                 onChange={Event=>setEmployee(Event.target.value)}
                required
                >
                
                <option value="Administrator">Administrator</option>
                <option value="Worker">Worker</option>

              </Form.Control>
              
              </Form.Group>

              
              <div className="text-center">
                <Button
                  variant="light"
                  className="w-50 button-bg mt-3"
                  type="submit"
                >
                  Add Employee
                </Button>
              </div>
              <div className="text-center">
                <Button
                  variant="light"
                  className="w-50 button-bg mt-3"
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
