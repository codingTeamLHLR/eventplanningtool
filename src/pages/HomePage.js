import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button, MenuList } from "@mui/material";
import { Link } from "react-router-dom";
import SortByDate from "../functions/SortByDate";

function HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(process.env.REACT_APP_API_URL + "/events", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // console.log('Object of all events:', response.data);
        // console.log("api response", response.data)
        // console.log("sorted", SortByDate(response.data))
        setEvents(SortByDate(response.data));

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1> All Events</h1>

      <Link to="create-event">
        {" "}
        <Button> Create Event</Button>
      </Link>

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
    </>
  );
}

export default HomePage;
