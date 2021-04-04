import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import PopUp from "./PopUpProject";
import { Card, ProgressBar } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import { exportComponentAsPNG } from "react-component-export-image";
import { Chart } from "react-google-charts";
export default function Dashboard() {
  const {
    projects,
    setSelectedProject1,
    selectCompany,
    allCompanyTasks,
    userDetails,
  } = useAuth();
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState("");
  const componentRef = useRef();
  const defaultSettings = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  let formattedData = [];
  formattedData.push(defaultSettings);

  if (projects !== undefined)
    for (let index = 0; index < projects.length; index++) {
      let projectData = [
        "" + projects[index].projectName,
        "" + projects[index].projectName,
        new Date(projects[index].startDate),
        new Date(projects[index].endDate),
        null,
        "" + calculateProgress(projects[index]),
        null,
      ];
      formattedData.push(projectData);
    }

  useEffect(() => {
    for (let index = 0; index < selectCompany.users.length; index++) {
      if (selectCompany.users[index].email === userDetails.email) {
        setCurrentUser(selectCompany.users[index]);
      }
    }
  }, [selectCompany, currentUser, allCompanyTasks, userDetails.email]);

  function isAssigned(project) {
    let assigned = false;
    for (let i = 0; i < project.assigned.length; i++) {
      if (project.assigned[i].email === currentUser.email) {
        assigned = true;
      }
    }
    return assigned;
  }

  function viewDetails(project) {
    setSelectedProject1(project);
    history.push(
      selectCompany.companyName + "/projects/" + project.projectName
    );
  }

  function calculateDateLeft(prStartDate, prEndDate) {
    // var startDate = new Date(prStartDate);
    var endDate = new Date(prEndDate);
    var currentDate = new Date();

    return parseInt(
      (endDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
    );
  }

  function calculateProgress(project) {
    let completeCounter = 0;
    let taskCounter = 0;
    for (let i = 0; i < allCompanyTasks.length; i++) {
      if (allCompanyTasks[i].belongsTo.projectName === project.projectName) {
        taskCounter++;
        if (allCompanyTasks[i].complete) {
          completeCounter++;
        }
      }
    }

    return taskCounter > 0 ? (completeCounter / taskCounter) * 100 : 0;
  }

  function getDayPercentage(project) {
    var startDate = new Date(project.startDate);
    var endDate = new Date(project.endDate);
    var currentDate = new Date();

    let daysLeft = parseInt(
      (currentDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    );
    let totalDays = parseInt(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    );

    return (daysLeft / totalDays) * 100;
  }

  return (
    <div style={{ width: "100%", textAlign: "center", padding: "50px" }}>
      {projects.length > 0 ? (
        <>
          {currentUser.type !== undefined ? (
            <>
              {currentUser.type === "owner" ? (
                <Carousel itemsToShow={4}>
                  <Card
                    className="main-shadow  m-3 text-center"
                    style={{ width: "250px", height: "300px" }}
                  >
                    <Card.Body>
                      <h2>Add Project</h2>
                      <div style={{ marginTop: "25%" }}>
                        <PopUp>Details</PopUp>
                      </div>
                    </Card.Body>
                  </Card>
                  {projects.map((project) => (
                    <Card
                      key={project.projectName}
                      className="main-shadow  m-3 text-center"
                      style={{ width: "250px", height: "300px" }}
                    >
                      <Card.Body>
                        <h1>{project.projectName}</h1>
                        <h6 style={{ marginBottom: "-10px" }}>
                          Completion Progress
                        </h6>
                        <ProgressBar
                          variant={"YOU_PICK_A_NAME"}
                          className="mt-3 mb-3"
                          now={calculateProgress(project)}
                          label={
                            calculateProgress(project) !== 100
                              ? calculateProgress(project).toFixed(2) + "%"
                              : calculateProgress(project) + "%"
                          }
                        ></ProgressBar>
                        <h6 style={{ marginBottom: "-10px" }}>
                          {calculateDateLeft(
                            project.startDate,
                            project.endDate
                          ) > 0
                            ? calculateDateLeft(
                                project.startDate,
                                project.endDate
                              ) + " Days Left"
                            : Math.abs(
                                calculateDateLeft(
                                  project.startDate,
                                  project.endDate
                                )
                              ) + " Days Behind"}
                        </h6>
                        <ProgressBar
                          variant={"YOU_PICK_A_NAME"}
                          className="mt-3 mb-3"
                          style={{ marginBottom: "100px" }}
                          now={getDayPercentage(project)}
                          label={
                            getDayPercentage(project) !== 100
                              ? getDayPercentage(project).toFixed(2) + "%"
                              : getDayPercentage(project) + "%"
                          }
                        ></ProgressBar>

                        <h6 style={{ marginBottom: "0", marginTop: "-8px" }}>
                          Started on
                        </h6>
                        <h5>{project.startDate}</h5>
                        <Button onClick={() => viewDetails(project)}>
                          Details
                        </Button>
                      </Card.Body>
                    </Card>
                  ))}
                </Carousel>
              ) : (
                <div style={{ display: "none" }}></div>
              )}
            </>
          ) : (
            <Carousel itemsToShow={4}>
              {projects.map((project) => (
                <Card
                  key={project.projectName}
                  className="main-shadow  m-3 text-center"
                  style={{ width: "250px", height: "300px" }}
                >
                  <Card.Body>
                    <h1>{project.projectName}</h1>
                    <h6 style={{ marginBottom: "-10px" }}>
                      Completion Progress
                    </h6>
                    <ProgressBar
                      variant={"YOU_PICK_A_NAME"}
                      className="mt-3 mb-3"
                      now={calculateProgress(project)}
                      label={
                        calculateProgress(project) !== 100
                          ? calculateProgress(project).toFixed(2) + "%"
                          : calculateProgress(project) + "%"
                      }
                    ></ProgressBar>
                    <h6 style={{ marginBottom: "-10px" }}>
                      {calculateDateLeft(project.startDate, project.endDate) > 0
                        ? calculateDateLeft(
                            project.startDate,
                            project.endDate
                          ) + " Days Left"
                        : Math.abs(
                            calculateDateLeft(
                              project.startDate,
                              project.endDate
                            )
                          ) + " Days Behind"}
                    </h6>
                    <ProgressBar
                      variant={"YOU_PICK_A_NAME"}
                      className="mt-3 mb-3"
                      style={{ marginBottom: "100px" }}
                      now={getDayPercentage(project)}
                      label={
                        getDayPercentage(project) !== 100
                          ? getDayPercentage(project).toFixed(2) + "%"
                          : getDayPercentage(project) + "%"
                      }
                    ></ProgressBar>

                    <h6 style={{ marginBottom: "0", marginTop: "-8px" }}>
                      Started on
                    </h6>
                    <h5>{project.startDate}</h5>
                    {isAssigned(project) ? (
                      <Button onClick={() => viewDetails(project)}>
                        Details
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </Carousel>
          )}
        </>
      ) : (
        <Carousel>
          <Card
            className="main-shadow  m-3 text-center"
            style={{ width: "250px", height: "300px" }}
          >
            <Card.Body>
              <h2>Add Project</h2>
              <PopUp></PopUp>
            </Card.Body>
          </Card>
        </Carousel>
      )}
      <div>
        <div className="mr-3 mb-2" style={{ textAlign: "right" }}>
          {formattedData.length > 1 ? (
            <Button onClick={() => exportComponentAsPNG(componentRef)}>
              Export as Image
            </Button>
          ) : (
            <div></div>
          )}
        </div>
        <h5>Gannt Chart of the projects</h5>
        <div
          ref={componentRef}
          style={{
            width: "100%",
            height: "52vh",
            overflow: "auto",
            paddingRight: "50px",
          }}
        >
          {formattedData.length > 1 ? (
            <Chart
              width={"100%"}
              height={"100%"}
              chartType="Gantt"
              loader={<div>Loading Chart</div>}
              data={formattedData}
              rootProps={{ "data-testid": "1" }}
            />
          ) : (
            <div>
              <h5>You have no Projects to be Displayed in Gantt Chart</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
