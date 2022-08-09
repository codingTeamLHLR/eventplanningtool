import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from "react-router-dom";

function Poll(props) {  

    const { pollId } = useParams();

    const [voteData, setVoteData] = useState();
    const [totalVotes, setTotalVotes] = useState(0);
    const [voted, setVoted] = useState(false);
    const [currentUserId, setCurrentUserId] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
        axios
        .get(process.env.REACT_APP_API_URL + "/verify", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setCurrentUserId(response.data._id);
          return axios.get(process.env.REACT_APP_API_URL + "/polls/" + pollId, {
            headers: { Authorization: `Bearer ${storedToken}` }});
        })
        .then((response) => response.json())
        .then((data) => {
          setVoteData(data);
          let sum = 0;
          data.forEach(function (obj) {
            sum += obj.votes;
          });
          setTotalVotes(sum);
        });
    }, [storedToken]);

    const submitVote = (e) => {
        if(voted === false) {
          const voteSelected = e.target.dataset.id;
          const voteCurrent = voteData[voteSelected].votes;
          voteData[voteSelected].votes = voteCurrent + 1;
          setTotalVotes(totalVotes + 1);
          setVoted(!voted);
          const options = {
            method: "POST",
            body: JSON.stringify(voteData),
            headers: { "Content-Type": "application/json" },
          };
          axios.get(process.env.REACT_APP_API_URL + "/polls/" + pollId, {
            headers: { Authorization: `Bearer ${storedToken}` }})
            .then((res) => res.json())
            .then((res) => console.log(res));
        }
      };

      let pollOptions;
if (voteData) {
  pollOptions = voteData.map((item) => {
    return (
      <li key={item.id}>
        <button onClick={submitVote} data-id={item.id}>
          {item.option}
          <span>- {item.votes} Votes</span>
        </button>          
      </li>
    );
  });
}

return(
<>
{/* <div className="poll">
    <h1>Which option do you like the best?</h1>
    <ul className={voted ? "results" : "options"}>
      {pollOptions}
    </ul>
    <p>Total Votes: {totalVotes}</p>
</div> */}

<div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>

</>

);


}
export default Poll;