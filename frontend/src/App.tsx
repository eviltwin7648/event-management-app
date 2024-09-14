import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import EditProfile from "./pages/EditProfile";
import RegisteredEvents from "./pages/RegisteredEvents";
import YourEvents from "./pages/YourEvents";
import EditEvents from "./pages/EditEvents";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CreateEventPage from "./pages/CreateEventPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PublicRoute from "./utils/PublicRoute";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/editprofile"
            element={
              <ProtectedRoutes>
                <EditProfile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/editevent/:id"
            element={
              <ProtectedRoutes>
                <EditEvents />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/event/:eventId"
            element={
              <ProtectedRoutes>
                <EventDetails />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/createevent"
            element={
              <ProtectedRoutes>
                <CreateEventPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/yourevents"
            element={
              <ProtectedRoutes>
                <YourEvents />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/registeredevents"
            element={
              <ProtectedRoutes>
                <RegisteredEvents />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
