import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloudinaryWidget from "../components/CloudinaryWidget";
import { CircularProgress } from "@mui/material";


function UpdateUserProfilePage() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [image, setImage] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

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
        setImage(response.data.image)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [storedToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    const requestBody = {
      username: userDetails.username,
      image,
    };

    axios
      .put(process.env.REACT_APP_API_URL + "/users/" + userId, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/userprofile");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setError(true);
        setErrorMessage(errorDescription);
        console.log("this is error", errorDescription);
      });
  };


  return (
    <>
      {!userDetails ? (
        <></>
      ) : (

          <Container maxWidth="xs" sx={{width: "90vw", color: "text.primary", width:"100%"}}>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                

              }}
            >
              <Typography component="h1" variant="h5">
                Update Profile Information
              </Typography>
              <Box
                component="form"
                onSubmit={handleSignupSubmit}
                noValidate
                sx={{ mt: 1, width:"100%" }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  name="username"
                  label="Username"
                  InputLabelProps={{ shrink: true }}
                  type="string"
                  id="username"
                  autoComplete="username"
                  error={error}
                  value={userDetails.username}
                  onChange={handleChange}
                  sx={{backgroundColor: "#252a42", borderRadius: "10px", mt:1}}

                />

                <Box sx={{mt:2}}>
                  {/* <FormLabel sx={{fontSize: 12}}>Change Profile Picture</FormLabel> */}
                  <CloudinaryWidget
                    setImage={setImage}
                    image={userDetails.image}
                    
                  />
                </Box>

                <p>{errorMessage}</p>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save Changes
                </Button>

                <Button
                    href={"/userprofile"}
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Back
                  </Button>

              </Box>
            </Box>
          </Container>
      )}
    </>
  );
}

export default UpdateUserProfilePage;
