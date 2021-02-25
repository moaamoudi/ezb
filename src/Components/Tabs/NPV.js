import React from "react";
import { Form, Button } from "react-bootstrap";

export default function NPV() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Form>
        <Form.Group id="ProjectName">
          <Form.Label>Initial Investment</Form.Label>

          <Form.Control
            style={{ width: "20%" }}
            type="Name"
            // ref={ProjectName}
            icon="fas fa-dollar-sign"
            required
            className="form-control button-bg "
          />
        </Form.Group>

        <Form.Group id="ProjectDescription">
          <Form.Label>Project Description:</Form.Label>
          <Form.Control
            type="Name"
            // ref={ProjectDescription}
            required
            className="form-control button-bg"
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="light" className="w-50 button-bg mt-3" type="submit">
            Calculate
          </Button>
        </div>
      </Form>
    </div>
  );
}
