import Avatar from "@mui/material/Avatar";
import BackgroundLetterAvatars from "../components/BackgroundLetterAvatars";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ShowImage from "../functions/ShowImage";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import badgeAccepted from "../images/badge-accepted.png"
import badgeDeclined from "../images/badge-declined.png"


const StatusIcon = styled(Avatar)(({ theme }) => ({
  width: 15,
  height: 15,
  // border: `1px solid ${theme.palette.background.paper}`,
}));

export default function GroupedAvatars(props) {

  return (
    // <AvatarGroup sx={{backgroundColor: "red", display: 'flex'}}>

    <Box sx={{display: "flex", flexWrap: "wrap", }}>

    {props.avatars.map((participant) => {
            return (
              <div key={participant._id}>

              {participant.status==="accepted" &&

              <Box sx={{ m: 0.5, display:"flex", flexDirection: "column" }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

                  badgeContent={
                  <StatusIcon src={badgeAccepted} />
                  }
                >
                  {participant.image ? (
                    <Avatar
                      alt={participant.user.username}
                      src={ShowImage(participant.user.image)}
                    />
                  ) : (
                    <BackgroundLetterAvatars name={participant.user.username} />
                  )}

                </Badge>
                  {props.organizersArray.includes(participant.user._id) ? (
                    <Typography style={{ fontSize: "11px" }}> Host </Typography>
                  ) : (
                    <></>
                  )}
              </Box>
              }

              {participant.status==="declined" &&

              <Box sx={{ m: 0.5, display:"flex", flexDirection: "column" }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

                  badgeContent={
                  <StatusIcon src={badgeDeclined} />
                  }
                >
                  {participant.image ? (
                    <Avatar
                      alt={participant.user.username}
                      src={ShowImage(participant.user.image)}
                    />
                  ) : (
                    <BackgroundLetterAvatars name={participant.user.username} />
                  )}
                </Badge>
              </Box>
              }
              
              {participant.status==="pending" &&

              <Box sx={{ m: 0.5, display:"flex", flexDirection: "column" }}>

                  {participant.image ? (
                    <Avatar
                      alt={participant.user.username}
                      src={ShowImage(participant.user.image)}
                    />
                  ) : (
                    <BackgroundLetterAvatars name={participant.user.username} />
                  )}
              </Box>
              }
              </div>

            );
          })}
      

    </Box>





  );
}


            // {/* {participant.status==='accepted' ? (
            //   <Box sx={{backgroundColor: "red"}}/>
            // ) : (
            //   <></>
            // )} */}


    //             {/* <AvatarGroup
    //   sx={{
    //     display: "flex",
    //     flexDirection: "row-reverse",
    //     justifyContent: "flex-end",
    //   }}
    // >
    //   {avatars.map((participant) => {
    //     return (
    //       <Box key={participant._id} sx={{ m: 0 }}>
    //         {participant.image ? (
    //           <Avatar
    //             alt={participant.username}
    //             src={ShowImage(participant.image)}
    //           />
    //         ) : (
    //           <BackgroundLetterAvatars name={participant.user.username} />
    //         )}
    //         {props.organizersArray.includes(participant._id) ? (
    //           <Typography style={{ fontSize: "11px" }}> Host </Typography>
    //         ) : (
    //           <></>
    //         )}

            
    //       </Box>
    //     );
    //   })}

    //   {!!surplus && <Avatar sx={{ left: 8, top: 0 }}>+{surplus}</Avatar>}
    // </AvatarGroup> */}