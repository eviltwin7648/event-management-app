import { useState } from "react";
import { loginCall } from "../services/api";
import LoginImage from "../assets/login.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginCall({ email, password }).then((res)=>{
    console.log(res)
   });
   
    navigate("/")
  };


  return (
    <div className="flex flex-row">
      <div className="flex py-10 flex-col w-3/5 gap-16 h-[100vh] align-middle items-center">
        <h1 className=" text-2xl text-center font-bold">
          Event <span className="text-primary">FYI</span>
        </h1>
        <h3 className="text-4xl font-bold text-center">Sign In to Event FYI</h3>
        <form onSubmit={handleSubmit} className="w-3/5">
          <div className="mb-5">
            <label >YOUR EMAIL</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your mail"
              required
            />
          </div>
          <div className="mb-5">
            <label >YOUR PASSWORD</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-primary rounded-md py-2 px-4 text-white">
              <p className="px-4 py-2 block">Sign In</p>{" "}
            </button>
          </div>
        </form>
      </div>
      <div
        className="relative flex flex-col w-2/5 justify-center items-center text-white"
        style={{
          backgroundImage: `url(${LoginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay to make background darker */}
        <div className="absolute inset-0 bg-black/50 filter blur-sm"></div>

        {/* Content on top of the background */}
        <div className="relative z-10 gap-5 flex flex-col items-center">
          <p className="text-4xl font-bold">Hello Friend</p>
          <p className="text-center">
            To keep connected with us provide us with your information
          </p>
          <button
            onClick={() => (navigate("/signup"))}
            className="px-6 py-2 mt-4 bg-white/40 text-white rounded-lg"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
