import { useEffect, useState } from "react";
import { getEventDetailsCall } from "../api/api";
import { useParams } from "react-router-dom";

interface EventDetailsType {
  eventTitle: string;
  description: string;
  date: string;
  price: number;
  category: string;
  organiser: {
    firstName: string;
    lastName: string;
  };
}

const EventDetails = () => {
  const { eventId } = useParams();
  const [eventDetail, setEventDetail] = useState<EventDetailsType | null>(null);
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

  return (
    <div>
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
        Price: ${eventDetail.price}
      </p>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        {eventDetail.organiser.firstName}
      </p>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        {eventDetail.organiser.lastName}
      </p>
    </div>
  );
};

export default EventDetails;
