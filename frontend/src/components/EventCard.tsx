import { format } from "date-fns";
import { Link } from "react-router-dom";

interface EventCardTypes {
  title: string;
  description: string;
  date: string;
  registered?: boolean;
  imagePath?: string;
  eventId: string;
  category?: string;
  price?: number;
}

const EventCard = ({
  title,
  description,
  date,
  imagePath,
  eventId,
  category,
  price,
}: EventCardTypes) => {
  // const [registere, setregistere] = useState(registered);
  const newDate = new Date(date);
  const formattedDate = format(newDate, "MMMM dd, yyyy");
  const url = import.meta.env.VITE_API_URL;
  console.log(url);

  return (
    <div className="h-[400px] rounded-[10px] m-auto my-5 p-5 bg-white border shadow">
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

      <div className="flex flex-col justify-between h-28">
        <h5 className=" text-base font-normal tracking-tight text-black ">
          {title}
        </h5>
        {/* <p>{category}</p> */}

        {/* <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p> */}
        <p className=" text-sm text-primary"> {formattedDate}</p>
        <p className="text-gray-600">Location</p>
        {/* <Link
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          to={`/event/${eventId}`}
        >
          View Details
        </Link> */}
      </div>
    </div>
  );
};

export default EventCard;
