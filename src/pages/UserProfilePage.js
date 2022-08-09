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
import Moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import { CalendarMonth } from "@mui/icons-material";

function UserProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState(null);

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
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
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
          columnSpacing={1}
          sx={{ width: "100%", p: "5%" }}
        >
          <Box
            width="100%"
            style={{
              height: "40vw",
              backgroundColor: "red",
              backgroundImage: `url(${ShowImage(userDetails.image)})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPositionY: "center",
            }}
          />
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h5"
              component="div"
              gutterBottom
            >
              {userDetails.username}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              align="left"
              variant="h6"
              component="div"
              // sx={{ mt:-5}}
              sx={{ mt: -2, p: 0.5 }}
            >
              Info
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ pt: "0.8rem", pr: "1rem", pl: "1rem" }}>
              <CalendarMonth />
            </Box>
            <Typography variant="h7" component="div" align="left">
              <p>Birthdate:</p>
              <p>{Moment(userDetails.birthdate).format("MMM Do YY")}</p>
            </Typography>
          </Grid>

          {/* add location, add friends */}

          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              startIcon={<EditIcon />}
              href={`/update-user`}
            >
              Edit Details
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="error"
              sx={{ width: "100%" }}
              onClick={() => deleteUser()}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default UserProfilePage;
