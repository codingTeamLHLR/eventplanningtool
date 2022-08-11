
import Box from "@mui/material/Box";
// import nightlights from "./../images/nightlights.jpg"
import nightlights from "../images/test.png"
import badgeAccepted from "../images/badge-accepted.png"


function HomePage() {


  return (

    <Box
            component="img"
            src={nightlights}
            sx={{
            //   width: "100vw",
              height: "100vh",
              background: "lightgrey",
              backgroundImage: "https://media.istockphoto.com/id/1134266228/de/foto/tropenbar-athmocphere-hintergrund-mit-gelber-girlanden-bokeh-nacht-lebenskonzept.webp?s=612x612&w=is&k=20&c=UJtPIdzZ9q_5XUzdw_1sKDdf2_TgCto0u2Im_b1vxOE=",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPositionY: "center",
              borderRadius: 1,
            }}>
            {/* <h1>Welcome!</h1>
            <p>{nightlights}</p>
            <p>{badgeAccepted}</p> */}

            {/* <img src={nightlights}></img> */}
            {/* <img src="https://media.istockphoto.com/id/1134266228/de/foto/tropenbar-athmocphere-hintergrund-mit-gelber-girlanden-bokeh-nacht-lebenskonzept.webp?s=612x612&w=is&k=20&c=UJtPIdzZ9q_5XUzdw_1sKDdf2_TgCto0u2Im_b1vxOE="></img> */}
    </Box>



  );
}

export default HomePage;