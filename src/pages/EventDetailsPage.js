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
import Poll from "../components/Polls";
import CircularProgress from "@mui/material/CircularProgress";

import { CalendarMonth, Place } from "@mui/icons-material";
import GroupedAvatars from "../components/GroupedAvatars";
import DeleteDialog from "../components/DeleteDialog";
import defaultEventPicture from "../images/default-event-picture.jpg"

function EventDetailsPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [eventImage, setEventImage] = useState(null);
  const [formatDate, setFormatDate] = useState("");
  const [formatTime, setFormatTime] = useState("");
  const [organizersArray, setOrganizersArray] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUsersStatus, setCurrentUsersStatus] = useState("pending");

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
        if(response.data.image) {

          const imageUrl = ShowImage(response.data.image);
          setEventImage(imageUrl);
        }
        else {
          
        }
        setFormatDate(Moment(response.data.date).format("MMM Do YY"));
        setFormatTime(Moment(response.data.date).format("h:mm A"));
        setOrganizersArray(
          response.data.organizers.map((element) => element._id)
        );
        return response.data.participants.find(
          (element) => element.user._id === currentUserId
        );
      })
      .then((userInStatusArray) => {
        if (userInStatusArray.status === "accepted") {
          setCurrentUsersStatus("accepted");
        }
        if (userInStatusArray.status === "declined") {
          setCurrentUsersStatus("declined");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [eventId, storedToken, currentUserId]);

  const deleteEvent = () => {
    axios
      .delete(process.env.REACT_APP_API_URL + "/events/" + eventId, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/events");
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

  const statusEventHandle = (arg) => {
    let requestBody;
    if (arg === "accept") {
      requestBody = { status: "accepted" };
    }
    if (arg === "decline") {
      requestBody = { status: "declined" };
    }

    console.log("resquestBody", requestBody);
    axios
      .put(
        process.env.REACT_APP_API_URL + "/events/" + eventId + "/status",
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        if (arg === "accept") {
          setCurrentUsersStatus("accepted");
        } else {
          setCurrentUsersStatus("declined");
          // console.log(currentUsersStatus)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {!event ? (
        <></>
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
            }}
          />

          <Grid
            container
            rowSpacing={3}
            sx={{ width: "100vw", p: "5%", pt: 0, m: 0, color: "text.primary" }}
          >
            {/* ---------- NAME */}
            <Grid item xs={12}>
              <Typography align="center" variant="h4" component="div">
                {event.name}
              </Typography>
            </Grid>

            {!organizersArray.includes(currentUserId) && (
              <>
                {/* ---------- CONFIRM & DECLINE BUTTONS  */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {currentUsersStatus === "accepted" ? (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => {
                          statusEventHandle("accept");
                        }}
                        startIcon={<Check />}
                        sx={{ width: "49%", opacity: "0.5" }}
                      >
                        Accept
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() => {
                          statusEventHandle("decline");
                        }}
                        startIcon={<Close />}
                        sx={{ width: "49%" }}
                      >
                        Decline
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => {
                          statusEventHandle("accept");
                        }}
                        startIcon={<Check />}
                        sx={{ width: "49%" }}
                      >
                        Accept
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() => {
                          statusEventHandle("decline");
                        }}
                        startIcon={<Close />}
                        sx={{ width: "49%", opacity: "0.5" }}
                      >
                        Decline
                      </Button>
                    </>
                  )}
                </Grid>
              </>
            )}

            {/* ---------- TITLE: INFO */}
            <Grid item xs={12}>
              <Typography
                align="left"
                variant="h6"
                component="div"
                color="secondary"
                sx={{ mb: -2 }}
              >
                Info
              </Typography>
            </Grid>

            {/* ---------- LOCATION & DATE */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                fontSize: 12,
                lineHeight: 0.8,
              }}
            >
              {/* ---------- LOCATION */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  width: "50%",
                }}
              >
                <Box sx={{ pt: "0.2rem", pr: "1rem" }}>
                  <Place />
                </Box>
                <Typography variant="h7" component="div" align="left">
                  {event.location.street && event.location.housenumber ? (
                    <>
                      <p>
                        <span>{event.location.street} </span>
                        <span>{event.location.housenumber} </span>
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
                <Box sx={{ pt: "0.2rem", pr: "1rem", pl: "1rem" }}>
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
                sx={{ mb: -2 }}
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
                sx={{ mb: -2 }}
              >
                Polls
              </Typography>
            </Grid>

            {/* ---------- POLLS */}
            <Grid item xs={12}>
              <Poll
                eventId={event._id}
                participants={event.participants.map(
                  (element) => element.user._id
                )}
              />
            </Grid>

            {organizersArray.includes(currentUserId) && (
              <>
                {/* ---------- EDIT & DELETE BUTTONS */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTop: "1px solid #f7aa0f",
                    mt: 3,
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
            )}

            {/* ---------- BOTTOM SPACE */}
            <Grid item xs={12} height={60}></Grid>
          </Grid>
        </div>
      )}

      {openDeleteModal === true && (
        <DeleteDialog
          open={openDeleteModal}
          callBackToClose={deleteEventHandleClose}
          callBackToDelete={deleteEvent}
          type="deleteEvent"
        />
      )}
    </>
  );
}

export default EventDetailsPage;
