import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Form, Button, Card } from "react-bootstrap";
import React, { useRef } from "react";
import "./styles/PopUp.css";
import { useAuth } from "../Context/AuthContext";

export default function PopUpEditClient(props) {
  const client = props.client;
  const ClientName = useRef();
  const ClientEmail = useRef();
  const { insertClientToFirestore, updateClient } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    updateClient(
      ClientName.current.value,
      ClientEmail.current.value,
      client.id
    );
  }

  return (
    <Popup
      trigger={
        <Button disabled={props.client === ""} style={{ width: "20%" }}>
          Edit
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
            <Form onSubmit={handleSubmit}>
              <Form.Group id="ClientName">
                <Form.Label>Client Name:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={ClientName}
                  defaultValue={client.ClientName}
                  required
                  className="button-bg"
                />
              </Form.Group>
              <Form.Group id="ClientEmail">
                <Form.Label>Client Email:</Form.Label>
                <Form.Control
                  type="Email"
                  ref={ClientEmail}
                  defaultValue={client.ClientEmail}
                  required
                  className="button-bg"
                />
              </Form.Group>

              <div className="text-center">
                <Button className="w-50 mt-3" type="submit">
                  Save
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
