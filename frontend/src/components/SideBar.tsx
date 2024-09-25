import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";


const SideBar = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string>("/yourevents")
  return (
    <div className="flex flex-col gap-10 w-64 bg-white h-full max-w-64">
      <h1
        onClick={() => {
          navigate("/");
        }}
        className="text-4xl cursor-pointer font-bold"
      >
        Event <span className="text-primary">FYI</span>
      </h1>
      <div className="max-w-[200px] flex flex-col gap-10">
        <Button 
        isactive = {activeButton == 'yourevents'}
        onClick={()=>{
          setActiveButton('yourevents')
          navigate('/dashboard/yourevents')
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 10C3 8.89543 3.89543 8 5 8H27C28.1046 8 29 8.89543 29 10V25C29 26.1046 28.1046 27 27 27H5C3.89543 27 3 26.1046 3 25V10ZM27 10H5V25H27V10Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.29289 2.29289C9.68342 1.90237 10.3166 1.90237 10.7071 2.29289L16 7.58579L21.2929 2.29289C21.6834 1.90237 22.3166 1.90237 22.7071 2.29289C23.0976 2.68342 23.0976 3.31658 22.7071 3.70711L16.7071 9.70711C16.3166 10.0976 15.6834 10.0976 15.2929 9.70711L9.29289 3.70711C8.90237 3.31658 8.90237 2.68342 9.29289 2.29289Z"
              fill="currentColor"
            />
          </svg>
          <p>My Events</p>
        </Button>
        <Button 
         isactive = {activeButton == 'registeredevents'}
         onClick={()=>{
           setActiveButton('registeredevents')
          navigate('/dashboard/registeredevents')
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 10C3 8.89543 3.89543 8 5 8H27C28.1046 8 29 8.89543 29 10V25C29 26.1046 28.1046 27 27 27H5C3.89543 27 3 26.1046 3 25V10ZM27 10H5V25H27V10Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.29289 2.29289C9.68342 1.90237 10.3166 1.90237 10.7071 2.29289L16 7.58579L21.2929 2.29289C21.6834 1.90237 22.3166 1.90237 22.7071 2.29289C23.0976 2.68342 23.0976 3.31658 22.7071 3.70711L16.7071 9.70711C16.3166 10.0976 15.6834 10.0976 15.2929 9.70711L9.29289 3.70711C8.90237 3.31658 8.90237 2.68342 9.29289 2.29289Z"
              fill="currentColor"
            />
          </svg>
          <p>Registered </p>
        </Button>
        <Button 
         isactive = {activeButton == 'editprofile'}
         onClick={()=>{
           setActiveButton('editprofile')
          navigate("/dashboard/editprofile")
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 5C12.134 5 9 8.13401 9 12C9 15.866 12.134 19 16 19C19.866 19 23 15.866 23 12C23 8.13401 19.866 5 16 5ZM7 12C7 7.02944 11.0294 3 16 3C20.9706 3 25 7.02944 25 12C25 16.9706 20.9706 21 16 21C11.0294 21 7 16.9706 7 12Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.0002 20.999C13.718 20.999 11.476 21.5998 9.49965 22.741C7.52328 23.8822 5.88215 25.5235 4.74124 27.5001C4.46514 27.9784 3.85356 28.1423 3.37525 27.8662C2.89693 27.5901 2.733 26.9785 3.0091 26.5002C4.32553 24.2196 6.21914 22.3257 8.49957 21.009C10.78 19.6922 13.3669 18.999 16.0002 18.999C18.6335 18.999 21.2203 19.6922 23.5008 21.009C25.7812 22.3257 27.6748 24.2196 28.9912 26.5002C29.2673 26.9785 29.1034 27.5901 28.6251 27.8662C28.1468 28.1423 27.5352 27.9784 27.2591 27.5001C26.1182 25.5235 24.4771 23.8822 22.5007 22.741C20.5243 21.5998 18.2823 20.999 16.0002 20.999Z"
              fill="currentColor"
            />
          </svg>
          <p>Profile</p>
        </Button>
      </div>
    </div>
  );
};

const Button = ({ children, isactive, onClick }:{children:ReactNode, isactive?:boolean, onClick:()=>void}) => {
  return (
    <button
      className={`text-lg rounded-lg px-3 py-4 flex gap-3 font-bold ${
        isactive ? "bg-primary text-white" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SideBar;
