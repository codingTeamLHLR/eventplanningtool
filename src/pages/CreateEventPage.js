import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import PeopleSelector from '../components/PeopleSelector';

function CreateEventPage() {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const [participants, setParticipants] = useState([]);
    const [image, setImage] = useState("");
    const [organizers, setOrganizers] = useState([]);

    // console.log('participants are', participants)
    // console.log('organizers are', organizers)

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
            image,
            participants,
            organizers
        }

        const storedToken = localStorage.getItem("authToken");

        axios.post(process.env.REACT_APP_API_URL + '/events', requestBody, { headers: { Authorization: `Bearer ${storedToken}` }})
        .then((response) => {
          console.log("post request is", response);
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
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
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
            name="time"
            label="Time"
            InputLabelProps={{ shrink: true }}
            type="time"
            id="time"
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

            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image"
              type="file"
              name="image"
              value={image}
              onChange={(target) => setImage(target.value)}
            />
            <label htmlFor="image">
              <Button variant="raised" component="span">
                Upload Image
              </Button>
            </label> 

            <p>
                {errorMessage}
            </p>
            <PeopleSelector type='invites' getPeopleCallback={setParticipants} />
        
            <PeopleSelector type='organizers' getPeopleCallback={setOrganizers} participants={participants}/>

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