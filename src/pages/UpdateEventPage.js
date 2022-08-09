import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import PeopleSelector from "../components/PeopleSelector";
import CloudinaryWidget from "../components/CloudinaryWidget";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CircularProgress } from "@mui/material";

function UpdateEventPage() {
  const { eventId } = useParams();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const [participants, setParticipants] = useState([]);
  const [image, setImage] = useState("");
  const [organizers, setOrganizers] = useState([]);
  const [event, setEvent] = useState({});
  const [userId, setUserId] = useState(null);

  console.log("initial state of participants", participants);

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "/events/" + eventId, {
          headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        setEvent(response.data);
        setImage(response.data.image);
        setParticipants(
          response.data.participants.map((element) => element.user._id)
        );
        setOrganizers(response.data.organizers.map((element) => element._id));
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [eventId, storedToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevState) => ({
      ...prevState,
      location: { ...prevState.location, [name]: value },
    }));
  };

  const handleCreateEventSubmit = (e) => {
    e.preventDefault();

    // const data = new FormData(e.currentTarget);

    console.log("participants", participants);

    const requestBody = {
      name: event.name,
      date: event.date,
      location: {
        street: event.location.street,
        housenumber: event.location.housenumber,
        citycode: event.location.citycode,
        city: event.location.city,
        country: event.location.country,
      },
      image,
      participants,
      organizers,
    };

    axios
      .put(process.env.REACT_APP_API_URL + "/events/" + eventId, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("put request is", response);
        navigate(`/${eventId}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setError(true);
        setErrorMessage(errorDescription);
        console.log(errorDescription);
      });
  };


  return (
    <>
      {!event || !event.location ? (
        <Box align="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <h1>Update Event</h1>

            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Box
                  component="form"
                  onSubmit={handleCreateEventSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                  enctype="multipart/form-data"
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Event Name"
                    InputLabelProps={{ shrink: true }}
                    name="name"
                    autoComplete="name"
                    autoFocus
                    error={error}
                    helperText={errorMessage}
                    value={event.name}
                    onChange={handleChange}
                  />

                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField
                          sx={{ mt: 1 }}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          {...props}
                        />
                      )}
                      disablePast={true}
                      label="Date and Time"
                      value={event.date}
                      onChange={(newValue) => {
                        setEvent((prevState) => ({
                          ...prevState,
                          date: newValue,
                        }));
                      }}
                    />
                  </LocalizationProvider>

                  <TextField
                    margin="normal"
                    fullWidth
                    name="street"
                    label="Street"
                    InputLabelProps={{ shrink: true }}
                    id="street"
                    value={event.location.street}
                    onChange={handleNestedChange}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    name="housenumber"
                    label="Housenumber"
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    id="housenumber"
                    value={event.location.housenumber}
                    onChange={handleNestedChange}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    name="citycode"
                    label="Citycode"
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    id="citycode"
                    value={event.location.citycode}
                    onChange={handleNestedChange}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    name="city"
                    label="City"
                    InputLabelProps={{ shrink: true }}
                    id="city"
                    value={event.location.city}
                    onChange={handleNestedChange}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    name="country"
                    label="Country"
                    InputLabelProps={{ shrink: true }}
                    id="country"
                    value={event.location.country}
                    onChange={handleNestedChange}
                  />

                  <PeopleSelector
                    name="Guests"
                    type="invites"
                    getPeopleCallback={setParticipants}
                    people={participants}
                  />

                  <PeopleSelector
                    name="Organizers"
                    type="organizers"
                    getPeopleCallback={setOrganizers}
                    participants={participants}
                    people={organizers}
                  />

                  <CloudinaryWidget setImage={setImage} image={event.image} />

                  <p>{errorMessage}</p>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    href={`/${eventId}`}
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Back
                  </Button>
                  <Grid container></Grid>
                </Box>
              </Box>
            </Container>
        </>
      )}
    </>
  );
}

export default UpdateEventPage;
