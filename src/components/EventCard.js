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

    <Card sx={{mb: 2}} elevation={3}>
      <CardMedia
        component="img"
        height="140"
        image={eventImage}
        alt="green iguana"
      />
      <CardContent>
      <Box sx={{display:"flex", flexDirection: "row", justifyContent:"flex-start", alignSelf:"flex-end"}}>

        <Typography gutterBottom variant="h5" component="div">
          {props.data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDate}
        </Typography>
      </Box>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button> */}
        {/* <Button size="small">
          <Link underline="hover" href={`./${props.data._id}`}>
            Learn more
          </Link>
        </Button> */}
      </CardActions>
    </Card>

    </Link>
  );
}
