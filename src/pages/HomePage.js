
import Box from "@mui/material/Box";
// import nightlights from "./../images/nightlights.jpg"
// import nightlights from "../images/test.png"
import nightlights from "../images/default-event-picture.jpg";
import { Typography } from "@mui/material";


function HomePage() {


  return (

    <Box fullwidth 
        sx={{
            bgcolor: "red", 
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

        <Typography variant="h2" sx={{position: "absolute", top:"50%", color: "text.primary"}}>
            Welcome
        </Typography>
    </Box>


  );
}

export default HomePage;


