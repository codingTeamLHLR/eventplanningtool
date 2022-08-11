import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Moment from "moment";
import Link from "@mui/material/Link";
import ShowImage from "../functions/ShowImage";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import { Avatar } from "@mui/material";
import badgeAccepted from "../images/badge-accepted.png"
import badgeDeclined from "../images/badge-declined.png"
import defaultEventPicture from "../images/default-event-picture.jpg"


export default function EventCard(props) {

  console.log(props)

  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUsersStatus, setCurrentUsersStatus] = useState("pending")

  let formatDate;
  if (props.data.date) {
    formatDate = Moment(props.data.date).format("MMM Do YY");
  } else {
    formatDate = "TBD";
  }

  const imageUrl = ShowImage(props.data.image);
  let eventImage;
  if (props.data.image) {
    eventImage = imageUrl;
  } else {
    eventImage =
      defaultEventPicture;
  }

  // const SmallAvatar = styled(Avatar)(({ theme }) => ({
  //   width: 15,
  //   height: 15,
  //   border: `2px solid ${theme.palette.background.paper}`,
  // }));

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/verify", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCurrentUserId(response.data._id);
        setCurrentUsersStatus(props.data.participants.find(element => element.user==currentUserId).status)
      })
      .catch((err) => {
        console.log(err);
      });
    }, [currentUserId])


    const StatusIcon = styled(Avatar)(({ theme }) => ({
      width: 15,
      height: 15,
      // border: `1px solid ${theme.palette.background.paper}`,
    }));


console.log(currentUsersStatus)

  return (
    <Link underline="none" href={`./${props.data._id}`}>

    <Card  sx={{maxHeight: "110px", mb: 2, display: "flex", flexDirection: "row", backgroundColor:"transparent", color:"primary", borderRadius: 0}} elevation={3} >
      <CardMedia
        component="img"
        sx ={{width: "58%", borderRadius: "5px"}}
        image={eventImage}
        alt="green iguana"
      />
      <CardContent sx={{backgroundColor: "none"}}>
      <Box sx={{display:"flex", flexDirection: "column"}}>

        <Typography variant="body2" align="left" sx={{color:"#f7aa0f", fontSize: "13px"}}>
          {formatDate}
        </Typography>

        <Typography gutterBottom variant="h6" component="div" align="left">
          {props.data.name}
        </Typography>

        <Typography sx={{fontSize: "11px", mt: -1}}> 
          <Box sx={{display: "flex"}}>
            by &nbsp; {props.data.organizers.map( (element, index) => {
              return(
                <>
                  {index>0 &&  <span> and &nbsp; </span>}
                  <span>{element.username} &nbsp; </span>
                </>
              )
            })}
          </Box>
        </Typography>
        


        <Typography sx={{fontSize: "11px", mt: 1}}>

        {currentUsersStatus==='accepted' &&
          <Box sx={{display: "flex"}}>
            <span>you have accepted</span>
            <StatusIcon src={badgeAccepted} sx={{ml: 1}}/>
          </Box>

        }

        {currentUsersStatus==='declined' &&
          <Box sx={{display: "flex"}}>
            <span>you have declined</span>
            <StatusIcon src={badgeDeclined} sx={{ml: 1}}/>
          </Box>
        }
        </Typography>




      </Box>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">
          <Link underline="hover" href={`./${props.data._id}`}>
            Learn more
          </Link>
        </Button>
      </CardActions> */}
    </Card>

    </Link>
  );
}
