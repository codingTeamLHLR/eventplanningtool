import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import  Poll  from "./Poll";
import axios from "axios";
import CreatePoll from "./CreatePoll";



export default function PollList(props) {
  const [openPoll, setOpenPoll] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [polls, setPolls] = React.useState(null);

  const storedToken = localStorage.getItem("authToken");

  React.useEffect(() => {
      axios
      .get(process.env.REACT_APP_API_URL + "/polls", {
          headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => setPolls(response.data))
      .catch(error => console.log(error))

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
      {/* <CardMedia

      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Polls
        </Typography>
        {!polls
        ? <p>no active polls</p>
        : <>
        {polls.map((poll) => {
          return(
          <Button variant="text" onClick={handleClickOpenPoll} key={poll._id}>
            <Poll open={openPoll} handleClosePoll={handleClosePoll}/>
            {poll.title}
          </Button>
          )
        })}
        </>
        }
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleClickOpenCreate}>
          Start new poll
        </Button>
        <CreatePoll open={openCreate} handleCloseCreate={handleCloseCreate}/>

      </CardActions>
    </Card>
  );
}
