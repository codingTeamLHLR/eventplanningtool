import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteDialog(props) {

  return (
    <div>

      <Dialog
        open={props.open}
        onClose={props.callBackToClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {backgroundColor: "#252a42"}
        }}
      >

        {props.type==='deleteEvent' &&
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to delete this event?"}
        </DialogTitle>
        }

        {props.type==='deleteUser' &&
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to delete your account?"}
        </DialogTitle>
        }

        <DialogActions>
          <Button 
            variant="contained"
            onClick={props.callBackToClose}
          >
          No
          </Button>
          <Button 
            variant="contained"
            color="error"
            onClick={props.callBackToDelete} 
            autoFocus
          >
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}