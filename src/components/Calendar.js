import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    MonthView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';


function Calendar (props) {

    function addHours(hours, date) {
        let ms = hours * 60 * 60 * 1000;
        date.setTime(date.getTime() + ms);
        return date;
      }

    // const currentDate = Moment();
    const nextDate = Moment().add(2, 'months').calendar(); 
    console.log("nextDate", nextDate)

    const schedulerData = []

    props.data.forEach(element => {
        // console.log(element.date)
        const startDateTemp = new Date(element.date);
        // console.log("startDateTemp", startDateTemp)
        const startDate = Moment(startDateTemp).format("yyyy-MM-DDTHH:mm")
        // console.log("startDate", startDate)

        const endDateTemp = addHours(2, startDateTemp);
        // console.log("endDateTemp", endDateTemp)
        const endDate = Moment(endDateTemp).format("yyyy-MM-DDTHH:mm")
        // console.log("endDate", endDate)
        
        schedulerData.push({ startDate, endDate, title: element.name, id: element._id})
    });
    // console.log("schedulerData", schedulerData)


    let navigate = useNavigate(); 

    const openEventDetails = (event) => {
        console.log(event.data.id)
        navigate(`/${event.data.id}`)
    }


    const Appointment = ({children, style, ...restProps}) => {

        return (
        <Appointments.Appointment
            {...restProps}
            onClick={openEventDetails}
            style={{
                ...style,
                backgroundColor: '#595e78',
                borderRadius: '5%',
                fontSize: "13px",
                color: "#74f2a2",
                border: "none",
                // opacity: 0.5
            }}
            >
            {children}
        </Appointments.Appointment>
        )
    };

    // const MonthViewLayout = ({children, style, ...restProps}) => {
    //     return (
    //     <MonthView.MonthViewLayout>
    //         {children}
    //     </MonthView.MonthViewLayout>
    //     )
    // };


    return(
        
            <Paper sx={{background: "none", border: "1px solid white"}}>
                <Scheduler
                data={schedulerData}
                // height={300} // scroll?
                >
                    <ViewState 
                        // defaultCurrentDate={currentDate}
                        // currentDate={nextDate}
                    />
                    <MonthView />
                    <Toolbar/>
                    <DateNavigator openButtonComponent="none" />
                    <TodayButton />
                    <Appointments data appointmentComponent={Appointment} />
                </Scheduler>
            </Paper>
)
}

export default Calendar;