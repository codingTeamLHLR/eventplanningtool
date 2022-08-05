import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context'; 


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { FormControlLabel } from "@mui/material";

function CreateEventPage() {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext); 


    const handleCreateEventSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const requestBody = {
            name: data.get('name'),
            date: data.get('date'),
            location: {
                street: data.get('street'),
                housenumber: data.get('housenumber')
                // citycode: data.get('citycode'),
                // city: data.get('city'),
                // country: data.get('country')
            },
            participants: data.get('participants'),
            // threads: data.get('threads'),
            // polls: data.get('polls'),
            // organizers: data.get('organizers')
        }

        console.log(requestBody)

        axios.post(process.env.REACT_APP_API_URL + '/login', requestBody)
        .then((response) => {
          storeToken(response.data.authToken);  
          authenticateUser();  
          navigate('/');
        })
        .catch((error) => {
          const errorDescription = error.response.data.errorMessage;
          setError(true);
          setErrorMessage(errorDescription);
          console.log("this is error", errorDescription);
        })
    }

    const theme = createTheme();


    return(
        <>

        <h1>Create Event</h1>


    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Event
          </Typography> */}
          <Box component="form" onSubmit={handleCreateEventSubmit} noValidate sx={{ mt: 1 }} enctype="multipart/form-data">
          
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
            />

            <TextField
            margin="normal"
            fullWidth
            name="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            type="date"
            id="date"
            />

            <TextField
            margin="normal"
            fullWidth
            name="street"
            label="Street"
            InputLabelProps={{ shrink: true }}
            id="street"
            />

            <TextField
            margin="normal"
            fullWidth
            name="housenumber"
            label="Housenumber"
            InputLabelProps={{ shrink: true }}
            type="nuhousenumbermber"
            id="street"
            />


            {/* street: data.get('location.street'),
                housenumber: data.get('location.housenumber'),
                citycode: data.get('location.citycode'),
                city: data.get('location.city'),
                country: data.get('location.country') */}
            
            {/* 
            location: data.get('location'),
            participants: data.get('participants'),
            threads: data.get('threads'),
            polls: data.get('polls'),
            organizers: data.get('organizers') 
            */}

            <input type="file" name="event-cover-image" />

            <p>
                {errorMessage}
            </p>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account yet? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>

    </>
    )
}

export default CreateEventPage;