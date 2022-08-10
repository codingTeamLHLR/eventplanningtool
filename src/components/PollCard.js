import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Poll({ pollId }) {
  const [rerender, setRerender] = useState(false);
  const [poll, setPoll] = useState(null);
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
          process.env.REACT_APP_API_URL + "/events/:eventId/polls/" + pollId,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
      })
      .then((response) => {
        setPoll(response.data);
        setRerender(false);
      });
  }, [storedToken, pollId, rerender]);


  
  const handleVote = (optionId, currentVotes) => {
    console.log(optionId)
    const newVotes = currentVotes + 1
    console.log(newVotes)

    const requestBody = {optionId, newVotes, userId}

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

  return (
    <>
      {!poll ? (
        <></>
      ) : (
        <Card>
          <CardContent>
            <>
              <h3>{poll.title}</h3>
              {poll.options.map((option) => {
                return (
                  <div key={option._id}>
                <p>{option.name} - votes: {option.votes}</p>
                <Button onClick={() => handleVote(option._id, option.votes)}>
                  vote
                  </Button>
                </div>
                )
              })}
            </>
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
export default Poll;
