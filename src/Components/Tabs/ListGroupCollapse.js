import React, { useState } from "react";
import { Col, Collapse, Container } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext.js";

export const ListGroupCollapse = (props) => {
  const [open, setOpen] = useState(false);

  // const click = document.getElementById("click").addEventListener(
  //   "click",
  //   (e) => {
  //     console.log("test");
  //   },
  //   { passive: true }
  // ) 

  return (
    <Col md={12} style={{ textAlign: "center", marginTop: "0px" }}>
      {open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          onClick={() => {
            setOpen(!open);
          }}
          fillRule="currentColor"
          className="bi bi-arrow-up-short svgOnClick"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
          />
        </svg>
      ) : (
        <svg
          data-bs-toggle="collapse"
          href="#multiCollapseExample1"
          onClick={() => {
            setOpen(!open);
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          fillRule="currentColor"
          className="bi bi-arrow-down-short svgOnClick"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
          />
        </svg>
      )}

      <Collapse in={open}>
        <div>
          <hr></hr>
          {props.task.subTasks.map((sub) => (
            <Container
              style={{
                display: "inline-flex",
                maxWidth: "235px",
                marginBottom: "10px",
              }}
            >
              <Col md={4}>{sub.name}</Col>

              <Col md={4}>
                {sub.complete ? (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="#F5A494"
                      className="bi bi-check-square-fill svgOnClick"
                      viewBox="0 0 16 16"
                      onClick={() => props.handleClick(sub, props.task)}
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
                    </svg>
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="#F5A494"
                    className="bi bi-square svgOnClick"
                    viewBox="0 0 16 16"
                    onClick={() => props.handleClick(sub, props.task)}
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  </svg>
                )}
              </Col>
              <Col md={4}>
                {sub.lastModified !== undefined ? (
                  <div>
                    <img
                      style={{ borderRadius: "50%", width: "35px" }}
                      src={sub.lastModified.photoURL}
                      alt="Profile_Picture"
                    ></img>
                  </div>
                ) : (
                  <div></div>
                )}
              </Col>
            </Container>
          ))}
        </div>
      </Collapse>
    </Col>
  );
};
