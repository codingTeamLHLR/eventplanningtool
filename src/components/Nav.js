import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Event from "@mui/icons-material/Event";
import Forum from "@mui/icons-material/Forum";
import Person from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { ViewDayOutlined, CalendarMonthOutlined, ManageAccountsOutlined} from "@mui/icons-material";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import ProfileMenu from "./ProfileMenu";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  return (
    <Box sx={{ width: "100vw", position: "fixed", bottom: 0, zIndex: 1 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(newValue) => setValue(newValue)}
        sx={{backgroundColor: "lightgrey"}}
      >
        <BottomNavigationAction
          component={NavLink}
          to="/"
          label="Events"
          icon={<ViewDayOutlined />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/calendar"
          label="Calendar"
          icon={<CalendarMonthOutlined />}
        />
        <Tooltip title="Profile" disableHoverListener>
          <BottomNavigationAction
            component={IconButton}
            onClick={(event) => setAnchorEl(event.currentTarget)}
            // aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            // aria-expanded={open ? "true" : undefined}
            label="Profile"
            icon={<ManageAccountsOutlined />}
          />
        </Tooltip>
        
        <ProfileMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
        
      </BottomNavigation>
    </Box>
  );
}
