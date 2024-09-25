import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteEventCall } from "../services/api";

interface EventCardTypes {
  title: string;
  description?: string;
  date: string;
  registered?: boolean;
  imagePath?: string;
  eventId: string;
  category?: string;
  price?: number;
  location:string
}

const EventCard = ({
  title,
  date,
  imagePath,
  eventId,
  category,
  price,
  location
}: EventCardTypes) => {
  // const [registere, setregistere] = useState(registered);
  const newDate = new Date(date);
  const formattedDate = format(newDate, "MMMM dd, yyyy");
  const navigate = useNavigate();
  const deleteEvent = () => {
    deleteEventCall(eventId);
    navigate('/')
  };

  const route = useLocation();

  return (
    <div
      onClick={() => navigate(`/event/${eventId}`)}
      className="h-[400px] relative cursor-pointer rounded-[10px] m-auto my-5 p-5 bg-white border shadow"
    >
      <div className="w-[347px]  relative h-[240px]">
        <img
          className="rounded-t-lg object-cover w-full h-full"
          src={`${import.meta.env.VITE_API_URL}/uploads/${imagePath}`}
          alt="image"
        />
        <p className="text-xs absolute top-2 left-2 bg-white text-primary bg-opacity-70 p-1 rounded">
          {" "}
          {price == 0 ? "FREE" : `₹${price}`}
        </p>
      </div>

      <div className="flex flex-col p-2 justify-between h-28">
        <h5 className=" text-lg font-normal tracking-tight text-black ">
          {title}
        </h5>
        <p className="text-gray-600 text-sm">{category}</p>

        <p className=" text-sm text-primary"> {formattedDate}</p>
        <p className="text-gray-600">{location}</p>
      </div>
      {route.pathname == '/dashboard/yourevents' && (
        <button
        onClick={deleteEvent}
        className="h-6 absolute right-2 bottom-2 w-6"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M10 12V17"
              stroke="#d51a1a"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M14 12V17"
              stroke="#d51a1a"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M4 7H20"
              stroke="#d51a1a"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
              stroke="#d51a1a"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
              stroke="#d51a1a"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </button>
      )}
      
    </div>
  );
};

export default EventCard;
