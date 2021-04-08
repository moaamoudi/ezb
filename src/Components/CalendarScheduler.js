import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Scheduler,
  MonthView,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  Appointments,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";

import { withStyles } from "@material-ui/core/styles";

import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: "center",
  },
  firstRoom: {
    background:
      "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)",
  },
  secondRoom: {
    background:
      "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)",
  },
  thirdRoom: {
    background:
      "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)",
  },
  header: {
    height: "260px",
    backgroundSize: "cover",
  },
  commandButton: {
    backgroundColor: "rgba(255,255,255,0.65)",
  },
});

function calculateProgress(temp) {
  let counter = 0;

  temp.subTasks.forEach((sub) => {
    if (sub.complete) {
      counter++;
    }
  });

  return counter;
}

const Header = withStyles(style, {
  name: "Header",
})(({ children, appointmentData, classes, ...restProps }) => (
  <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
    <Container
      fluid
      style={{
        backgroundColor: appointmentData.color,
        textAlign: "center",
        borderRadius: "4px",
        margin: "5px",
      }}
    >
      <Row style={{ textAlign: "center" }}>
        <Col md={12}>
          <h6 style={{ color: "white", fontSize: "18px" }}>
            {appointmentData.belongsTo.projectName}
          </h6>
        </Col>
        {/* <hr style={{ color: "black", width: "100%" }} /> */}
        <Col md={12}>
          <h6 style={{ color: "white" }}>{appointmentData.title}</h6>
        </Col>
      </Row>
    </Container>
  </AppointmentTooltip.Header>
));

export default class CalendarScheduler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      viewDetails: this.props.data,
    };
  }

  render() {
    const { data } = this.state;

    const Content = withStyles(style, {
      name: "Content",
    })(({ children, appointmentData, classes, ...restProps }) => (
      <Container fluid>
        <Row>
          <Col md={12}>
            <div style={{ width: "75px", height: "75px" }}>
              <CircularProgressbar
                value={
                  appointmentData.subTasks.length > 0
                    ? (
                        (calculateProgress(appointmentData) /
                          appointmentData.subTasks.length) *
                        100
                      ).toFixed(2)
                    : 0
                }
                text={
                  appointmentData.subTasks.length > 0
                    ? (
                        (calculateProgress(appointmentData) /
                          appointmentData.subTasks.length) *
                        100
                      ).toFixed(2) + "%"
                    : "No sub tasks"
                }
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: "butt",
                  textSize: "16px",
                  pathColor: appointmentData.color,
                  textColor: appointmentData.color,
                  trailColor: "#dcdcdc",
                })}
              />
            </div>
          </Col>
          <Col md={12}>
            <Row className="mb-2">
              <Col md={4}>Subtask Name</Col>
              <Col md={4}>Completed</Col>
              <Col md={4}>Assigned to</Col>
            </Row>
            {appointmentData.subTasks.length > 0 ? (
              <div
                style={{
                  height: "120px",
                  width: "100%",
                  overflow: "auto",
                  marginTop: "10px",
                }}
              >
                {appointmentData.subTasks.map((sub) => (
                  <Row
                    style={{ width: "99%", marginBottom: "10px" }}
                    key={sub.name}
                  >
                    <Col md={6}>{sub.name}</Col>
                    <Col md={4}>
                      {sub.complete ? (
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="#F5A494"
                            className="bi bi-check-square-fill"
                            viewBox="0 0 16 16"
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
                          className="bi bi-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        </svg>
                      )}
                    </Col>
                    <Col md={2}>
                      {sub.assigned !== undefined ? (
                        <div>
                          {sub.assigned.photoURL ? (
                            <OverlayTrigger
                              placement="right"
                              delay={{ show: 250, hide: 400 }}
                              overlay={
                                <Tooltip
                                  id="button-tooltip-2"
                                  style={{ zIndex: "1500" }}
                                >
                                  Assigned to: {sub.assigned.name}
                                </Tooltip>
                              }
                            >
                              <img
                                style={{
                                  borderRadius: "50%",
                                  width: "30px",
                                }}
                                src={sub.assigned.photoURL}
                                alt="Profile_Picture"
                              ></img>
                            </OverlayTrigger>
                          ) : (
                            <OverlayTrigger
                              placement="right"
                              delay={{ show: 250, hide: 400 }}
                              overlay={
                                <Tooltip
                                  id="button-tooltip-2"
                                  style={{ zIndex: "1500" }}
                                >
                                  Assigned to: {sub.assigned.name}
                                </Tooltip>
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-person-circle"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path
                                  fillRule="evenodd"
                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                />
                              </svg>
                            </OverlayTrigger>
                          )}
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </Col>
                  </Row>
                ))}
              </div>
            ) : (
              <div>No sub tasks</div>
            )}
          </Col>
          <Col md={12} className="text-center">
            <Button
              className="mt-3 mb-3"
              onClick={() => this.props.viewDetails(appointmentData.belongsTo)}
            >
              Go to Project Page
            </Button>
          </Col>
        </Row>
      </Container>
    ));

    const Appointment = ({ children, style, ...restProps }) => (
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          height: "20px",
          backgroundColor: restProps.data.color,
          borderRadius: "4px",
        }}
      >
        {children}
      </Appointments.Appointment>
    );

    return (
      <Paper>
        <Scheduler data={data} height="100%">
          <ViewState defaultCurrentViewName="Month" />
          <MonthView height="100%" />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />

          <Appointments appointmentComponent={Appointment} />

          <AppointmentTooltip
            contentComponent={Content}
            headerComponent={Header}
            showCloseButton
          />
        </Scheduler>
      </Paper>
    );
  }
}
// headerComponent={Header}
