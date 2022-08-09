import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteDialog(props) {

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}

      <Dialog
        open={props.open}
        onClose={props.callBackToClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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


        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
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