import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";
import React, { useRef, useState } from "react";
import "react-google-flight-datepicker/dist/main.css";
import "./styles/PopUp.css";

export default function PopUpNote() {
  const note = useRef();
  const { insertNoteToFirestore } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    insertNoteToFirestore(note.current.value);
  }

  return (
    <Popup
      trigger={<Button> Add Note</Button>}
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card className="main-shadow" style={{ width: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Add Note</h2>
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="Note">
                <Form.Label>Note:</Form.Label>
                <Form.Control
                  type="string"
                  ref={note}
                  required
                  className="form-control button-bg "
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
