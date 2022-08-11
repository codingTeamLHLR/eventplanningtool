import * as React from "react";
import {
  FormControl,
  Select,
  InputLabel,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import axios from "axios";

function PeopleSelector(props) {

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        backgroundColor: "#252a42", 
      },
    },
  };

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
        } else if (
          props.type === "organizers" ||
          props.type === "pollParticipants"
        ) {
          return axios.get(process.env.REACT_APP_API_URL + "/users", {
            headers: { Authorization: `Bearer ${storedToken}` },
            params: { ids: props.participants },
          });
        }
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        console.log("this is error", errorDescription);
      });
  }, [props]);



  const handlePeopleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonId(value);
    // setPersonName()
  };


  let label;
  let styles;
  if (props.type === "organizers") {
    label = "Organizers";
    styles = {width:360, mt: 2, mb: 1, backgroundColor: "#252a42", borderRadius: "10px"}
  } else if (props.type === "invites") {
    label = "Guests";
    styles = {width:360, mt: 2, mb: 1, backgroundColor: "#252a42", borderRadius: "10px"}
  } else if (props.type === "pollParticipants") {
    label = "Voters";
    styles = {width:280, mt: 1, mb: 1, backgroundColor: "#252a42", borderRadius: "10px"}
  }

  return (
    <>
      {users.length > 0 &&
        <> 
        <FormControl sx={styles}>
            <InputLabel
              id="demo-multiple-name-label"
              shrink
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
      }
    </>
  );
}

export default PeopleSelector;
