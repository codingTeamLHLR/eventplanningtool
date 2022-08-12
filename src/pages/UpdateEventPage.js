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
import Typography from "@mui/material/Typography";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";

function UpdateEventPage() {
  const { eventId } = useParams();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const [participants, setParticipants] = useState([]);
  const [image, setImage] = useState("");
  const [organizers, setOrganizers] = useState([]);
  const [event, setEvent] = useState({});
  const [userId, setUserId] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/events/" + eventId, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setEvent(response.data);
        setImage(response.data.image);
        setParticipants(
          response.data.participants.map((element) => element.user._id)
        );
        setOrganizers(response.data.organizers.map((element) => element._id));
      })
      .catch((error) => {
        console.log(error);
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
        <></>
      ) : (
        <>
        <Typography component="h1" variant="h5" sx={{color: "text.primary", mt:"20px"}}>Update Event</Typography>

          <Container component="main" maxWidth="xs" sx={{color: "text.primary", mt:"20px"}}>

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
                  sx={{ backgroundColor: "#252a42", borderRadius: "10px", mt: 1 }}
                  value={event.name}
                  onChange={handleChange}
                />

                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDateTimePicker
                    renderInput={(props) => (
                      <TextField
                      sx={{
                      backgroundColor: "#252a42",
                      borderRadius: "10px",
                      mt: 2,
                      mb: 1
                    }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...props}
                  />
                    )}
                    PaperProps={{
                      sx: { 
                        ml: 1.8,
                        backgroundColor: "#252a42" , 
                        "& .css-23vv5s-MuiButtonBase-root-MuiPickersDay-root": {background: "none"}, 
                        "& .css-lm85tx-MuiButtonBase-root-MuiPickersDay-root": {background: "none"}, 
                        "& .css-1khl9uc-MuiButtonBase-root-MuiIconButton-root": {color: "white"},
                        "& .css-173nj1u-MuiButtonBase-root-MuiIconButton-root": {color: "white"}, 
                        "& .css-1ae9t7h-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button": {color: "white"}, 
                        "& .css-jro82b-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button": {color: "white"},
                        "& .css-7kykdr-MuiButtonBase-root-MuiIconButton-root": {color: "white"},
                        "& .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root": {color: "white"},
                        },
                    }}
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
                  sx={{ backgroundColor: "#252a42", borderRadius: "10px" }}
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
                  sx={{ backgroundColor: "#252a42", borderRadius: "10px" }}
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
                  sx={{ backgroundColor: "#252a42", borderRadius: "10px" }}
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
                  sx={{ backgroundColor: "#252a42", borderRadius: "10px" }}
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
                  sx={{ backgroundColor: "#252a42", borderRadius: "10px" }}
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
                  sx={{ mt: 3, mb: 2, textDecoration: "underline" }}
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
