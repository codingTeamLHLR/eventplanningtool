import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreateEventPage from "./pages/CreateEventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import NavBar from "./components/NavBar";
// import IsPrivate from './components/IsPrivate';
import IsAnon from "./components/IsAnon";
import Nav from "./components/Nav";
import { MenuList } from "@mui/material";
import UpdateEventPage from "./pages/UpdateEventPage";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>

      {/* <MenuList/> */}

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
      </Routes>
    </div>
  );
}

export default App;
