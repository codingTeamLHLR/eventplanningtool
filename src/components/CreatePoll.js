import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, InputBase } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

export default function CreatePoll(props) {
  const [options, setOptions] = React.useState([]);

  const handleSubmit = () => {};
  const handleAddOption = () => {
    setOptions();
  };
  const handleRemoveOption = () => {
    setOptions();
  };

  return (
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Start Poll</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label="Title"
            type="title"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            name="title"
            // error={error}
            // helperText={errorMessage}
          />
          <InputBase
            autoFocus
            required
            sx={{ ml: 1, flex: 1 }}
            placeholder="Add Option"
            inputProps={{ "aria-label": "Add Option" }}
          />
          <IconButton
            sx={{ p: "10px" }}
            aria-label="add"
            onClick={(newOption) => {
                setOptions((prevState) => ({...prevState, newOption}));
              }}
          >
            <AddIcon />
          </IconButton>
          <DialogContentText>
            {options.length > 0 &&
              options.map((option) => {
                return (
                  <>
                    <p>{option}</p>
                    <IconButton
                      sx={{ p: "10px" }}
                      aria-label="add"
                      onClick={handleRemoveOption}
                    >
                      <ClearIcon />
                    </IconButton>
                  </>
                );
              })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Create</Button>
          <Button onClick={() => props.handleCloseCreate()}>Cancel</Button>
        </DialogActions>
      </Dialog>
  );
}
