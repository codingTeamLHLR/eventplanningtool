
import Box from "@mui/material/Box";
// import nightlights from "./../images/nightlights.jpg"
// import nightlights from "../images/test.png"
import nightlights from "../images/default-event-picture.jpg";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";


function HomePage() {


  return (

    <Box fullwidth 
        sx={{
            bgcolor: "#110d26", 
            width:"100vw", 
            height:"100vh",
            overflow:"hidden",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPositionY: "center",
            position: 'fixed',
            zIndex: 99
            }}>


        <Box
            component="img"
            src={nightlights}
            sx={{
              height: "100%",
              backgroundPositionY: "center",
              backgroundPositionX: "center",
              overflow: "hidden",
            }}
          />

        <Box 
            sx={{
                position: "absolute", 
                top:"50%", 
                color: "text.primary", 
                m:"10%", 
                display: "flex", 
                flexDirection: "column", 
                alignItems:"flex-start"
            }}>
                <Typography variant="h1" >
                    rumble
                </Typography>
                <Link to="/login" > 
                    <Button variant="outlined" sx={{mt: "20px"}}> Log In </Button>
                </Link>
                <Link to="/signup" > 
                    <Button sx={{mt: "20px"}}> Sign Up</Button>
                </Link>
        </Box>
    </Box>


  );
}

export default HomePage;


