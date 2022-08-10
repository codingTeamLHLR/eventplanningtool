import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function ViewSwitch(props) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
      if(checked===false){
        setChecked(event.target.checked);
        props.callBackToSetCalendarView(true)
    }
    if(checked===true){
        props.callBackToSetCalendarView(false)
        setChecked(event.target.checked);
    }
  };

  return (
    <FormControlLabel control={    
        <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        />
    } label="Calendar View" />
  );
}