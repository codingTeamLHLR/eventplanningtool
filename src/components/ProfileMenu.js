
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Button, ListItemIcon, Menu } from "@mui/material";
import { NavLink } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonOutlineOutlined from "@mui/icons-material/AccountCircle";
import { SettingsOutlined } from "@mui/icons-material";

export default function ProfileMenu({anchorEl, setAnchorEl}) {

  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const open = Boolean(anchorEl);

  return (
    <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={() => setAnchorEl(null)}
          onClick={() => setAnchorEl(null)}
          PaperProps={{
            elevation: 1,
            sx: {
              backgroundColor: "#252a42",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: -2,
              width: "140px",
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
                    <PersonAddIcon fontSize="small" sx={{ color: "#e4e6f0" }} />
                  </ListItemIcon>
                  Sign Up
                </MenuItem>

                <MenuItem component={NavLink} to="/login">
                  <ListItemIcon>
                    <LoginIcon fontSize="small" sx={{ color: "#e4e6f0" }}/>
                  </ListItemIcon>
                  Log In
                </MenuItem>
              </>
            )}
            {isLoggedIn && (
              <>
                <MenuItem component={NavLink} to="/userprofile">
                  <ListItemIcon>
                    <SettingsOutlined fontSize="small" sx={{ color: "#e4e6f0" }}/>
                  </ListItemIcon>
                  Settings
                </MenuItem>

                <MenuItem component={NavLink} to="/userprofile">
                  <ListItemIcon>
                    <PersonOutlineOutlined fontSize="small" sx={{ color: "#e4e6f0" }}/>
                  </ListItemIcon>
                  My Events
                </MenuItem>

                <MenuItem
                  component={Button}
                  sx={{ textTransform: "none" }}
                  onClick={logOutUser}
                >
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: "#e4e6f0" }}/>
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </>
            )}
          </div>
        </Menu>
  );
}
