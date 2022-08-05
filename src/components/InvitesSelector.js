import * as React from 'react';
import { FormControl, Select, InputLabel, OutlinedInput, MenuItem } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import axios from 'axios';

function InvitesSelector(props) {

    // Styling for the Selector
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
    style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
    },},};

    // array of friends
    // const names = [
    //     'Oliver Hansen',
    //     'Van Henry',
    //     'April Tucker',
    //     'Ralph Hubbard',
    //     'Omar Alexander',
    //     'Carlos Abbott',
    //     'Miriam Wagner',
    //     'Bradley Wilkerson',
    //     'Virginia Andrews',
    //     'Kelly Snyder',
    //   ];

    const [personName, setPersonName] = React.useState([]);

    const [users, setUsers] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState(undefined);

    React.useEffect(() => {

        const storedToken = localStorage.getItem("authToken");

        axios
            .get(process.env.REACT_APP_API_URL + '/users', { headers: { Authorization: `Bearer ${storedToken}` }})
            .then(response => {
                console.log("this is array of all users", response.data)
                setUsers(response.data);
            })
            .catch((error) => {
                // console.log(error);
              const errorDescription = error.response.data.message;
              setErrorMessage(errorDescription);
              console.log("this is error", errorDescription);
            })
    }, [])  

    // dynamically show who is selected
    function getStyles(name, personName, theme) {
    return {
        fontWeight:
        personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
    }

    const handleInvitesChange = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    const theme = createTheme(personName);


    return (
        <>
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleInvitesChange}
          onClose={() => props.getParticipantsCallback(personName)}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
            {users.map((user) =>  {
                return (
                <MenuItem
                key={user._id}
                value={user.username}
                style={getStyles(user.username, personName, theme)}
                >
                {user.username}
                </MenuItem>
                )
            }
            )} 

        </Select>
        </FormControl>

</>
    )
}

export default InvitesSelector;

            {/* {users.length === 0
            ?
            <MenuItem> loading.... </MenuItem>
            : */}

                        {/* }          */}

