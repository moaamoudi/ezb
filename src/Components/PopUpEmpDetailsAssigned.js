import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "react-google-flight-datepicker/dist/main.css";
import "./styles/PopUp.css";

export default function PopUpEmpDetailsAssigned(props) {
    const data=props.Emp
  const [Emp, setEmp] = useState(props.Emp);
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
              var joined = tasks.concat(taskObj);
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
                if (tasks[dublicate].majorTask === taskObj.majorTask) {
                  if (tasks[dublicate].name === taskObj.name) {
                    found = 1;
                  }
                }
              }
              if (found !== 1) {
                var joined=[]
                 joined = tasks.concat(taskObj);
                setTasks(joined);
              }
            }
          }
        }
      }
    }
    setEmp(data)
  }, [tasks,data,selectedProjectTasks]);

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
              <h6>Employee Name: {Emp.name}</h6>
            </div>
            <div>
              <h6>Employee Email: {Emp.email}</h6>
            </div>
            <h6 className="ml-2">Assigned Tasks:</h6>
            <Container className=" text-center" fluid >
              <Row>
                <Col md={4}>{"Major Task:"}</Col>
                <Col md={4}>{"Sub Task:"}</Col>
                <Col md={4}>{"Completed:"}</Col>
              </Row>
              
             
             
                {Emp.type !== "Administrator" ? (
                  <div>
                    {tasks.length !== 0 ? (
                      tasks.map((task) => (
                        <Row>
                          <Col md={4}>
                            <p>{task.majorTask}</p>
                          </Col>
                          <Col md={4}>
                            <p>{task.name}</p>
                          </Col>
                          <Col md={4}>
                            <p>{task.complete=== true?("Complete"):("Incomplete")}</p>
                          </Col>
                      </Row>
                      ))
                    ) : (
                      <div>this employee is not assigned to any task</div>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              
            
            </Container>
            

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
