import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useHistory } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import PopUp from "./PopUpProject";
import { Card } from "react-bootstrap";
import ScrollMenu from "react-horizontal-scrolling-menu";
export default function Dashboard() {
  const [error, setError] = useState("");
  const [projectsFetched, setProjectsFetched] = useState(false);
  const { logout, getUserProjects, setSelectedProject1 } = useAuth();
  const history = useHistory();
  const { projects } = useAuth();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed To Log Out");
    }
  }

  function viewDetails(project) {
    setSelectedProject1(project);
    history.push("/projects/" + project.projectName);
  }

  useEffect(() => {
    if (projectsFetched) {
    } else {
      getUserProjects();
      setProjectsFetched(true);
    }
  }, [getUserProjects, projectsFetched]);

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>

      {projects ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <ScrollMenu
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
                  <label>Started on</label>
                  <h5>{project.startDate}</h5>
                  <Button onClick={() => viewDetails(project)}>Details</Button>
                </Card.Body>
              </Card>
            ))}
          />

          <PopUp />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
