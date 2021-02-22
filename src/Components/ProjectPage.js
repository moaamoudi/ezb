import React from "react";
import { useAuth } from "../Context/AuthContext";

export default function ProjectPage() {
  const { project } = useAuth();

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <h1>{project.projectName}</h1>
    </div>
  );
}
