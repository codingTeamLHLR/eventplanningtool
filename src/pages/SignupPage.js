import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";
import CloudinaryWidget from "../components/CloudinaryWidget";

import { FormLabel } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function SignupPage() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [image, setImage] = useState("");
  const [birthdate, setBirthdate] = useState(null);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const requestBody = {
      email: data.get("email"),
      password: data.get("password"),
      username: data.get("username"),
      birthdate,
      image,
    };

    console.log(requestBody);

    axios
      .post(process.env.REACT_APP_API_URL + "/signup", requestBody)
      .then((response) => {
        // console.log('JWT token', response.data.authToken );
        storeToken(response.data.authToken);
        authenticateUser();
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

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSignupSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
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
            />

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
            />

            {/* <TextField
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
            /> */}

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Birthdate"
                value={birthdate}
                disableFuture={true}
                onChange={(newValue) => {
                  setBirthdate(newValue);
                }}
                renderInput={(props) => (
                  <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...props}
                  />
                )}
              />
            </LocalizationProvider>

            <FormLabel>Upload Profile Picture</FormLabel>
            <CloudinaryWidget setImage={setImage} />

            <p>{errorMessage}</p>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignupPage;
