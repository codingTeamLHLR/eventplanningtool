import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import BackgroundLetterAvatars from "../components/BackgroundLetterAvatars";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function clampAvatars(avatars, options = { max: 5 }) {
  const { max = 5, total } = options;
  let clampedMax = max < 2 ? 2 : max;
  const totalAvatars = total || avatars.length;
  if (totalAvatars === clampedMax) {
    clampedMax += 1;
  }
  clampedMax = Math.min(totalAvatars + 1, clampedMax);
  const maxAvatars = Math.min(avatars.length, clampedMax - 1);
  const surplus = Math.max(totalAvatars - clampedMax, totalAvatars - maxAvatars, 0);
  return { avatars: avatars.slice(0, maxAvatars), surplus };
  // return { avatars: avatars.slice(0, maxAvatars).reverse(), surplus };
}

export default function GroupedAvatars(props) {
  const dataFromTheServer = {
    people: props.avatars,
    total: props.avatars.length,
  };

  const { avatars, surplus } = clampAvatars(dataFromTheServer.people, {
    max: 4,
    total: dataFromTheServer.total,
  });

  return (
    // <AvatarGroup sx={{backgroundColor: "red", display: 'flex'}}>
    <AvatarGroup sx={{display: "flex", flexDirection: "row-reverse", justifyContent:"flex-end"}}>
            {avatars.map((participant) => {
                      return (
                        <Box key={participant._id} sx={{m:-0.5}}>
                          {participant.image ? (
                            <Avatar
                              alt={participant.username}
                              src={participant.image}
                            />
                          ) : (
                            <BackgroundLetterAvatars name={participant.username} />
                          )}
                          {props.organizersArray.includes(participant._id)? (
                            <Typography style={{fontSize: '11px'}} > Owner </Typography>
                          ): (<></>)
                          }
                        </Box>
                      );
                    })}

      {!!surplus && <Avatar sx={{left:4, top: -3}} >+{surplus}</Avatar>}
    </AvatarGroup>
  );

}