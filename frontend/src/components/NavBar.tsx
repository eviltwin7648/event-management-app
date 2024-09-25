import { useState } from "react";
import Button from "./Button";
import Popup from "./Popup"; // Import the Popup component
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const isAuthenticated = localStorage.getItem("token") !== null;
  const navigate = useNavigate();

  return (
    <div className="relative  flex py-4 px-6 items-center z-30 justify-around">
      <h1
        onClick={() => {
          navigate("/");
        }}
        className="text-4xl cursor-pointer font-bold"
      >
        Event <span className="text-primary">FYI</span>
      </h1>
      {isAuthenticated ? (
        <div>
          <div
            className="bg-primary cursor-pointer rounded-full p-3 flex items-center justify-center"
            onClick={() => setIsPopupVisible(!isPopupVisible)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 5C12.134 5 9 8.13401 9 12C9 15.866 12.134 19 16 19C19.866 19 23 15.866 23 12C23 8.13401 19.866 5 16 5ZM7 12C7 7.02944 11.0294 3 16 3C20.9706 3 25 7.02944 25 12C25 16.9706 20.9706 21 16 21C11.0294 21 7 16.9706 7 12Z"
                fill="#ffff"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.0002 20.999C13.718 20.999 11.476 21.5998 9.49965 22.741C7.52328 23.8822 5.88215 25.5235 4.74124 27.5001C4.46514 27.9784 3.85356 28.1423 3.37525 27.8662C2.89693 27.5901 2.733 26.9785 3.0091 26.5002C4.32553 24.2196 6.21914 22.3257 8.49957 21.009C10.78 19.6922 13.3669 18.999 16.0002 18.999C18.6335 18.999 21.2203 19.6922 23.5008 21.009C25.7812 22.3257 27.6748 24.2196 28.9912 26.5002C29.2673 26.9785 29.1034 27.5901 28.6251 27.8662C28.1468 28.1423 27.5352 27.9784 27.2591 27.5001C26.1182 25.5235 24.4771 23.8822 22.5007 22.741C20.5243 21.5998 18.2823 20.999 16.0002 20.999Z"
                fill="#ffff"
              />
            </svg>
          </div>
           {isPopupVisible && <Popup onClose={() => setIsPopupVisible(false)} />}
         </div>
      ) : (
        <div className="flex items-center gap-12">
          <Link to="/login">Login</Link>
          <Button title="Sign Up" link="/signup" />
        </div>
      )}
    </div>
  );
};

export default NavBar;
