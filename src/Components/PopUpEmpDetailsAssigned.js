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

  useEffect(() => {
    for (let index = 0; index < selectedProjectTasks.length; index++) {
      for (let j = 0; j < selectedProjectTasks[index].subTasks.length; j++) {
        if (selectedProjectTasks[index].subTasks[j].assigned !== undefined) {
          if (
            selectedProjectTasks[index].subTasks[j].assigned.email === Emp.email
          ) {
            if (tasks.length < 1) {
              var taskObj = {
                name: selectedProjectTasks[index].subTasks[j].name,
                complete: selectedProjectTasks[index].subTasks[j].complete,
                completeDate:
                  selectedProjectTasks[index].subTasks[j].completionDate,
                majorTask: selectedProjectTasks[index].taskName,
              };
              setTasks(tasks.concat(taskObj));
            } else {
              var found = -1;
              var taskObj = {
                name: selectedProjectTasks[index].subTasks[j].name,
                complete: selectedProjectTasks[index].subTasks[j].complete,
                completeDate:
                  selectedProjectTasks[index].subTasks[j].completionDate,
                majorTask: selectedProjectTasks[index].taskName,
              };
              for (let dublicate = 0; dublicate < tasks.length; dublicate++) {
                if (
                  tasks[dublicate].majorTask === taskObj.majorTask &&
                  tasks[dublicate].name === taskObj.name
                ) {
                  found = 1;
                }
              }
              if (found === -1) {
                var joined = tasks.concat(taskObj);
                setTasks(joined);
              }
            }
          }
        }
      }
    }
  }, []);

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
