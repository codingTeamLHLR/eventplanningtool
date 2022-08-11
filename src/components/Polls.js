import {useState, useEffect} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PollCard from "./PollCard";
import axios from "axios";
import CreatePoll from "./CreatePoll";
import { Card, Grid } from "@mui/material";

export default function PollList(props) {
  const [open, setOpen] = useState(false);
  const [polls, setPolls] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [userId, setUserId] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/verify", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUserId(response.data._id);
        return axios.get(
          process.env.REACT_APP_API_URL + "/events/:eventId/polls",
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
      })
      .then((response) => {
        setPolls(response.data);
        setRerender(false);
      })
      .catch((error) => console.log(error));
  }, [storedToken, rerender]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRerender(true);
  };

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Polls
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} elevation={4}>
          <Card>
            <Button variant="text" onClick={handleClickOpen}>
              Start new poll
            </Button>
            <CreatePoll
              open={open}
              handleClose={handleClose}
              participants={props.participants}
            />
          </Card>
        </Grid>
        <>
          {!polls ? (
            <Grid item xs={12} elevation={4}>
              <Card>
                <h3>no active polls</h3>
              </Card>
            </Grid>
          ) : (
            <>
              {polls.map((poll) => {
                if (poll.event === props.eventId) {
                  return (
                    <Grid item xs={12} elevation={4} key={poll._id}>
                      <PollCard pollId={poll._id} />
                    </Grid>
                  );
                }
              })}
            </>
          )}
        </>
      </Grid>
    </>
  );
}
