import * as React from "react";
import {
  FormControl,
  Select,
  InputLabel,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import axios from "axios";

function PeopleSelector(props) {
  // Styling for the Selector
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  console.log("props", props);

  const [personName, setPersonName] = React.useState([]);
  const [personId, setPersonId] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const [currentUserId, setCurrentUserId] = React.useState(null);

  React.useEffect(() => {
    if (props.people) {
      setPersonId(props.people);
    }

    const storedToken = localStorage.getItem("authToken");

    axios
      .get(process.env.REACT_APP_API_URL + "/verify", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCurrentUserId(response.data._id);

        if (props.type === "invites") {
          return axios.get(process.env.REACT_APP_API_URL + "/users", {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
        } else if (props.type === "organizers") {
          return axios.get(process.env.REACT_APP_API_URL + "/users", {
            headers: { Authorization: `Bearer ${storedToken}` },
            params: { ids: props.participants },
          });
        }
      })
      .then((response) => {
        setUsers(response.data);
        console.log(`type is ${props.type}, people are`, response.data);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        console.log("this is error", errorDescription);
      });
  }, [props]);

  // dynamically show who is selected
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handlePeopleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonId(value);
    // setPersonName()
  };

  const theme = createTheme(personName);

  let label;
  if (props.type === "organizers") {
    label = "Organizers";
  } else if (props.type === "invites") {
    label = "Guests";
  }

  return (
    <>
      {users.length === 0 ? (
        <p>loading.. </p>
      ) : (
        <>
          <FormControl sx={{ width: "100%", mt: 2, mb: 1 }}>
            <InputLabel
              id="demo-multiple-name-label"
              shrink
              style={{ backgroundColor: "white" }}
            >
              {label}
            </InputLabel>

            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={personId}
              onChange={handlePeopleChange}
              onClose={() => props.getPeopleCallback(personId)}
              input={<OutlinedInput notched label="Name" />}
              MenuProps={MenuProps}
            >
              {users.map((user) => {
                if (user._id !== currentUserId) {
                  return (
                    <MenuItem
                      value={user._id}
                      key={user._id}
                      style={getStyles(user.username, personName, theme)}
                    >
                      {user.username}
                    </MenuItem>
                  );
                }
              })}
            </Select>
            {errorMessage}
          </FormControl>
        </>
      )}
    </>
  );
}

export default PeopleSelector;
