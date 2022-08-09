import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";


import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ShowImage from "../functions/ShowImage";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import Moment from "moment";
import ThreadList from "../components/ThreasList";
import PollList from "../components/PollList";
import CircularProgress from "@mui/material/CircularProgress";

import { CalendarMonth, Place } from "@mui/icons-material";
import GroupedAvatars from "../components/GroupedAvatars";

function EventDetailsPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [eventImage, setEventImage] = useState(null);
  const [formatDate, setFormatDate] = useState("");
  const [formatTime, setFormatTime] = useState("");
  const [organizersArray, setOrganizersArray] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/events/" + eventId, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setEvent(response.data);
        const imageUrl = ShowImage(response.data.image);
        setEventImage(imageUrl);
        setFormatDate(Moment(response.data.date).format("MMM Do YY"));
        setFormatTime(Moment(response.data.date).format("h:mm A"));
        setOrganizersArray(
          response.data.organizers.map((element) => element._id)
        );
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [eventId, storedToken]);

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
      {!event ? (
        <Box align="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          container
          rowSpacing={3}
          columnSpacing={1}
          sx={{ width: "100%", p: "5%" }}
        >
          <Box
            width="100%"
            style={{
              height: "40vw",
              backgroundColor: "lightgrey",
              backgroundImage: `url(${eventImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPositionY: "center",
            }}
          />
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h5"
              component="div"
              gutterBottom
            >
              {event.name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              align="left"
              variant="h6"
              component="div"
              // sx={{ mt:-5}}
              sx={{ mt: -2, p: 0.5 }}
            >
              Info
            </Typography>
          </Grid>

          <Grid
            item
            xs={6}
            sx={{ display: "flex", flexDirection: "row", mt: -4 }}
          >
            <Box sx={{ pt: "0.8rem", pr: "1rem" }}>
              <Place />
            </Box>
            <Typography variant="h7" component="div" align="left">
              {event.location.street && event.location.housenumber ? (
                <>
                  <p>
                    {event.location.street}
                    {event.location.housenumber}
                  </p>
                  <p>
                    {event.location.citycode}, {event.location.city}
                  </p>
                  <p>{event.location.country}</p>
                </>
              ) : (
                <p>TBD</p>
              )}
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ pt: "0.8rem", pr: "1rem", pl: "1rem" }}>
              <CalendarMonth />
            </Box>
            <Typography variant="h7" component="div" align="left">
              <p>{formatDate}</p>
              <p>{formatTime}</p>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <GroupedAvatars
              avatars={event.participants}
              organizersArray={organizersArray}
            >
              {" "}
              align="left"
            </GroupedAvatars>

            {/* <Stack direction="row" spacing={2}>
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
                        {organizersArray.includes(participant._id)? (
                          <Typography style={{fontSize: '12px'}} > Owner </Typography>
                        ): (<></>)
                        }
                      </div>
                    );
                  })}
            </Stack> */}
          </Grid>

          {/* <Grid item xs={12}>
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
          </Grid> */}

          <Grid item xs={6}>
            <ThreadList />
          </Grid>

          <Grid item xs={6}>
            <PollList />
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              startIcon={<Check />}
              sx={{ width: "100%" }}
            >
              Confirm
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="outlined"
              startIcon={<Close />}
              sx={{ width: "100%" }}
            >
              Decline
            </Button>
          </Grid>

          {/* {organizersArray.includes(participant._id)? (
            <p>youre org</p>
          )
          : (
            <p>youre part</p>
          )} */}

          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              startIcon={<EditIcon />}
              href={`/${eventId}/update-event`}
            >
              Edit
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="error"
              sx={{ width: "100%" }}
              onClick={() => deleteEvent()}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default EventDetailsPage;
