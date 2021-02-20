import React from "react";
import { useAuth } from "../Context/AuthContext";

export default function ProjectPage() {
  const { project } = useAuth();

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      {project.projectName}
    </div>
  );
}
