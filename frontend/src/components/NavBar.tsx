import { useLocation } from "react-router-dom";
import Button from "./Button";

const NavBar = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token") !== null;

  return (
    <div className="flex py-4 px-6 items-center  justify-around">
      <h1 className=" text-4xl font-bold">
        Event <span className="text-primary">FYI</span>
      </h1>
      {isAuthenticated ? (<div>
        <div className="bg-primary cursor-pointer rounded-full p-5 w-10 h-10 flex items-center justify-center">
          <p className="text-xl text-white">P</p>
        </div>
      </div> 
    ) : (
      <div className="flex items-center gap-12 ">
        <a href="/login">Login</a> 
        <Button title="Sign Up" link="/signup" />
      </div>
      
    )}
     </div>
  );
};

export default NavBar;
