import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import Moment from "moment";
import { useNavigate } from "react-router-dom";

function Calendar(props) {
  function addHours(hours, date) {
    let ms = hours * 60 * 60 * 1000;
    date.setTime(date.getTime() + ms);
    return date;
  }

  const schedulerData = [];

  props.data.forEach((element) => {
    const startDateTemp = new Date(element.date);
    const startDate = Moment(startDateTemp).format("yyyy-MM-DDTHH:mm");

    const endDateTemp = addHours(2, startDateTemp);
    const endDate = Moment(endDateTemp).format("yyyy-MM-DDTHH:mm");

    schedulerData.push({
      startDate,
      endDate,
      title: element.name,
      id: element._id,
    });
  });

  let navigate = useNavigate();

  const openEventDetails = (event) => {
    navigate(`/${event.data.id}`);
  };

  const Appointment = ({ children, style, ...restProps }) => {
    return (
      <Appointments.Appointment
        {...restProps}
        onClick={openEventDetails}
        style={{
          ...style,
          backgroundColor: "#595e78",
          borderRadius: "5%",
          fontSize: "13px",
          border: "none",

        }}
      >
        {children}
      </Appointments.Appointment>
    );
  };

  return (
    <Paper
      sx={{
        background: "none",
        "& .css-99cbwm .MainLayout-background": {
          backgroundColor: "#110d26",
        },
        "& .css-y76m1d.Appointment-appointment": {
            height: "50%",
        },
        "& .css-99cbwm.MainLayout-container": {
            border: "1px solid white",
            borderRadius: "10px",
            overflow: "hidden",
        },
        "& .css-1b7ni76-MuiToolbar-root.Toolbar-toolbar": {
            borderBottom: 0,
        }
      }}
    >

      <Scheduler
        data={schedulerData}
      >
        <ViewState/>
        <MonthView />
        <Toolbar />
        <DateNavigator openButtonComponent="none" />
        <TodayButton />
        <Appointments data appointmentComponent={Appointment} />
      </Scheduler>
    </Paper>
  );
}

export default Calendar;
