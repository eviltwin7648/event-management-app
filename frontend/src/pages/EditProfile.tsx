import { useState } from "react";
import { updateUserCall } from "../services/api";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserCall({
      firstName,
      lastName,
      username,
      password,
    });
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col w-full m-auto p-10 text-black justify-center items-center">
        <h3 className="font-bold text-4xl">Edit Profile</h3>

        <form onSubmit={handleSubmit} className="w-[816px]">
        <div className="mb-5 flex flex-row justify-between">
            <div>
              <label>First Name</label>
              <input
                type="text"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="Enter Your First Name"
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                type="text"
                placeholder="Enter Your Last Name"
              />
            </div>
          </div>
          <div className="mb-5">
            <label >
              Username
            </label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              placeholder="username"
            />
          </div>
          <div className="mb-5">
            <label>Email</label>
            <input
              type="email"
              id="email"
              disabled
              placeholder="email"
            />
          </div>
          <div className="mb-5">
            <label >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
