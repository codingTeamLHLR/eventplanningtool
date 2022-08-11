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

export default function EventCard(props) {
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
