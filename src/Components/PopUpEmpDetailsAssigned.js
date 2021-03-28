import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "react-google-flight-datepicker/dist/main.css";
import "./styles/PopUp.css";

export default function PopUpEmpDetailsAssigned(props) {
  const [Emp] = useState(props.Emp);
  const { selectedProjectTasks } = useAuth();
  const [tasks, setTasks] = useState([]);
  //   this will be implemented when the assigned is adjusted! dont remove!!!!
  // useEffect(() => {
  //    for (let index = 0; index < selectedProjectTasks.length; index++) {
  //       for (let j = 0; j < selectedProjectTasks.assigned.length; j++) {
  //           if(selectedProjectTasks.assigned[j].email===Emp.email){
  //               if(tasks.length<1){
  //                 setTasks({name:selectedProjectTasks.assigned[j].subTaskName,complete:selectedProjectTasks.assigned[j].complete})
  //               }
  //           }

  //       }}
  // }, [])

  return (
    <Popup
      trigger={<Button style={{margin:'0'}}>Details</Button>}
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card className="main-shadow" style={{ width: "400px" }}>
          <Card.Body>
             
            <h2 className="text-center mb-4">Employee Details</h2>
             <div><h4>
              Employee Name:{Emp.name}
            </h4></div>
            <div><h4>Employee Email:{Emp.email}</h4></div>
            <div><h5>Assigned Tasks:</h5></div>
            
            {/* {mapping of tasks} */}
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
          </Card.Body>
        </Card>
      )}
    </Popup>
  );
}
