import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import { Form, Button, Card, Dropdown,DropdownButton } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import { add, format } from "date-fns";
import "./styles/PopUp.css";

export default function PopUptask() {
  let [ref,setref] = useState([]);
  let [subtasklist,setSubtasklist] = useState([]);
  let taskName = useRef();
  const taskDiscription = useRef();
  let subTaskName = useState();
  function handleSubmit(e) {
    e.preventDefault();
  }
  function addItem() {
    if (subTaskName.value !== "") {
      var joined = subtasklist.concat({ name: subTaskName.value });

      setSubtasklist(joined);
      subTaskName.value = "";
    }
  }
  function handleRemove(task) {
    const newList = subtasklist.filter((Task) => Task.name !== task);
    setSubtasklist(newList);
  }
  
  return (
    <Popup
      trigger={<button> Add Task</button>}
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card className="main-shadow" style={{ width: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Add Task</h2>
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
              <Form.Label style={{ display: "unset" }}>
                SubTask name:
              </Form.Label>
              <Form.Group id="taskDiscription" style={{ display: "flex" }}>
                <Form.Control
                  ref={(a) => (subTaskName = a)}
                  placeholder="enter task"
                  className="form-control button-bg"
                  style={{ width: "50%" }}
                />

                <Button
                style={{ width: "50%" }}
                  variant="light ml-2"
                  onClick={(e) => {
                    addItem();
                  }}
                >
                  Add SubTask
                </Button>
              </Form.Group>
              {subtasklist.length>0?(<DropdownButton
                id="dropdown-button-drop-right"
                drop="right"
                variant="light"
                title="SubTasks"
              >
                
                  {subtasklist.map((task) => (
                    <div key={task.name}>
                      <Dropdown.Item >
                        <div style={{display:'flex'}}>
                          <div style={{width:"90%"}}>{task.name}</div>
                          
                          
                        
                          <Button
                          variant="light"
                          
                          onClick={() => handleRemove(task.name)}
                        >
                          X
                        </Button>
                          
                        </div>
                        
                        
                      </Dropdown.Item>
                      <hr style={{ width: "100%", margin: "0" }} />
                    </div>
                  ))}
               
              </DropdownButton>):(<div/>)}
              
              <div className="text-center">
                <Button
                  variant="light"
                  className="w-50 button-bg mt-3"
                  type="submit"
                >
                  submit
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
