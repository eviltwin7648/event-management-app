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
  console.log(imagePath);

  // const handleClick = () => {
  //   if (registere) {
  //     unRegisterEventCall(eventId).then((res) => {
  //       console.log(res);
  //       setregistere(() => !registere);
  //     });
  //   } else {
  //     registerEventCall(eventId).then((res) => {
  //       console.log(res);
  //       setregistere(() => !registere);
  //     });
  //   }
  // };
  return (
    // <div className="w-96 m-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    //   <img className="" src={} alt="" />
    //   <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //     {title}
    //   </h5>
    //   <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
    //     {category}
    //   </p>

    //   <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
    //     {}
    //   </p>
    //   <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">

    //   </p>

    //   <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
    //   </p>

    //   {/* <button
    //     onClick={handleClick}
    //     className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //   >
    //     {registere ? "Unregister" : "Register Now"}
    //     <svg
    //       className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
    //       aria-hidden="true"
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 14 10"
    //     >
    //       <path
    //         stroke="currentColor"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M1 5h12m0 0L9 1m4 4L9 9"
    //       />
    //     </svg>
    //   </button> */}
    // </div>
    <div className="w-96 m-5 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src={`${import.meta.env.VITE_API_KEY}/uploads/${imagePath}`}
          alt="image"
        />
      </a>
      <div className="p-2">
        <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p>{category}</p>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <p className="pb-2"> {formattedDate}</p>
        <p className="pb-2"> ₹ {price}</p>
        <Link
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          to={`/event/${eventId}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
