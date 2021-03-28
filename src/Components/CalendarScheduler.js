import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  Appointments,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Room from "@material-ui/icons/Room";
import { withStyles } from "@material-ui/core/styles";
import classNames from "clsx";
import PopUptask from "./popUptask.js";

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



const Header = withStyles(style, { name: "Header" })(
  ({ children, appointmentData, classes, ...restProps }) => (
    <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
    
    </AppointmentTooltip.Header>
  )
);

const Content = withStyles(style, { name: "Content" })(
  ({ children, appointmentData, classes, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
    </AppointmentTooltip.Content>
  )
);

const CommandButton = withStyles(style, {
  name: "CommandButton",
})(({ classes, ...restProps }) => (
  <AppointmentTooltip.CommandButton
    {...restProps}
    
  />
));

export default class CalendarScheduler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  render() {
    const { data } = this.state;

    const Appointment = ({ children, style, ...restProps }) => (
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
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
          <DayView />
          <WeekView />
          <MonthView height="100%" />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />

          <Appointments appointmentComponent={Appointment} />

          <AppointmentTooltip
            contentComponent={Content}
            showCloseButton
          />
        </Scheduler>
      </Paper>
    );
  }
}
// headerComponent={Header}
