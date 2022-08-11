import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SortByDate from "../functions/SortByDate";
// import nightlights from "../images/default-event-picture3.jpg";
// import nightlights from "../images/default-event-picture3.jpg";
import nightlights from "../images/default-event-picture.jpg"

export default function EventListPage() {
  const [events, setEvents] = useState([]);

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
      <Box>
        <Typography
          variant="h2"
          align="left"
          sx={{
            color: "text.primary",
            position: "absolute",
            left: "10vw",
            top: "10vw",
          }}
        >
          All <br />
          Events <br />
        </Typography>

        <Box
          component="img"
          src={nightlights}
          sx={{
            width: "100vw",
            height: "60vw",
            background: "lightgrey",
            backgroundImage:
              "https://media.istockphoto.com/id/1134266228/de/foto/tropenbar-athmocphere-hintergrund-mit-gelber-girlanden-bokeh-nacht-lebenskonzept.webp?s=612x612&w=is&k=20&c=UJtPIdzZ9q_5XUzdw_1sKDdf2_TgCto0u2Im_b1vxOE=",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPositionY: "center",
            borderRadius: 1,
            position: "fixed",
          }}
        ></Box>
      </Box>

      <Button
        component={Link}
        to="create-event"
        variant="contained"
        color="primary"
        sx={{ position: "fixed", bottom: "80px", left: "33.3vw" }}
      >
        Create Event
      </Button>

      {events.length === 0 ? (
        <CircularProgress size={40} sx={{ mt: "100px", align: "center" }} />
      ) : (
        <Grid container sx={{ p: 2 }} columnSpacing={2}>
          {events.map((element) => {
            return (
              <Grid item key={element._id} xs={12} md={6} lg={4}>
                <EventCard data={element} />
              </Grid>
            );
          })}
        </Grid>
      )}

      <Box height={60}></Box>
    </>
  );
}
