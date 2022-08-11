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

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: "100vw", position: "fixed", bottom: 0, zIndex: 1 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
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
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            label="Profile"
            icon={<ManageAccountsOutlined />}
          />
        </Tooltip>
        
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 1,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                bottom: -10,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "bottom" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <div>
            {!isLoggedIn && (
              <>
                <MenuItem component={NavLink} to="/signup">
                  <ListItemIcon>
                    <PersonAddIcon fontSize="small" />
                  </ListItemIcon>
                  Sign Up
                </MenuItem>

                <MenuItem component={NavLink} to="/login">
                  <ListItemIcon>
                    <LoginIcon fontSize="small" />
                  </ListItemIcon>
                  Log In
                </MenuItem>
              </>
            )}
            {isLoggedIn && (
              <>
                <MenuItem component={NavLink} to="/userprofile">
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>

                <MenuItem
                  component={Button}
                  sx={{ textTransform: "none" }}
                  onClick={logOutUser}
                >
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </>
            )}
          </div>
        </Menu>
      </BottomNavigation>
    </Box>
  );
}
