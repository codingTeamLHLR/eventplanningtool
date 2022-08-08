import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import BackgroundLetterAvatars from "../functions/BackgroundLetterAvatars";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ShowImage from "../functions/ShowImage";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, Typography } from "@mui/material";
import Moment from "moment";
import ThreadList from "../components/ThreasList";
import PollList from "../components/PollList";
import CircularProgress from '@mui/material/CircularProgress';


function EventDetailsPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [eventImage, setEventImage] = useState(null);
  const [formatDate, setFormatDate] = useState("TBD");

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {

    axios
      .get(process.env.REACT_APP_API_URL + "/events/" + eventId, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setEvent(response.data);
        setEventImage(ShowImage(response.data.image));
        setFormatDate(Moment(response.data.date).format("MMM Do YY"));
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteEvent = () => {    

    axios
      .delete(process.env.REACT_APP_API_URL + "/events/" + eventId, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {!event 
      ? <Box align="center">
            <CircularProgress />
        </Box>
      : (
        <Grid container rowSpacing={3} columnSpacing={1} sx={{ p: 2, marginBottom: 10 }}>
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h2"
              component="div"
              gutterBottom
            >
              {event.name}
            </Typography>

            <img height="250" src={eventImage} alt="green iguana" />
          </Grid>

          <Grid item xs={6}>
            <Typography gutterBottom variant="h5" component="div" align="left">
              {event.location.street && event.location.housenumber ? (
                <div>
                  <p>
                    {event.location.street}
                    {event.location.housenumber}
                  </p>
                  <p>
                    {event.location.citycode}, {event.location.city}
                  </p>
                  <p>{event.location.country}</p>
                </div>
              ) : (
                <p>TBD</p>
              )}
            </Typography>
            </Grid>
            
            <Grid item xs={6}>
            <Typography variant="h5" color="text.secondary" component="div" align="right">
              {formatDate}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <h3>Guests</h3>
            <Stack direction="row" spacing={2}>
              {event.participants.map((participant) => {
                return (
                  <div key={participant._id}>
                    {participant.image ? (
                      <Avatar
                        alt={participant.username}
                        src={participant.image}
                      />
                    ) : (
                      <BackgroundLetterAvatars name={participant.username} />
                    )}
                  </div>
                );
              })}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <h3>Organizers</h3>
            <Stack direction="row" spacing={2}>
              {event.organizers.map((organizer) => {
                return (
                  <div key={organizer._id}>
                    {organizer.image ? (
                      <Avatar alt={organizer.username} src={organizer.image} />
                    ) : (
                      <BackgroundLetterAvatars name={organizer.username} />
                    )}
                  </div>
                );
              })}
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" startIcon={<EditIcon />}  href={`/${eventId}/update-event`}>
              Edit
            </Button>
            </Grid>
            <Grid item xs={6}>
            <Button variant="outlined" onClick={() => deleteEvent()} startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Grid>
          <Grid item xs={6}>
            <ThreadList />
            </Grid>
          <Grid item xs={6}>
            <PollList />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default EventDetailsPage;
