import React from "react";
import { useAuth } from "../Context/AuthContext";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import PopUp from "./PopUpProject";
import { Card } from "react-bootstrap";
import ScrollMenu from "react-horizontal-scrolling-menu";
export default function Dashboard() {
  const {
    projects,
    setSelectedProject1,
    selectCompany,
  } = useAuth();
  const history = useHistory();

 

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

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      {projects ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <ScrollMenu
            wrapperStyle={{ width: "88%" }}
            alignCenter={false}
            itemStyle={{ outlineColor: "transparent" }}
            data={projects.map((project) => (
              <Card
                key={project.projectName}
                className="main-shadow  m-3 text-center"
                style={{ width: "250px" }}
              >
                <Card.Body>
                  <h1>{project.projectName}</h1>
                  <h5>
                    {calculateDateLeft(project.startDate, project.endDate) > 0
                      ? calculateDateLeft(project.startDate, project.endDate) +
                        " Days Left"
                      : Math.abs(
                          calculateDateLeft(project.startDate, project.endDate)
                        ) + " Days Behind"}
                  </h5>
                  <label className="mb-0">Started on</label>
                  <h5>{project.startDate}</h5>
                  <Button onClick={() => viewDetails(project)}>Details</Button>
                </Card.Body>
              </Card>
            ))}
          />
          <div>
            <PopUp />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
