import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreateEventPage from "./pages/CreateEventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import IsAnon from "./components/IsAnon";
import Nav from "./components/Nav";
import UpdateEventPage from "./pages/UpdateEventPage";
import UserProfilePage from "./pages/UserProfilePage";
import EditUserProfilePage from "./pages/EditUserProfilePage";
import { orange, red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BorderBottom } from "@mui/icons-material";

const theme = createTheme({
  // root: {
  //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  // },
  palette: {
    primary: {
      main: "#423f4a",
    },
    secondary: {
      main: "#7d778f",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Nav />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={
              <IsAnon>
                {" "}
                <SignupPage />{" "}
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                {" "}
                <LoginPage />{" "}
              </IsAnon>
            }
          />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/:eventId/update-event" element={<UpdateEventPage />} />
          <Route path="/:eventId" element={<EventDetailsPage />} />
          <Route path="/userprofile" element={<UserProfilePage />} />
          <Route path="/update-user" element={<EditUserProfilePage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
