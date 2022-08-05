import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Moment from 'moment';
import Link from '@mui/material/Link';


export default function EventCard(props) {

  const formatDate = Moment(props.data.date).format("MMM Do YY");

  // console.log(props.data.date)

  return (
    <Card >
      <CardMedia
        component="img"
        height="140"
        image="https://www.tagesspiegel.de/images/feiern-unter-freiem-himmel-sind-parks-die-neuen-clubs/26047962/1-format6001.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDate}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button> */}
        <Button size="small">
          <Link
            underline="hover"
            href={`./${props.data._id}`}
          >
            Learn more
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}