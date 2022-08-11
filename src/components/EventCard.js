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
      "https://www.tagesspiegel.de/images/feiern-unter-freiem-himmel-sind-parks-die-neuen-clubs/26047962/1-format6001.jpg";
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

    <Card sx={{mb: 2, display: "flex", flexDirection: "row", backgroundColor:"transparent", color:"primary", borderRadius: 0}} elevation={3} >
      <CardMedia
        component="img"
        height="100"
        sx ={{width: "45%", borderRadius: "5px"}}
        image={eventImage}
        alt="green iguana"
      />
      <CardContent sx={{backgroundColor: "none"}}>
      <Box sx={{display:"flex", flexDirection: "column"}}>

        <Typography gutterBottom variant="h6" component="div" align="left">
          {props.data.name}
        </Typography>

        <Typography variant="body2" align="left">
          {formatDate}
        </Typography>

        <Typography sx={{fontSize: "11px"}}>

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


        {/* <Typography variant="body2" align="left">
          you have accepted

        </Typography> */}

          {/* invited by {props.data.organizers.map( (element) => {
            return(
              <span>element.</span>
            )
          })} */}
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
