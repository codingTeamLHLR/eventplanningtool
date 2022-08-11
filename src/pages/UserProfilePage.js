import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ShowImage from "../functions/ShowImage";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteDialog from "../components/DeleteDialog";
import OrganizerEventListPage from "../components/OrganizerEventList";

function UserProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/verify", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUserId(response.data._id);
        return axios.get(
          process.env.REACT_APP_API_URL + "/users/" + response.data._id,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
      })
      .then((response) => setUserDetails(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, [storedToken]);

  const deleteUser = () => {
    axios
      .delete(process.env.REACT_APP_API_URL + "/users/" + userId, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUserHandleClickOpen = () => {
    setOpenDeleteModal(true);
  };

  const deleteUserHandleClose = () => {
    setOpenDeleteModal(false);
  };

  return (
    <>
      {!userDetails ? (
        <Box align="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          container
          rowSpacing={3}
          align="center"
          justifyContent="center"
          sx={{ width: "100vw", p: "5%", m: 0 }}
        >
          {/* ---------- IMAGE */}
          <Grid
            item
            width="30vw"
            sx={{
              height: "30vw",
              backgroundColor: "lightgrey",
              backgroundImage: `url(${ShowImage(userDetails.image)})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPositionY: "center",
              borderRadius: "50%",
            }}
          ></Grid>

          {/* ---------- NAME */}
          <Grid item xs={12} sx={{ p: 0, m: 0 }}>
            <Typography
              align="center"
              variant="h4"
              component="div"
              gutterBottom
            >
              {userDetails.username}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            elevation={1}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* <Grid item xs={12} elevation={1} sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", position: "fixed", bottom: 100 }}> */}
            <Button
              variant="contained"
              sx={{ width: "49%" }}
              startIcon={<EditIcon />}
              href={`/update-user`}
            >
              Edit Details
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ width: "49%" }}
              onClick={() => deleteUserHandleClickOpen()}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      )}

      {openDeleteModal === true && (
        <DeleteDialog
          open={openDeleteModal}
          callBackToClose={deleteUserHandleClose}
          callBackToDelete={deleteUser}
          type="deleteUser"
        />
      )}

      <Grid item xs={12}>
        <OrganizerEventListPage/>
      </Grid>

      
    </>
  );
}

export default UserProfilePage;
