import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SortByDate from "../functions/SortByDate";
import nightlights from "../images/default-event-picture.jpg"
export default function EventListPage(props) {
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
            backgroundColor: "lightgrey",
            backgroundRepeat: "no-repeat",
            backgroundImage: "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__480.jpg", //random placeholder
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
