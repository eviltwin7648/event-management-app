import { useEffect, useState } from "react";
import { getRegisteredEventsCall } from "../services/api";
import EventCard from "../components/EventCard";

interface RegisteredEventsType {
  eventTitle: string;
  description: string;
  date: string;
  id: string;
}

const RegisteredEvents = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  console.log(message);

  const [registeredevents, setRegisteredevents] = useState<
    RegisteredEventsType[]
  >([]);

  useEffect(() => {
    getRegisteredEventsCall().then((response) => {
      console.log();
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
      <div className="flex justify-center min-h-screen items-center">
        <p className="text-center  align-middle text-white">Loading...</p>;
      </div>
    );
  if (message) {
    return (
      <div className="flex flex-col justify-center min-h-screen items-center">
        <p className="text-center align-middle text-white">{message}</p><br />
        <p className="text-center align-middle text-white">Register for some Events...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 h-screen   ">
      <div className="flex flex-wrap">
        {registeredevents.map((event) => (
          <EventCard
            key={event.date}
            eventId={event.id}
            title={event.eventTitle}
            description={event.description}
            date={event.date}
            registered={true}
          />
        ))}
      </div>
    </div>
  );
};

export default RegisteredEvents;
