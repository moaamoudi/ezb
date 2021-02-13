import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useHistory } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed To Log Out");
    }
  }

  return (
    <>
    <h1>{currentUser.displayName}</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
