import { useEffect, useState } from "react";
import {
  getEventDetailsCall,
  unRegisterEventCall,
  registerEventCall,
} from "../services/api";
import { useParams } from "react-router-dom";

interface EventDetailsType {
  eventTitle: string;
  description: string;
  date: string;
  price: number;
  category: string;
  imagePath:string
  organiser: {
    firstName: string;
    lastName: string;
  };
}

const EventDetails = () => {
  const { eventId } = useParams();
  const [eventDetail, setEventDetail] = useState<EventDetailsType | null>(null);
  const [registered, setregistered] = useState(false);

  useEffect(() => {
    if (!eventId) {
      return;
    }
    console.log(eventId);
    getEventDetailsCall(eventId).then((response) => {
      setEventDetail(response);
      console.log(response);
    });
  }, [eventId]);

  if (!eventDetail) {
    return;
  }

  if (!eventId){
    return
  }
  const handleClick = () => {
    if (registered) {
      unRegisterEventCall(eventId).then((res) => {
        console.log(res);
        setregistered(() => !registered);
      });
    } else {
      registerEventCall(eventId).then((res) => {
        console.log(res);
        setregistered(() => !registered);
      });
    }
  };

  return (
    <div className="w-96 m-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="max-w-80"
        src={`http://localhost:3000/uploads/${eventDetail.imagePath}`}
        alt="image"
      />
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {eventDetail.eventTitle}
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {eventDetail.description}
      </p>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        Date: {new Date(eventDetail.date).toLocaleString()}
      </p>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        Category: {eventDetail.category}
      </p>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        Price: ₹ {eventDetail.price}
      </p>
      <div>
        <p className="text-gray-600 dark:text-gray-400 ">
          {eventDetail.organiser.firstName}
        </p>
        <p className="text-gray-600 dark:text-gray-400 ">
          {eventDetail.organiser.lastName}
        </p>
      </div>
      <button
        onClick={handleClick}
        className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {registered ? "Unregister" : "Register Now"}
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  );
};

export default EventDetails;
