import { useState } from "react";
import { signUpCall } from "../services/api";
import SignpImage from "../assets/signup.png";
import Button from "../components/Button";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signUpCall({
      firstName,
      lastName,
      username,
      password,
      email,
    });
    console.log(res);
    window.location.href = "/";
  };

  return (
    <div className="flex flex-row">
      <div
        className="relative flex flex-col w-2/5 justify-center items-center text-white"
        style={{
          backgroundImage: `url(${SignpImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50 filter blur-sm"></div>

        <div className="relative z-10 gap-5 flex flex-col items-center">
          <p className="text-4xl font-bold">Welcome back</p>
          <p className="text-center">
            To keep connected with us provide us with your information{" "}
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-6 py-2 mt-4 bg-white/40 text-white rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
      <div className="flex py-10 flex-col w-3/5 justify-around h-[100vh] align-middle items-center">
        <h1 className=" text-2xl text-center font-bold">
          Event <span className="text-primary">FYI</span>
        </h1>
        <h3 className="text-4xl font-bold text-center">Sign Up to Event FYI</h3>{" "}
        <form onSubmit={handleSubmit} className="w-3/5">
          <div className="mb-5 flex flex-row justify-between">
            <div>
              <label className="block mb-2 ">First Name</label>
              <input
                type="text"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="w-full bg-white p-2.5 rounded"
                placeholder="Enter Your First Name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 ">Last Name</label>
              <input
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                type="text"
                className="w-full bg-white p-2.5 rounded"
                placeholder="Enter Your Last Name"
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="block mb-2 ">Username</label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              className="w-full p-2.5 rounded"
              placeholder="Enter Your Username"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 ">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full p-2.5 rounded"
              placeholder="Enter Your E-mail"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 ">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter New Password"
              className="w-full p-2.5 rounded"
              required
            />
          </div>
        </form>
          <div className="flex justify-center">
            <Button title="Sign Up" link="/" />
          </div>
          <p>Or</p>
        <div>
          <button>Sign In With Google</button>
        </div>
      </div>

    </div>
  );
};

export default SignUpPage;
