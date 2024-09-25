import { useEffect, useState } from "react";
import { getEventsByUserCall } from "../services/api";
import EventCard from "../components/EventCard";

interface UserEventsType {
  id: string;
  eventTitle: string;
  imagePath: string;
  description: string;
  date: string;
  category: string;
  price: number;
  location:string
}

const YourEvents = () => {
  const [events, setEvents] = useState<UserEventsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getEventsByUserCall().then((res) => {
      if (res.message) {
        setMessage(res.message);
        setLoading(false);
        return;
      }
      setEvents(res.events);
      setLoading(false);
    });
  }, []);
  if (loading)
    return (
      <div className="flex justify-center min-h-screen items-center">
        <p className="text-center  align-middle ">Loading...</p>
      </div>
    );
  if (message)
    return (
      <div className="flex flex-col justify-center min-h-screen items-center">
        <p className="text-center  align-middle ">{message}</p>
        <br />
        <p className="text-center  align-middle "> Create some events....</p>
      </div>
    );

  return (
    <div className="flex flex-wrap">
      {events.map((event) => (
        <EventCard
          location={event.location}
          imagePath={event.imagePath}
          title={event.eventTitle}
          key={event.id}
          description={event.description}
          date={event.date}
          eventId={event.id}
          price={event.price}
          category={event.category}
        />
      ))}
    </div>
  );
};

export default YourEvents;
