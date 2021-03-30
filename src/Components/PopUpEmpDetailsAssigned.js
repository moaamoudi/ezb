import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "react-google-flight-datepicker/dist/main.css";
import "./styles/PopUp.css";

export default function PopUpEmpDetailsAssigned(props) {
  const [Emp,setEmp] = useState(props.Emp);
  const { selectedProjectTasks } = useAuth();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    for (let i = 0; i < selectedProjectTasks.length; i++) {
      for (let j = 0; j < selectedProjectTasks[i].subTasks.length; j++) {
        if (selectedProjectTasks[i].subTasks[j].assigned !== undefined) {
          if (
            selectedProjectTasks[i].subTasks[j].assigned.email === Emp.email
          ) {
            if (tasks.length < 1) {
              var taskObj = {
                name: selectedProjectTasks[i].subTasks[j].name,
                complete: selectedProjectTasks[i].subTasks[j].complete,
                completeDate:
                  selectedProjectTasks[i].subTasks[j].completionDate,
                majorTask: selectedProjectTasks[i].taskName,
              };
              var joined=tasks.concat(taskObj)
              setTasks(joined);
            } else {
              var found = -1;
              var taskObj = {
                name: selectedProjectTasks[i].subTasks[j].name,
                complete: selectedProjectTasks[i].subTasks[j].complete,
                completeDate:
                  selectedProjectTasks[i].subTasks[j].completionDate,
                majorTask: selectedProjectTasks[i].taskName,
              };
              for (let dublicate = 0; dublicate < tasks.length; dublicate++) {
                if (
                  tasks[dublicate].majorTask === taskObj.majorTask 
                ) {
                    if(tasks[dublicate].name === taskObj.name){
                         found = 1; 
                    }
                
                }
              }
              if (found !== 1) {
                var joined = tasks.concat(taskObj);
                setTasks(joined);
              }
            }
          }
        }
      }
    }
    
    

    
  }, [tasks,Emp,props.Emp,selectedProjectTasks,props.project]);

  return (
    <Popup
      trigger={<Button style={{ margin: "0" }}>Details</Button>}
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card
          className="main-shadow"
          style={{ width: "500px", height: "600px" }}
        >
          <Card.Body>
            <h2 className="text-center mb-4">Employee Details</h2>
            <div>
              <h4>Employee Name:{Emp.name}</h4>
            </div>
            <div>
              <h4>Employee Email:{Emp.email}</h4>
            </div>
            {Emp.type !== "Administrator" ? (
              <div>
                <h5>Assigned Tasks:</h5>
                {tasks.length !== 0 ? (
                  tasks.map((task) => (
                    <div>
                      {console.log(tasks)}
                      {task.name}
                    </div>
                  ))
                ) : (
                  <div>this employee is not assigned to any task</div>
                )}
              </div>
            ) : (
              <div></div>
            )}

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
