import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
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
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

const DashboardLayout = () => {
  return (
    <>
      <div className="flex flex-row">
        <div className="">
          <SideBar />
        </div>
        <div className=" p-6 bg-gray-100 h-screen overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
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
          </Route>
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
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route
              path="editprofile"
              element={
                <ProtectedRoutes>
                  <EditProfile />
                </ProtectedRoutes>
              }
            />

            <Route
              path="yourevents"
              element={
                <ProtectedRoutes>
                  <YourEvents />
                </ProtectedRoutes>
              }
            />
            <Route
              path="registeredevents"
              element={
                <ProtectedRoutes>
                  <RegisteredEvents />
                </ProtectedRoutes>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to={'/home'}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
