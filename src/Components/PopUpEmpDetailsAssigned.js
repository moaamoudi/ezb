import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import {
  Button,
  Card,
  Row,
  Col,
  Container,
  ProgressBar,
} from "react-bootstrap";
import React from "react";
import "react-google-flight-datepicker/dist/main.css";
import "./styles/PopUp.css";

export default function PopUpEmpDetailsAssigned(props) {
  const Emp = props.Emp;
  const { selectedProjectTasks } = useAuth();
  let tasks = [];
  let majorTasks = [];
  var taskObj = {};
  var joined = [];
//looping through the slected project tasks
  for (let i = 0; i < selectedProjectTasks.length; i++) {
    //looping through the subtasks of the task
    for (let j = 0; j < selectedProjectTasks[i].subTasks.length; j++) {
      //checking if the subtask is assigned to  a worker
      if (selectedProjectTasks[i].subTasks[j].assigned !== undefined) {
        //checking if the current user is assigned to this subtask
        if (selectedProjectTasks[i].subTasks[j].assigned.email === Emp.email) {
          //checking if the tasks that he is assigned to is so far empty or already got data in it
          if (tasks.length < 1) {
            taskObj = {
              name: selectedProjectTasks[i].subTasks[j].name,
              complete: selectedProjectTasks[i].subTasks[j].complete,
              completeDate: selectedProjectTasks[i].subTasks[j].completionDate,
              majorTask: selectedProjectTasks[i].taskName,
            };
            joined = tasks.concat(taskObj);
            tasks = joined;
          } else {
            //this else is for if wokrer had other tasks that he is assigned to
            //boolean to check with 
            var found = -1;
            taskObj = {
              name: selectedProjectTasks[i].subTasks[j].name,
              complete: selectedProjectTasks[i].subTasks[j].complete,
              completeDate: selectedProjectTasks[i].subTasks[j].completionDate,
              majorTask: selectedProjectTasks[i].taskName,
            };
            //checking if the task is already in the array for duplication correction
            for (let dublicate = 0; dublicate < tasks.length; dublicate++) {
              if (tasks[dublicate].majorTask === taskObj.majorTask) {
                if (tasks[dublicate].name === taskObj.name) {
                  found = 1;
                }
              }
            }
            //if its not already inserted in the array it will insert it
            if (found !== 1) {
              joined = [];
              joined = tasks.concat(taskObj);
              tasks = joined;
            }
          }
        }
      }
    }
  }
  //looping to  have the major tasks and format them 
  for (let i = 0; i < tasks.length; i++) {
    majorTasks.push({ majorTaskName: tasks[i].majorTask, subTasks: [] });
  }
//removing any duplication
  majorTasks = majorTasks.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  );
//looping through major tasks to have them formatted !
  for (let i = 0; i < majorTasks.length; i++) {
    //looping through tasks that the worker is assigned to
    for (let j = 0; j < tasks.length; j++) {
      //checking if the subtask is on this major task and then adds it to subtasks array of the major task!
      if (tasks[j].majorTask === majorTasks[i].majorTaskName) {
        majorTasks[i].subTasks = majorTasks[i].subTasks.concat(tasks[j]);
      }
    }
  }
//function to calculate the preformance of the employee ...worker!
  function calculateProgress(task) {
    let counter = 0;
    for (let i = 0; i < task.subTasks.length; i++) {
      if (task.subTasks[i].complete) {
        counter++;
      }
    }

    return counter;
  }

  return (
    <Popup
      trigger={
        <Button style={{ marginLeft: "-17px", fontSize: "12px" }}>
          Details
        </Button>
      }
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card
          className="main-shadow"
          style={{ width: "500px", height: "700px" }}
        >
          <Card.Body>
            <h2 className="text-center mb-4">Employee Details</h2>
            <div className="text-center">
              <h6>Employee Name: {Emp.name}</h6>
            </div>
            <div className="text-center">
              <h6>Employee Email: {Emp.email}</h6>
            </div>

            <Container className=" text-center" fluid>
              {Emp.type !== "Administrator" ? (
                <div
                  style={{
                    height: "420px",
                    overflow: "auto",
                    marginBottom: "20px",
                  }}
                >
                  <h6 className="text-center">Assigned Tasks:</h6>
                  {majorTasks.length !== 0 ? (
                    majorTasks.map((task) => (
                      <div style={{ width: "95%" }}>
                        <Col md={12}>
                          <h6>{task.majorTaskName}</h6>
                        </Col>
                        {task.subTasks.length > 0 ? (
                          <div>
                            {task.subTasks.map((sub) => (
                              <Row style={{ marginBottom: "-10px" }}>
                                <Col md={6}>
                                  <p>{sub.name}</p>
                                </Col>

                                <Col md={6}>
                                  <p>
                                    {sub.complete === true
                                      ? "Complete"
                                      : "Incomplete"}
                                  </p>
                                </Col>
                              </Row>
                            ))}
                          </div>
                        ) : (
                          <div>No Subtasks</div>
                        )}
                        <h6>Completion Percentage of their assigned tasks</h6>
                        <ProgressBar
                          className="mt-3 mb-3 test22"
                          variant={"YOU_PICK_A_NAME"}
                          now={
                            (calculateProgress(task) / task.subTasks.length) *
                            100
                          }
                          label={
                            (calculateProgress(task) / task.subTasks.length) *
                              100 !==
                            100
                              ? (
                                  (calculateProgress(task) /
                                    task.subTasks.length) *
                                  100
                                ).toFixed(2) + "%"
                              : (calculateProgress(task) /
                                  task.subTasks.length) *
                                  100 +
                                "%"
                          }
                        />
                      </div>
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
