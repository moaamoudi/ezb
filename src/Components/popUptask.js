import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import { add, format } from "date-fns";
import "./styles/PopUp.css";

export default function PopUptask() {
  const taskName = useRef();
  const taskDiscription = useRef();
  const [subTasks,setSubTasks]=useState([])
  const [areatext,setAreatext]=useState([])
  function handleSubmit(e) {
    e.preventDefault();
  }
function addsub(){
    console.log("start add")
    console.log(subTasks)
    setAreatext(areatext.concat(<Form.Group id="taskDiscription">
   <Form.Label>SubTask name:</Form.Label>
   <Form.Control
     type="Name"
     onKeyPress={Event=>{
        if (Event.charCode === 13) {
            subTasks.push(Event.target.value)
            console.log(subTasks)
        }
     }}
     className="form-control button-bg"
   />
 </Form.Group>)) 
}

  return (
    <Popup
      trigger={<button> add tasks</button>}
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card className="main-shadow" style={{ width: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Add task</h2>
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="taskName">
                <Form.Label>Task Name:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={taskName}
                  required
                  className="form-control button-bg "
                />
              </Form.Group>

              <Form.Group id="taskDiscription">
                <Form.Label>Task Description:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={taskDiscription}
                  required
                  className="form-control button-bg"
                />
              </Form.Group>
                    {areatext}
                <Button variant="light" onClick={()=>addsub()}>add subtask</Button>
              
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
