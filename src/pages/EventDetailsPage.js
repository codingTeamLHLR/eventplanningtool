import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import AlertDialog from "../components/DeleteDialog";

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
import DeleteDialog from "../components/DeleteDialog";

function EventDetailsPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [eventImage, setEventImage] = useState(null);
  const [formatDate, setFormatDate] = useState("");
  const [formatTime, setFormatTime] = useState("");
  const [organizersArray, setOrganizersArray] = useState([]);
  const [currentUserId, setCurrentUserId] = React.useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/verify", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCurrentUserId(response.data._id);
        return axios.get(process.env.REACT_APP_API_URL + "/events/" + eventId, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
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

  const deleteEventHandleClickOpen = () => {
    setOpenDeleteModal(true);
  };

  const deleteEventHandleClose = () => {
    setOpenDeleteModal(false);
  };

  return (
    <>
      {!event ? (
        <Box align="center">
          <CircularProgress />
        </Box>
      ) : (
        <div>
          {/* ---------- IMAGE */}
          <Box
            width="100%"
            sx={{
              height: "70vw",
            // background: "linear-gradient(#e66465, #9198e5)",
            background: "lightgrey",
              backgroundImage: `url(${eventImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPositionY: "center",
              borderRadius: 1,
            }}
          />

          <Grid container rowSpacing={3} sx={{ width: "100vw", p: "5%", m: 0 }}>
            {/* ---------- NAME */}
            <Grid item xs={12} sx={{ p: 0, m: 0 }}>
              <Typography
                align="center"
                variant="h4"
                component="div"
                gutterBottom
              >
                {event.name}
              </Typography>
            </Grid>

            {/* ---------- TITLE: INFO */}
            <Grid item xs={12}>
              <Typography
                align="left"
                variant="h6"
                component="div"
                color="secondary"
              >
                Info
              </Typography>
            </Grid>

            {/* ---------- LOCATION & DATE */}
            <Grid item xs={12} sx={{ display: "flex", flexDirection: "row" }}>
              {/* ---------- LOCATION */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  width: "50%",
                }}
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
              </Box>

              {/* ---------- DATE */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ pt: "0.8rem", pr: "1rem", pl: "1rem" }}>
                  <CalendarMonth />
                </Box>
                <Typography variant="h7" component="div" align="left">
                  <p>{formatDate}</p>
                  <p>{formatTime}</p>
                </Typography>
              </Box>
            </Grid>

            {/* ---------- TITLE: PEOPLE */}
            <Grid item xs={12}>
              <Typography
                align="left"
                variant="h6"
                component="div"
                color="secondary"
              >
                People
              </Typography>
            </Grid>

            {/* ---------- PEOPLE */}
            <Grid item xs={12}>
              <GroupedAvatars
                avatars={event.participants}
                organizersArray={organizersArray}
              >
                {" "}
                align="left"
              </GroupedAvatars>
            </Grid>

            {/* ---------- TITLE: ACTIVITY */}
            <Grid item xs={12}>
              <Typography
                align="left"
                variant="h6"
                component="div"
                color="secondary"
              >
                Activity
              </Typography>
            </Grid>

            {/* ---------- THREADS & POLLS */}
            <Grid item xs={12}>
              <ThreadList />
            </Grid>

            <Grid item xs={12}>
              <PollList />
            </Grid>

            {organizersArray.includes(currentUserId) ? (
              <>
                {/* ---------- EDIT & DELETE BUTTONS */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ width: "49%" }}
                    onClick={() => deleteEventHandleClickOpen()}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ width: "49%" }}
                    startIcon={<EditIcon />}
                    href={`/${eventId}/update-event`}
                  >
                    Edit
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                {/* ---------- CONFIRM & DECLINE BUTTONS */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<Check />}
                    sx={{ width: "49%" }}
                  >
                    Confirm
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<Close />}
                    sx={{ width: "49%" }}
                  >
                    Decline
                  </Button>
                </Grid>
              </>
            )}

            {/* ---------- BOTTOM SPACE */}
            <Grid item xs={12} height={60}></Grid>
          </Grid>
        </div>
      )}

      {openDeleteModal===true &&
      <DeleteDialog open={openDeleteModal} callBackToClose={deleteEventHandleClose} callBackToDelete={deleteEvent} type='deleteEvent'/>
      }

    </>
  );
}

export default EventDetailsPage;
