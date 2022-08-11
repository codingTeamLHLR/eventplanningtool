import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Button, ListItemIcon, Menu } from "@mui/material";
import { NavLink } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
  );
}
