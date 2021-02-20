import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useHistory } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import PopUp from "./PopUpProject";

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
        <div>
          {projects.map((project) => (
            <div key={project.projectName}>
              <h1>{project.projectName}</h1>
              <button onClick={() => viewDetails(project)}>Details</button>
            </div>
          ))}
          <PopUp />
        </div>
      ) : (
        <div></div>
      )}
      
    </div>

  );
}
