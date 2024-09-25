import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-navy_blue flex gap-8 py-5 flex-col">
      <div className="flex justify-center">
        <h1
          onClick={() => {
            navigate("/");
          }}
          className="text-4xl text-white cursor-pointer font-bold"
        >
          Event <span className="text-primary">FYI</span>
        </h1>
      </div>
      <div className="flex justify-center gap-5">
        <input type="text" className="w-96" />
        <Button title="Subscribe" link={"/"} />
      </div>
      <div className="flex gap-4 font-thin text-white justify-center">
        <Link to={"/"}>Home</Link>
        <Link to={"/"}>Create</Link>
        <Link to={"/"}>Profile</Link>
        <Link to={"/"}>Explore</Link>
      </div>
      <div>
        <div className="h-px bg-white w-full "></div>
        <div className="flex text-sm text-gray-400 justify-between">
          <div className="flex">
            {/* <p>Developed by </p> */}
            <a href="https://github.com/eviltwin7648">@eviltwin7648</a>
          </div>
          <p>UI design@Figma-Community</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
