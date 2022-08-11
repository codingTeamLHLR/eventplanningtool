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
import IconButton from "@mui/material/IconButton";
import { SettingsOutlined } from "@mui/icons-material";
import OrganizerEventList from "../components/OrganizerEventList";

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
        <> </>
      ) : (
        <>

                <Box sx={{color:"text.primary", display: "flex", justifyContent: "center", alignItems:"center", m:"5%"}}>

                  <Box
                    width="30vw"
                    sx={{
                      height: "30vw",
                      // background: "linear-gradient(#e66465, #9198e5)",
                      background: "lightgrey",
                      backgroundImage: `url(${ShowImage(userDetails.image)})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPositionY: "center",
                      borderRadius: "50%",
                      mr: "20px"
                    }}
                  />
                  <Typography
                    align="center"
                    variant="h6"
                    component="div"
                    gutterBottom
                  >
                    {userDetails.username}
                  </Typography>

                </Box>

                <Box sx={{display: "flex", justifyContent:"space-between", m:"5%", pb:"20px", borderBottom: "1px solid #f7aa0f"}}>

                  <Button
                      variant="outlined"
                      color="error"
                      sx={{ width: "49%" }}
                      onClick={() => deleteUserHandleClickOpen()}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                  </Button>

                  <Button
                        variant="contained"
                        sx={{ width: "49%" }}
                        startIcon={<EditIcon />}
                        href={`/update-user`}
                      >
                        Edit
                  </Button>

                </Box>

                <Box sx={{ml:"5%", mr:"5%"}}>
                    <Typography
                            align="left"
                            variant="h6"
                            component="div"
                            color="secondary"
                            sx={{mb: -5}}
                          >
                            Your Events
                      </Typography>
                </Box>

                <Grid
                    container
                    rowSpacing={3}
                    align="center"
                    justifyContent="center"
                    sx={{ width: "100vw", p: "5%", m: 0, color:"text.primary" }}
                  >


      
              </Grid>

        </>


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
          <OrganizerEventList/>
        </Grid>

      
    </>
  );
}

export default UserProfilePage;
