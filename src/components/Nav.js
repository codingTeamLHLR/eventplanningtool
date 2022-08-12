import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { NavLink } from "react-router-dom";
import {
  ViewDayOutlined,
  CalendarMonthOutlined,
  ManageAccountsOutlined,
} from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import ProfileMenu from "./ProfileMenu";
import { useState } from "react";

export default function SimpleBottomNavigation(props) {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Box sx={{ width: "100vw", position: "fixed", bottom: 0, zIndex: 1 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(newValue) => setValue(newValue)}
        sx={{ height: "70px", backgroundColor: "#252a42", boxShadow: 3 }}
      >
        <BottomNavigationAction
          component={NavLink}
          to="/events"
          label="Events"
          icon={<ViewDayOutlined sx={{ color: "#e4e6f0" }} />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/calendar"
          label="Calendar"
          icon={<CalendarMonthOutlined sx={{ color: "#e4e6f0" }} />}
        />
        <Tooltip title="Profile" disableHoverListener>
          <BottomNavigationAction
            component={IconButton}
            onClick={(event) => setAnchorEl(event.currentTarget)}
            aria-haspopup="true"
            label="Account"
            icon={<ManageAccountsOutlined sx={{ color: "#b5b5ba" }} />}
          />
        </Tooltip>

        <ProfileMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </BottomNavigation>
    </Box>
  );
}
