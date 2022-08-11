import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SortByDate from "../functions/SortByDate";

export default function OrganizerEventListPage() {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(process.env.REACT_APP_API_URL + "/verify", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUserId(response.data._id);
        return axios.get(process.env.REACT_APP_API_URL + "/events", {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
      })
      .then((response) => {
        const organizerEvents = [];

        response.data.forEach((event) => {
          if (event.organizers.includes(userId)) {
            organizerEvents.push(event);
          }
        });

        setEvents(SortByDate(organizerEvents));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <>
      <Typography
        align="left"
        variant="h6"
        color="secondary"
        component="div"
        sx={{ mt: 2, p: 0.5 }}
      >
        Events you are hosting
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/create-event"
        sx={{ mt: 2 }}
      >
        Create Event
      </Button>

      <Grid container sx={{ p: 2 }} columnSpacing={2}>
        {events.length === 0 ? (
          <p>no events yet</p>
        ) : (
          <>
            {events.map((element) => {
              return (
                <Grid item key={element._id} xs={12} md={6} lg={4}>
                  <EventCard data={element} />
                </Grid>
              );
            })}
          </>
        )}
      </Grid>

      <Box height={60}></Box>
    </>
  );
}
