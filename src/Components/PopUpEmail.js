import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Form, Button, Card } from "react-bootstrap";
import React, { useRef } from "react";
import emailJS from "emailjs-com";
import "./styles/PopUp.css";

export default function PopUpAddEmployee(props) {
  let Email = props.Email;

  const Subject = useRef();
  const msg = useRef();
  const Name = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    let variables = {
      msg: msg.current.value,
      Name: Name.current.value,
      Subject: Subject.current.value,
      reciever: props.Email,
    };
    console.log(variables);
    emailJS
      .send(
        "Gmail",
        "Development_email",
        variables,
        "user_Ufgqez1YDtVtHo6gPiYox"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    e.target.reset();
  }

  return (
    <Popup
      trigger={
        <Button style={{ width: "20%", margin: "50px" }}> Send Email</Button>
      }
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card className="main-shadow" style={{ width: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Send Email</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="Subject">
                <Form.Label>Subject:</Form.Label>
                <Form.Control
                  type="string"
                  required
                  className="form-control button-bg "
                  name="Subject"
                  ref={Subject}
                />
              </Form.Group>

              <Form.Group id="from">
                <Form.Label>Name of Sender:</Form.Label>
                <Form.Control
                  type="string"
                  required
                  className="form-control button-bg "
                  name="Name"
                  ref={Name}
                />
              </Form.Group>
              <Form.Group id="reciever">
                <Form.Label>To:</Form.Label>
                <Form.Control
                  type="string"
                  required
                  className="form-control button-bg "
                  name="reciever"
                  value={Email}
                  readOnly
                />
              </Form.Group>
              <Form.Group id="msg">
                <Form.Label>Message:</Form.Label>
                <br />
                <Form.Control
                  as="textarea"
                  ref={msg}
                  rows={5}
                  name="msg"
                  style={{ width: "100%" }}
                ></Form.Control>
              </Form.Group>

              <div className="text-center">
                <Button
                  variant="light"
                  className="w-50 button-bg mt-3"
                  type="submit"
                >
                  Send
                </Button>
              </div>
              <div className="text-center">
                <Button
                  variant="light"
                  className="w-50 button-bg mt-3"
                  onClick={() => {
                    Email = "";
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
