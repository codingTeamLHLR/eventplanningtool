import { useState, useEffect } from "react";
import axios from "axios";
import { useParams  } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import BackgroundLetterAvatars from '../functions/BackgroundLetterAvatars'
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


function EventDetailsPage() {

    const { eventId } = useParams();
    const [ event, setEvent ] = useState(null);

    useEffect(() => {

        const storedToken = localStorage.getItem("authToken");

        axios
            .get(process.env.REACT_APP_API_URL + '/events/' + eventId, { headers: { Authorization: `Bearer ${storedToken}` }} )
            .then( response => {
                setEvent(response.data)
                console.log(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return(
        <>
            {!event
            ? <p>..loading</p>
            : <>
                <h1>{event.name}</h1>
                <Grid container  sx={{ p: 2}}>
                      <img src="https://www.tagesspiegel.de/images/feiern-unter-freiem-himmel-sind-parks-die-neuen-clubs/26047962/1-format6001.jpg" alt=""/>
                </Grid>
                

                {event.location.street && event.location.housenumber
                ? <div>
                    <p>{event.location.street}{event.location.housenumber}</p>
                    <p>{event.location.citycode}, {event.location.city}</p>
                    <p>{event.location.country}</p>
                 </div>
                :<p>TBD</p>
                }

                {event.date
                ?<p>{event.date}</p>
                :<p>TBD</p>
                }

                {event.participants.map((participant) => {
                    return (
                    <div key={participant._id}>
                        <h3>Guests</h3>
                        <Stack direction="row" spacing={2}>
                            {participant.image
                            ?<Avatar alt={participant.username} src={participant.image}/>
                            :<p>{participant.username}</p>
                            } 
                        </Stack>
                    </div>
                    )
                })}
            </>
            }
        </>

    )
}

export default EventDetailsPage;