import { useEffect, useState } from "react";
import { getRegisteredEventsCall } from "../services/api";
import EventCard from "../components/EventCard";

interface RegisteredEventsType {
  id: string;
  eventTitle: string;
  imagePath: string;
  description: string;
  date: string;
  category: string;
  price: number;
  location:string;
}

const RegisteredEvents = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [registeredevents, setRegisteredevents] = useState<
    RegisteredEventsType[]
  >([]);

  console.log(registeredevents)

  useEffect(() => {
    getRegisteredEventsCall().then((response) => {
      if (response.message) {
        setMessage(response.message);
        setLoading(false);
        return;
      }
      setRegisteredevents(response.events);
      setLoading(false);
    });
  }, []);
  if (loading)
    return (
      <div className="flex justify-center  min-h-screen items-center">
        <p className="text-center  align-middle">Loading...</p>
      </div>
    );
  if (message) {
    return (
      <div className="flex flex-col justify-center min-h-screen items-center">
        <p className="text-center align-middlle">{message}</p>
        <br />
        <p className="text-center align-middle">Register for some Events...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap">
      {registeredevents.map((event) => (
        <EventCard
        imagePath={event.imagePath}
        title={event.eventTitle}
        key={event.id}
        description={event.description}
        date={event.date}
        registered={true}
        eventId={event.id}
        price={event.price}
        category={event.category}
        location={event.location}
        />
      ))}
    </div>
  );
};

export default RegisteredEvents;
