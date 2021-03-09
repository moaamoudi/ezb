import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import { format } from "date-fns";
import "./styles/PopUp.css";

export default function PopUpProducts() {
  const ProjectName = useRef();
  const ProjectDescription = useRef();
//   const ProjectName = useRef();
//   const ProjectDescription = useRef();
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Popup
      trigger={<button> PopUp</button>}
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card className="main-shadow" style={{ width: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Add Project</h2>
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="ProjectName">
                <Form.Label>Project Name:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={ProjectName}
                  required
                  className="form-control button-bg "
                />
              </Form.Group>

              <Form.Group id="ProjectDescription">
                <Form.Label>Project Description:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={ProjectDescription}
                  required
                  className="form-control button-bg"
                />
              </Form.Group>

              
              <div className="text-center">
                <Button
                  variant="light"
                  className="w-50 button-bg mt-3"
                  type="submit"
                >
                  Add
                </Button>
              </div>
              <div className="text-center">
                <Button
                  variant="light"
                  className="w-50 button-bg mt-3"
                  onClick={() => {
                    close();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Popup>
  );
}