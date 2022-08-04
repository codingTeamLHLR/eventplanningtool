import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from '../components/EventCard'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, MenuList } from "@mui/material";




function HomePage() {

    const [events, setEvents] = useState([])

    useEffect(() => {

        const storedToken = localStorage.getItem("authToken");

        axios
            .get(process.env.REACT_APP_API_URL + '/events', { headers: { Authorization: `Bearer ${storedToken}` }} )
            .then( response => {
                console.log(response.data);
                setEvents(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    return (
        <>
        <h1>Home Page - See all Events</h1>

        <Grid container spacing={2} sx={{ p: 2}}>
            {events.length === 0
                ?   <p>loading...</p>
                :   <>
                        <Grid item xs={12} >
                            {events.map(element => {
                                return(<EventCard data={element}/>)
                            })
                            } 
                        </Grid>
                    </>
            }
        </Grid>

        <Button>Create Event</Button>
        </>
    )
}

export default HomePage;