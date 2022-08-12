import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { InputAdornment } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import PeopleSelector from "./PeopleSelector";

export default function CreatePoll(props) {
  const { eventId } = useParams();
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const [optionNames, setOptionNames] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [optionInput, setOptionInput] = React.useState("");
  const [voters, setVoters] = React.useState([]);

  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (event) => {
    event.preventDefault();

    const participants = voters;

    const requestBody = {
      title,
      description,
      optionNames,
      participants,
      eventId,
    };

    axios
      .post(
        process.env.REACT_APP_API_URL + "/events/:eventId/polls",
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        props.handleClose();
        setTitle("");
        setDescription("");
        setOptionNames([]);
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setError(true);
        setErrorMessage(errorDescription);
        console.log(errorDescription);
      });
  };

  const handleCancel = () => {
    props.handleClose();
    setTitle("");
    setDescription("");
    setOptionNames([]);
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose} >
      <DialogTitle sx={{ backgroundColor: "#110d26"}}>Start Poll</DialogTitle>
      <DialogContent sx={{ backgroundColor: "#110d26" }}>
        <TextField
          autoFocus
          required
          sx={{ backgroundColor: "#252a42", borderRadius: "10px" }}
          margin="dense"
          id="title"
          label="Title"
          type="string"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          name="title"
          error={error}
          helperText={errorMessage}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <TextField
          autoFocus
          sx={{ backgroundColor: "#252a42", borderRadius: "10px" }}
          margin="dense"
          id="description"
          label="Description"
          type="string"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <PeopleSelector
          name="PollParticipants"
          type="pollParticipants"
          getPeopleCallback={setVoters}
          participants={props.participants}
        />

        <TextField
          autoFocus
          sx={{ backgroundColor: "#252a42", borderRadius: "10px" }}
          margin="dense"
          id="options"
          label="Option"
          type="string"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          name="options"
          value={optionInput}
          onChange={(event) => {
            setOptionInput(event.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Button
                  sx={{ p: "10px" }}
                  aria-label="add"
                  onClick={() => {
                    if (optionInput.length !== 0) {
                      setOptionNames((prevState) => [
                        ...prevState,
                        optionInput,
                      ]);
                      setOptionInput("");
                    }
                  }}
                >
                  Add
                </Button>
              </InputAdornment>
            ),
          }}
        />

        {optionNames.length > 0 &&
          optionNames.map((option, index) => {
            return (
              <div key={index}>
                <Button
                  sx={{ p: "10px" }}
                  aria-label="remove"
                  value={option}
                  onClick={() =>
                    setOptionNames((prevState) =>
                      prevState.filter((element) => element !== option)
                    )
                  }
                >
                  X
                </Button>

                <span>{option}</span>
              </div>
            );
          })}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#110d26" }}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
