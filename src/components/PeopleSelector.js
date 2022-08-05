import * as React from 'react';
import { FormControl, Select, InputLabel, OutlinedInput, MenuItem } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import axios from 'axios';

// const { ObjectId } = require('mongodb');


function PeopleSelector(props) {

    // Styling for the Selector
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
    style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
    },},};

    const [personName, setPersonName] = React.useState([]);
    const [personId, setPersonId] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState(undefined);

    
    React.useEffect(() => {

      const storedToken = localStorage.getItem("authToken");
      
      if (props.type === 'invites') {

        axios
        .get(process.env.REACT_APP_API_URL + '/users', { headers: { Authorization: `Bearer ${storedToken}` }})
        .then(response => {
          setUsers(response.data);
          // console.log('type is invites, people are', users)
        })
        .catch((error) => {
          // console.log(error);
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
          console.log("this is error", errorDescription);
        })
      }
      
      if (props.type ==='organizers') {

          
          axios
            .get(process.env.REACT_APP_API_URL + '/users', { headers: { Authorization: `Bearer ${storedToken}` }, params: {ids: props.participants}})
            .then(response => {
            setUsers(response.data);
            // console.log('type is orgnizers, people are', users)
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
            console.log("this is error", errorDescription);
          })
        }
      }, [props.participants])  
      

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
        setPersonId(value)
      };

    const theme = createTheme(personName);


    return (

        <FormControl sx={{ width: '100%', mt: 2, mb: 1 }}>
        <InputLabel id="demo-multiple-name-label" shrink style={{backgroundColor: 'white'}}>Name</InputLabel>
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
            {users.map((user) =>  {
                return (
                <MenuItem
                key={user._id}
                value={user._id}
                style={getStyles(user.username, personName, theme)}
                >
                {user.username}
                </MenuItem>
                )
            }
            )} 

        </Select>
        {/* {errorMessage} */}
        </FormControl>

    )
}

export default PeopleSelector;

