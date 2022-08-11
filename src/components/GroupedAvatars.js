import * as React from "react";
import Avatar from "@mui/material/Avatar";
import BackgroundLetterAvatars from "../components/BackgroundLetterAvatars";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ShowImage from "../functions/ShowImage";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import badgeAccepted from "../images/badge-accepted.png"
import badgeDeclined from "../images/badge-declined.png"



const StyledBadge = styled(Badge)(({ theme }) => ({
  // '& .MuiBadge-badge': {
  //   backgroundColor: '#44b700',
  //   color: '#44b700',
  //   boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,

  // },

}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 15,
  height: 15,
  border: `2px solid ${theme.palette.background.paper}`,
}));




export default function GroupedAvatars(props) {

    console.log(props.avatars)

  return (
    // <AvatarGroup sx={{backgroundColor: "red", display: 'flex'}}>

    <Box sx={{display: "flex", flexWrap: "wrap", }}>

    {props.avatars.map((participant) => {
            return (
              <>

              {participant.status==="accepted" &&

              <Box key={participant._id} sx={{ m: 0.5, display:"flex", flexDirection: "column" }}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}

                  badgeContent={
                  <SmallAvatar alt="Remy Sharp" src={badgeAccepted} />
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

                </StyledBadge>
                  {props.organizersArray.includes(participant.user._id) ? (
                    <Typography style={{ fontSize: "11px" }}> Host </Typography>
                  ) : (
                    <></>
                  )}
              </Box>
              }

              {participant.status==="declined" &&

              <Box key={participant._id} sx={{ m: 0.5, display:"flex", flexDirection: "column" }}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}

                  badgeContent={
                  <SmallAvatar alt="Remy Sharp" src={badgeDeclined} />
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
                </StyledBadge>
              </Box>
              }
              
              {participant.status==="pending" &&

              <Box key={participant._id} sx={{ m: 0.5, display:"flex", flexDirection: "column" }}>

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
              </>

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