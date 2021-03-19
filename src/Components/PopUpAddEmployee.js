import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Form, Button, Card } from "react-bootstrap";
import React, { useState } from "react";


import "./styles/PopUp.css";

export default function PopUpAddEmployee() {
const [Employee,setEmployee]=useState();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Popup
      trigger={<Button className="mb-2" style={{marginRight:"60%"}}> Add Employee</Button>}
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card className="main-shadow" style={{ width: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Add Employee</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="ProjectName">
                <Form.Label>Choose Employee:</Form.Label>
                
              <Form.Control
                style={{ marginLeft: "10px" }}
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                custom
                onChange={Event=>setEmployee(Event.target.value)}
                required
                >
                
                <option value="SR">SR</option>
                <option value="£">POUND</option>
                <option value="$">DOLLAR</option>
                <option value="€">EURO</option>
              </Form.Control>
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
