import { useLocation } from "react-router-dom";
import Button from "./Button";

const NavBar = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token") !== null;

  return (
    <div className="bg-black flex justify-around px-5 py-6 z-10">
      <Button title="Home" link="/" isActive={location.pathname === "/"} />
      {isAuthenticated ? (
        <>
          <Button
            title="Edit Profile"
            link="/editprofile"
            isActive={location.pathname === "/editprofile"}
          />
          <Button
            title="Create Event"
            link="/createevent"
            isActive={location.pathname === "/createevent"}
          />
          <Button
            title="Your Events"
            link="/yourevents"
            isActive={location.pathname === "/yourevents"}
          />
          <Button
            title="Registered Events"
            link="/registeredevents"
            isActive={location.pathname === "/registeredevents"}
          />
          <svg
            className="h-6 w-6 cursor-pointer"
            onClick={() => {
              window.localStorage.removeItem("token");
              window.location.href = "/";
            }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </>
      ) : (
        <>
          <Button
            title="Login"
            link="/login"
            isActive={location.pathname === "/login"}
          />
          <Button
            title="Sign Up"
            link="/signup"
            isActive={location.pathname === "/signup"}
          />
        </>
      )}
    </div>
  );
};

export default NavBar;
