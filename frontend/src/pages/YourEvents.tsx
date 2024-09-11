import { useEffect, useState } from "react";
import EventList from "../components/EventList";
import { getEventsByUserCall } from "../services/api";

interface UserEventsType {
  id: number;
  eventTitle: string;
  description: string;
  date: string;
  organizerId: 2;
}

const YourEvents = () => {
  const [events, setEvents] = useState<UserEventsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getEventsByUserCall().then((res) => {
      if(res.message){
        setMessage(res.message)
        setLoading(false)
        return
      }
      setEvents(res.events);
      setLoading(false);
    });
  }, []);
  if (loading)
    return (
      <div className="flex justify-center min-h-screen items-center">
        <p className="text-center  align-middle text-white">Loading...</p>;
      </div>
    );
    if (message)
      return (
        <div className="flex flex-col justify-center min-h-screen items-center">
          <p className="text-center  align-middle text-white">{message}</p><br />
          <p className="text-center  align-middle text-white"> Create some events....</p>
        </div>
      );


  return (
    <div className="flex flex-wrap">
      {events.map((event) => (
        <EventList
          title={event.eventTitle}
          description={event.description}
          date={event.date}
          id={event.id}
          key={event.id}
        />
      ))}
    </div>
  );
};

export default YourEvents;
