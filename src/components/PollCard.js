import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import PollChart from "./PollChart";

export default function Poll({ pollId }) {
  const [rerender, setRerender] = useState(false);
  const [poll, setPoll] = useState(null);
  const [userId, setUserId] = useState(null);
  // const [voted, setVoted] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/verify", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUserId(response.data._id);
        return axios.get(
          process.env.REACT_APP_API_URL + "/events/:eventId/polls/" + pollId,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
      })
      .then((response) => {
        setPoll(response.data);
        setRerender(false);
        console.log(
          response.data.participants.find((element) => element.user === userId)
        );
        // setVoted(
        //   response.data.participants.find((element) => element.user === userId).voted);
      });
  }, [storedToken, pollId, rerender, userId]);

  const handleVote = (optionId, currentVotes) => {
    const newVotes = currentVotes + 1;
    const voted= true;

    const requestBody = { optionId, newVotes, voted };

    axios
      .put(
        process.env.REACT_APP_API_URL + "/events/:eventId/polls/" + pollId,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        setRerender(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeStatus = () => {
    let requestBody;
    if (poll.status === "active") {
      requestBody = { status: "closed" };
    }
    if (poll.status === "closed") {
      requestBody = { status: "active" };
    }

    axios
      .put(
        process.env.REACT_APP_API_URL + "/events/:eventId/polls/" + pollId,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        setRerender(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePoll = () => {
    axios
      .delete(
        process.env.REACT_APP_API_URL + "/events/:eventId/polls/" + pollId,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        setRerender(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //SHOW TOTAL VOTES ??? + num participants? ---- show participants?
  return (
    <>
      {!poll ? (
        <></>
      ) : (
        <Card sx={{background: "#252a42"}}>
          <CardContent>
            <Typography variant="h6">{poll.title}</Typography>
            <Typography variant="p">{poll.description}</Typography>

            {console.log(poll.participants.find((element) => element.user === userId).voted)}
            {!poll.participants.find((element) => element.user === userId).voted && 
              <>
                {poll.options.map((option) => {
                  return (
                    <div key={option._id}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleVote(option._id, option.votes)}
                      >
                        {option.name}
                      </Button>
                    </div>
                  );
                })}
              </>
              }
              {poll.status === "closed" && <p>poll closed</p>}             
              {poll.participants.find((element) => element.user === userId).vote && <p>already voted</p>}
          

            <PollChart pollOptions={poll.options} />

          </CardContent>
          <CardActions>
            <>
              {poll.owner === userId && (
                <>
                  {poll.owner ? (
                    <>
                      <Tooltip title={"change status"} placement="bottom">
                        <Button
                          variant="outlined"
                          size="small"
                          color={poll.status === "active" ? "success" : "error"}
                          onClick={changeStatus}
                          sx={{height: "22px"}}
                        >
                          {poll.status}
                        </Button>
                      </Tooltip>
                      <Tooltip title="delete poll" placement="bottom">
                        <IconButton
                          color="primary"
                          aria-label="delete"
                          onClick={deletePoll}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <Button
                      variant="text"
                      size="small"
                      color={poll.status === "active" ? "success" : "error"}
                      sx={{ cursor: "default" }}
                    >
                      {poll.status}
                    </Button>
                  )}
                </>
              )}
            </>
          </CardActions>
        </Card>
      )}
    </>
  );
}
