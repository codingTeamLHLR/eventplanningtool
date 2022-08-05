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

import InvitesSelector from '../components/InvitesSelector';

function CreateEventPage() {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const [participants, setParticipants] = useState([]);

    const navigate = useNavigate();


    const handleCreateEventSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const requestBody = {
            name: data.get('name'),
            date: data.get('date'),
            location: {
                street: data.get('street'),
                housenumber: data.get('housenumber'),
                citycode: data.get('citycode'),
                city: data.get('city'),
                country: data.get('country')
            },
            participants,
            // organizers: data.get('organizers')
        }

        const storedToken = localStorage.getItem("authToken");

        console.log(requestBody)

        axios.post(process.env.REACT_APP_API_URL + '/events', requestBody, { headers: { Authorization: `Bearer ${storedToken}` }})
        .then((response) => {
          // console.log(response);
          navigate('/');
        })
        .catch((error) => {
          const errorDescription = error.response.data.errorMessage;
          setError(true);
          setErrorMessage(errorDescription);
          console.log(errorDescription);
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
          <Box component="form" onSubmit={handleCreateEventSubmit} noValidate sx={{ mt: 1 }}>
          
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
            type="number"
            id="street"
            />

            <TextField
            margin="normal"
            fullWidth
            name="citycode"
            label="Citycode"
            InputLabelProps={{ shrink: true }}
            type="number"
            id="street"
            />

            <TextField
            margin="normal"
            fullWidth
            name="city"
            label="City"
            InputLabelProps={{ shrink: true }}
            id="city"
            />

            <TextField
            margin="normal"
            fullWidth
            name="country"
            label="Country"
            InputLabelProps={{ shrink: true }}
            id="country"
            />

            <InvitesSelector getParticipantsCallback={setParticipants}/>

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
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>

    </>
    )
}

export default CreateEventPage;