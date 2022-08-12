import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {DesktopDateTimePicker} from '@mui/x-date-pickers/DesktopDateTimePicker';

import PeopleSelector from "../components/PeopleSelector";
import CloudinaryWidget from "../components/CloudinaryWidget";
import { Typography } from "@mui/material";

function CreateEventPage() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const [participants, setParticipants] = useState([]);
  const [image, setImage] = useState("");
  const [organizers, setOrganizers] = useState([]);
  const [time, setTime] = useState(null);

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  const handleCreateEventSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);


    const requestBody = {
      name: data.get("name"),
      date: time,
      location: {
        street: data.get("street"),
        housenumber: data.get("housenumber"),
        citycode: data.get("citycode"),
        city: data.get("city"),
        country: data.get("country"),
      },
      image,
      participants,
      organizers,
    };

    axios
      .post(process.env.REACT_APP_API_URL + "/events", requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/events");
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error.response.data.errorMessage);
        console.log(error.response.data.errorMessage);
      });
    };
    
    return (
      <>
      <Typography component="h1" variant="h5" sx={{color: "text.primary", mt:"20px"}}>Create Event</Typography>

      <Typography sx={{color:"text.primary", fontSize:"12px", mt: 2 }}>{errorMessage}</Typography>  

        <Container maxWidth="xs" sx={{backgroundColor: "none"}}>
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
              // helperText={errorMessage}
              sx={{ backgroundColor: "#252a42", borderRadius: "10px", mt: 1 }}
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
                value={time}
                onChange={(newValue) => {
                  setTime(newValue);
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
              sx={{ backgroundColor: "#252a42", borderRadius: "10px" }}
            />

            <TextField
              margin="normal"
              fullWidth
              name="city"
              label="City"
              InputLabelProps={{ shrink: true }}
              id="city"
              sx={{ backgroundColor: "#252a42", borderRadius: "10px" }}
            />

            <TextField
              margin="normal"
              fullWidth
              name="country"
              label="Country"
              InputLabelProps={{ shrink: true }}
              id="country"
              sx={{ backgroundColor: "#252a42", borderRadius: "10px" }}
            />

            <PeopleSelector
              name="Guests"
              type="invites"
              getPeopleCallback={setParticipants}
            />

            <PeopleSelector
              name="Organizers"
              type="organizers"
              getPeopleCallback={setOrganizers}
              participants={participants}
            />

            <CloudinaryWidget setImage={setImage} />

            <Typography color="error" sx={{mt:3}}>
          {errorMessage}
          </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
            <Button
                  href={`/events`}
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
  );
}

export default CreateEventPage;
