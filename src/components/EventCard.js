import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Moment from "moment";
import Link from "@mui/material/Link";
import ShowImage from "../functions/ShowImage";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import badgeAccepted from "../images/badge-accepted.png"
import badgeDeclined from "../images/badge-declined.png"
import defaultEventPicture from "../images/default-event-picture.jpg"

export default function EventCard(props) {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUsersStatus, setCurrentUsersStatus] = useState("pending");

  let formatDate;
  if (props.data.date) {
    formatDate = Moment(props.data.date).format("MMM Do YY");
  } else {
    formatDate = "Date tbd.";
  }

  const imageUrl = ShowImage(props.data.image);
  let eventImage;
  if (props.data.image) {
    eventImage = imageUrl;
  } else {
    eventImage = defaultEventPicture;
  }

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/verify", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCurrentUserId(response.data._id);
        setCurrentUsersStatus(
          props.data.participants.find(
            (element) => element.user === currentUserId
          ).status
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUserId, storedToken, props.data.participants]);


    const StatusIcon = styled(Avatar)(({ theme }) => ({
      width: 15,
      height: 15,
    }));

  return (
    <Link underline="none" href={`./events/${props.data._id}`}>
      <Card
        sx={{
          maxHeight: "110px",
          mb: 2,
          display: "flex",
          flexDirection: "row",
          backgroundColor: "transparent",
          color: "primary",
          borderRadius: 0,
        }}
        elevation={3}
      >
        <CardMedia
          component="img"
          sx={{ width: "58%", borderRadius: "5px" }}
          image={eventImage}
          alt="green iguana"
        />
        <CardContent sx={{ backgroundColor: "none" }}>
          <Box sx={{ display: "flex", flexDirection: "column", mt: -1, p: 0 }}>
            <Typography
              variant="body2"
              align="left"
              sx={{ color: "#f7aa0f", fontSize: "13px" }}
            >
              {formatDate}
            </Typography>

            <Typography gutterBottom variant="h7" component="div" align="left">
              {props.data.name}
            </Typography>

        <Box sx={{fontSize: "11px", display: "flex", flexDirection: "row", flexWrap: "wrap"}}> 
            by &nbsp; {props.data.organizers.map( (element, index) => {
              return(
                <Box key={index} sx={{display: "flex", flexDirection: "row"}}>
                  {index>0 &&  <span> and &nbsp; </span>}
                  <span style={{fontSize: "11px", whiteSpace: "nowrap"}}>{element.username} &nbsp; </span>
                </Box>
              )
            })}
        </Box>

        <Box sx={{fontSize: "11px", mt: 1}}>

        {currentUsersStatus==='accepted' &&
          <Box sx={{display: "flex"}}>
            <Typography sx={{fontSize: "11px", whiteSpace: "nowrap"}}>you have accepted</Typography>
            <StatusIcon src={badgeAccepted} sx={{ml: 1}}/>
          </Box>

        }

        {currentUsersStatus==='declined' &&
          <Box sx={{display: "flex"}}>
            <Typography sx={{fontSize: "11px", whiteSpace: "nowrap"}}>you have declined</Typography>
            <StatusIcon src={badgeDeclined} sx={{ml: 1}}/>
          </Box>
        }
        </Box>

      </Box>
      </CardContent>
    </Card>

    </Link>
  );
}
