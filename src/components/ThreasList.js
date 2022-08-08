import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function ThreadList(props) {
  return (
    <Card>
      {/* <CardMedia

      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Thread Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ....
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link
            underline="hover"
            // href={}
          >
            See Thread
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
