import Avatar from "@mui/material/Avatar";
import BackgroundLetterAvatars from "../components/BackgroundLetterAvatars";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ShowImage from "../functions/ShowImage";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import badgeAccepted from "../images/badge-accepted.png";
import badgeDeclined from "../images/badge-declined.png";

const StatusIcon = styled(Avatar)(({ theme }) => ({
  width: 15,
  height: 15,
}));

export default function GroupedAvatars(props) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {props.avatars.map((participant) => {
        return (
          <div key={participant._id}>
            {participant.status === "accepted" && (
              <Box sx={{ m: 0.5, display: "flex", flexDirection: "column" }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  badgeContent={<StatusIcon src={badgeAccepted} />}
                >
                  {participant.user.image ? (
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
            )}

            {participant.status === "declined" && (
              <Box sx={{ m: 0.5, display: "flex", flexDirection: "column" }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  badgeContent={<StatusIcon src={badgeDeclined} />}
                >
                  {participant.user.image ? (
                    <Avatar
                      alt={participant.user.username}
                      src={ShowImage(participant.user.image)}
                    />
                  ) : (
                    <BackgroundLetterAvatars name={participant.user.username} />
                  )}
                </Badge>
              </Box>
            )}

            {participant.status === "pending" && (
              <Box sx={{ m: 0.5, display: "flex", flexDirection: "column" }}>
                {participant.user.image ? (
                  <Avatar
                    alt={participant.user.username}
                    src={ShowImage(participant.user.image)}
                  />
                ) : (
                  <BackgroundLetterAvatars name={participant.user.username} />
                )}
              </Box>
            )}
          </div>
        );
      })}
    </Box>
  );
}
