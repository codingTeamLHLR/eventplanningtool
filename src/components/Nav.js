import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Event from '@mui/icons-material/Event';
import Forum from '@mui/icons-material/Forum';
import Person from '@mui/icons-material/Person';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100vw', position: 'fixed', bottom: 0, zIndex: 1 }}> 
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}>
        <BottomNavigationAction label="Events" icon={<Event />} />
        <BottomNavigationAction label="Notifications" icon={<Forum />} />
        <BottomNavigationAction label="Profile" icon={<Person />} />
      </BottomNavigation>
    </Box>
  );
}