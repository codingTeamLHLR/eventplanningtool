import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Poll from "./Poll";
import axios from "axios";
import CreatePoll from "./CreatePoll";
import { List, ListItem, ListItemText } from "@mui/material";

export default function PollList(props) {
  const [openPoll, setOpenPoll] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [polls, setPolls] = React.useState(null);

  const storedToken = localStorage.getItem("authToken");

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/events/:eventId/polls", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setPolls(response.data))
      .catch((error) => console.log(error));
  }, [storedToken]);

  const handleClickOpenPoll = () => {
    setOpenPoll(true);
  };
  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleClosePoll = () => {
    setOpenPoll(false);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Polls
        </Typography>
        {!polls ? (
          <p>no active polls</p>
        ) : (
          <List dense={true}>
            {polls.map((poll) => {
              return (
                <ListItem
                  key={poll._id}
                  secondaryAction={
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleClickOpenPoll}
                      >
                        vote
                      </Button>
                      {/* <Poll open={openPoll} id={poll._id} handleClosePoll={handleClosePoll} /> */}
                    </>
                  }
                >
                  <ListItemText primary={poll.title} secondary={poll.status} />
                </ListItem>
              );
            })}
          </List>
        )}
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleClickOpenCreate}>
          Start new poll
        </Button>
        <CreatePoll open={openCreate} handleCloseCreate={handleCloseCreate} />
      </CardActions>
    </Card>
  );
}
