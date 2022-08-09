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

function App() {
  return (
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
  );
}

export default App;
