import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloudinaryWidget from "../components/CloudinaryWidget";
import { CircularProgress, FormLabel } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function EditUserProfilePage() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [image, setImage] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/verify", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUserId(response.data._id);
        return axios.get(
          process.env.REACT_APP_API_URL + "/users/" + response.data._id,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
      })
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [storedToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log("user", userDetails);

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    // const data = new FormData(event.currentTarget);

    const requestBody = {
      // email:
      // password:
      username: userDetails.username,
      birthdate: userDetails.birthdate,
      image,
    };

    console.log(requestBody);

    axios
      .put(process.env.REACT_APP_API_URL + "/users/" + userId, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("put request is", response);
        navigate("/");
      })
      .catch((error) => {
        // console.log("this is error object", error);
        const errorDescription = error.response.data.errorMessage;
        setError(true);
        setErrorMessage(errorDescription);
        console.log("this is error", errorDescription);
      });
  };


  return (
    <>
      {!userDetails ? (
        <Box align="center">
          <CircularProgress />
        </Box>
      ) : (

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Update Profile Information
              </Typography>
              <Box
                component="form"
                onSubmit={handleSignupSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              InputLabelProps={{ shrink: true }}
              name="email"
              autoComplete="email"
              autoFocus
              error={error}
              helperText={errorMessage}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              InputLabelProps={{ shrink: true }}
              type="password"
              id="password"
              autoComplete="current-password"
              error={error}
              helperText={errorMessage}
            /> */}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  InputLabelProps={{ shrink: true }}
                  type="string"
                  id="username"
                  autoComplete="username"
                  error={error}
                  helperText={errorMessage}
                  value={userDetails.username}
                  onChange={handleChange}
                />
                {/* 
            <TextField
              margin="normal"
              required
              fullWidth
              name="birthdate"
              label="Birthdate"
              InputLabelProps={{ shrink: true }}
              type="date"
              id="birthdate"
              error={error}
              helperText={errorMessage}
              value={userDetails.birthdate}
              onChange={handleChange}
            /> */}
            
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Birthdate"
                    value={userDetails.birthdate}
                    onChange={handleChange}
                    disableFuture={true}
                    renderInput={(props) => (
                      <TextField
                        sx={{ mt: 1 }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        {...props}
                      />
                    )}
                  />
                </LocalizationProvider>

                <Box sx={{mt:2}}>
                  <FormLabel sx={{fontSize: 12}}>Change Profile Picture</FormLabel>
                  <CloudinaryWidget
                    setImage={setImage}
                    image={userDetails.image}
                    sx={{width:"100%"}}
                  />
                </Box>

                <p>{errorMessage}</p>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          </Container>
      )}
    </>
  );
}

export default EditUserProfilePage;
