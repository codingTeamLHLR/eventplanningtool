import { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import axios from "axios";
import SortByDate from "../functions/SortByDate";
import { Box } from "@mui/system";

function CalendarPage() {
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      const storedToken = localStorage.getItem("authToken");
  
      axios
        .get(process.env.REACT_APP_API_URL + "/events", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setEvents(SortByDate(response.data));
  
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

return(
    <Box sx={{p:"5%"}}>
        <Calendar data={events} />
    </Box>
)

}

export default CalendarPage;