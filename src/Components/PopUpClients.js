import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Form, Button, Card } from "react-bootstrap";
import React, { useRef } from "react";
import "./styles/PopUp.css";
import { useAuth } from "../Context/AuthContext";

export default function PopUpAddClient(props) {
  const ClientName = useRef();
  const ClientEmail = useRef();
  const { insertClientToFirestore } = useAuth();

  function handleSubmit() {
    insertClientToFirestore(
      ClientName.current.value,
      ClientEmail.current.value
    );
  }

  return (
    <Popup
      trigger={
        <Button
          disabled={!props.checkOwner()}
          className="mb-2"
          style={{ marginRight: "66%" }}
        >
          Add Client
        </Button>
      }
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card className="main-shadow" style={{ width: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Add Client</h2>
            <Form>
              <Form.Group id="ClientName">
                <Form.Label>Client Name:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={ClientName}
                  required
                  className="button-bg"
                />
              </Form.Group>
              <Form.Group id="ClientEmail">
                <Form.Label>Client Email:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={ClientEmail}
                  required
                  className="button-bg"
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  className="w-50 mt-3"
                  onClick={() => {
                    handleSubmit();
                    close();
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="text-center">
                <Button
                  className="w-50 mt-3"
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
