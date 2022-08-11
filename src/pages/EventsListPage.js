import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button, MenuList, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SortByDate from "../functions/SortByDate";
import Calendar from "../components/Calendar";
import ViewSwitch from "../components/ViewSwitch";
import nightlights from "../images/test.png"

export default function EventListPage() {
  const [events, setEvents] = useState([]);
  const [calendarView, setCalendarView] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(process.env.REACT_APP_API_URL + "/events", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setEvents(SortByDate(response.data));

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {/* <h1> All Events</h1> */}
      <Box>
        <Typography variant="h2" align="left" sx={{color: "text.primary", position: "absolute", left: "10vw", top: "10vw"}} >
            All <br/>
            Events <br/>
        </Typography>

        <Box
              component="img"
              src={nightlights}
              sx={{
                width: "100vw",
                // height: "100vh",
                background: "lightgrey",
                backgroundImage: "https://media.istockphoto.com/id/1134266228/de/foto/tropenbar-athmocphere-hintergrund-mit-gelber-girlanden-bokeh-nacht-lebenskonzept.webp?s=612x612&w=is&k=20&c=UJtPIdzZ9q_5XUzdw_1sKDdf2_TgCto0u2Im_b1vxOE=",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPositionY: "center",
                borderRadius: 1,
                position: "fixed"
              }}>
        </Box>
      </Box>

      {/* <ViewSwitch callBackToSetCalendarView={setCalendarView}/> */}



      <Link to="create-event" >
        {" "}
        <Button
          variant="contained"
          color="primary"
          sx={{position: "fixed", bottom: "80px", left: "30vw"}}
          // sx={{
          //   background: `linear-gradient(to right, rgba(0, 224, 255, 1), rgba(0, 133, 255, 1))`,
          // }}

        > Create Event</Button>
      </Link>


      {!calendarView
      ?
      <Grid container sx={{ p: 2}} columnSpacing={2}>

        {events.length === 0 ? (
          <p>loading...</p>
        ) : (
          <>
              {events.map((element) => {
                return (
                  <Grid item key={element._id} xs={12} md={6} lg={4}>
                      <EventCard  data={element} />
                  </Grid>
                )
              
              })}
          </>
        )}
      </Grid>
      :
      <Box sx={{p:2}}>
        <Calendar data={events} />
      </Box>
      }

      <Box height={60}></Box>

    </>
  );
}