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
import React, { useState } from "react";
import "react-google-flight-datepicker/dist/main.css";
import "./styles/PopUp.css";

export default function PopUpEmpDetailsAssigned(props) {
  const Emp = useState(props.Emp);
  const { selectedProjectTasks } = useAuth();
  let tasks = [];
  let majorTasks = [];

  for (let i = 0; i < selectedProjectTasks.length; i++) {
    for (let j = 0; j < selectedProjectTasks[i].subTasks.length; j++) {
      if (selectedProjectTasks[i].subTasks[j].assigned !== undefined) {
        if (selectedProjectTasks[i].subTasks[j].assigned.email === Emp.email) {
          if (tasks.length < 1) {
            var taskObj = {
              name: selectedProjectTasks[i].subTasks[j].name,
              complete: selectedProjectTasks[i].subTasks[j].complete,
              completeDate: selectedProjectTasks[i].subTasks[j].completionDate,
              majorTask: selectedProjectTasks[i].taskName,
            };
            var joined = tasks.concat(taskObj);
            tasks = joined;
          } else {
            var found = -1;
            var taskObj = {
              name: selectedProjectTasks[i].subTasks[j].name,
              complete: selectedProjectTasks[i].subTasks[j].complete,
              completeDate: selectedProjectTasks[i].subTasks[j].completionDate,
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
              var joined = [];
              joined = tasks.concat(taskObj);
              tasks = joined;
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < tasks.length; i++) {
    majorTasks.push({ majorTaskName: tasks[i].majorTask, subTasks: [] });
  }

  majorTasks = majorTasks.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  );

  for (let i = 0; i < majorTasks.length; i++) {
    for (let j = 0; j < tasks.length; j++) {
      if (tasks[j].majorTask === majorTasks[i].majorTaskName) {
        console.log("true");
        majorTasks[i].subTasks = majorTasks[i].subTasks.concat(tasks[j]);
      }
    }
  }

  function calculateProgress(task) {
    let counter = 0;
    for (let i = 0; i < task.subTasks.length; i++) {
      if (task.subTasks[i].complete) {
        counter++;
      }
    }

    return counter;
  }

  console.log(majorTasks);

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


