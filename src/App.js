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
import UpdateUserProfilePage from "./pages/UpdateUserProfilePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CalendarPage from "./pages/CalendarPage";
import IsPrivate from "./components/IsPrivate";
import EventsListPage from "./pages/EventsListPage";

const theme = createTheme({
  palette: {
    primary: {
      // main: "#f79525",
      // main: "#fcbf47",
      main: "#f7aa0f",
      // main: "#ff702e",
      // main: "#e8f0c2",
      // main: "#fafa8e",
    },
    secondary: {
      main: "#f2c66f",
    },
    text: {
      primary: "#e4e6f0",
      secondary: "#f2c66f",
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

          <Route
            path="/calendar"
            element={
              <IsPrivate>
                <CalendarPage />
              </IsPrivate>
            }
          />
          <Route
            path="/events"
            element={
              <IsPrivate>
                <EventsListPage />
              </IsPrivate>
            }
          />
          <Route
            path="/create-event"
            element={
              <IsPrivate>
                {" "}
                <CreateEventPage />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/:eventId/update-event"
            element={
              <IsPrivate>
                {" "}
                <UpdateEventPage />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/:eventId"
            element={
              <IsPrivate>
                {" "}
                <EventDetailsPage />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/userprofile"
            element={
              <IsPrivate>
                <UserProfilePage />
              </IsPrivate>
            }
          />
          <Route
            path="/update-user"
            element={
              <IsPrivate>
                {" "}
                <UpdateUserProfilePage />{" "}
              </IsPrivate>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
