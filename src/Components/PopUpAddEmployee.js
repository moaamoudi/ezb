import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Form, Button, Card } from "react-bootstrap";
import React, { useRef, useState } from "react";
import emailJS from 'emailjs-com';


import "./styles/PopUp.css";

export default function PopUpAddEmployee() {
const [Employee,setEmployee]=useState();
const type=useRef("")
const EmployeeName=useRef("")
const EmployeeEmail=useRef("")
const [ProjectsToBeAccessed,setAccessedProjects]=useState([])
const user = JSON.parse(localStorage.getItem("userDetails"));
function handleSubmit(e) {
  e.preventDefault();
  var msg=""
  var Name=user.firstName+" "+user.lastName
  var Subject="guranteeing access"
  var reciever=""
   let variables= {msg: msg, Name: Name,
        Subject: Subject,reciever:EmployeeEmail.current.value,
       
       }
      //  console.log(variables)
   emailJS.send('Gmail', 'Development_email', variables,"user_Ufgqez1YDtVtHo6gPiYox")
   .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
   }, function(error) {
      console.log('FAILED...', error);
   });
   e.target.reset()
}
  return (
    <Popup
      trigger={<Button className="mb-2" style={{marginRight:"60%"}}> Give Access</Button>}
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card className="main-shadow" style={{ width: "500px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Give Access to Employee</h2>
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
 <Form.Group id="Employeetype">
                <Form.Label>Employee type:</Form.Label>
                
                <Form.Control
                
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                custom
                // onChange={Event=>setCurrency(Event.target.value)}
                required
                >
                
                <option value="Administrator">Administrator</option>
                <option value="Worker">Worker</option>

              </Form.Control>
              
              </Form.Group>
              <Form.Group id="ProjectName">
                <Form.Label>Project to be accessed:</Form.Label>
                
                <Form.Control
                  type="Name"

                  required
                  className="form-control button-bg "
                />
              
              </Form.Group>
              
              <div className="text-center">
                <Button
                  variant="light"
                  className="w-50 button-bg mt-3"
                  type="submit"
                >
                  Give Access
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
