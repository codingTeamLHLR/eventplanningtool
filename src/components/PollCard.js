import { Button, Card, CardContent, CardHeader, Grid, IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import PollChart from "./PollChart";

export default function Poll({ pollId }) {
  const [rerender, setRerender] = useState(false);
  const [poll, setPoll] = useState(null);
  const [userId, setUserId] = useState(null);
  const [voted, setVoted] = useState(null);

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
        setVoted(
          response.data.participants.find((element) => element.user === userId)
            .voted
        );
      })
      .then()
      .catch((error) => {
        console.log(error);
      });
  }, [storedToken, pollId, rerender, userId, voted]);

  const handleVote = (optionId, currentVotes) => {
    const newVotes = currentVotes + 1;

    const requestBody = { optionId, newVotes, voted: true };

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

  return (
    <>
      {!poll ? (
        <></>
      ) : (
        <Card sx={{ background: "#252a42" }}>
          <CardHeader
            titleTypographyProps={{align: "left"}}
            subheaderTypographyProps={{align: "left"}}
            title={poll.title}
            subheader={poll.description}
            action=
            {
              <>
                {poll.owner === userId && (
                  <>
                    {poll.owner ? (
                      <>
                        <Tooltip title={"change status"} placement="bottom">
                          <Button
                            variant="outlined"
                            size="small"
                            color={
                              poll.status === "active" ? "success" : "error"
                            }
                            onClick={changeStatus}
                            sx={{ height: "22px", mr: "20px"}}
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
                        sx={{ height: "22px", cursor: "default" }}
                      >
                        {poll.status}
                      </Button>
                    )}
                  </>
                )}
              </>
            }
          />

          <CardContent>
            <>
              {!voted && poll.status === "active" && (
                <Grid container xs={12} spacing={1} sx={{mb: "10px"}}>
                  {poll.options.map((option) => {
                    return (
                      <Grid item key={option._id}>
                        <Button
                          variant="outlined"
                          sx={{height: "22px"}}
                          size="small"
                          onClick={() => {
                            setVoted(true);
                            handleVote(option._id, option.votes);
                          }}
                        >
                          {option.name}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              )}

              <PollChart pollOptions={poll.options} />
            </>
          </CardContent>
        </Card>
      )}
    </>
  );
}
