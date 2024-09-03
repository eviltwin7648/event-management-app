import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getAllEvents } from "../api/api";

interface Event {
  id: string;
  eventTitle: string;
  description: string;
  date: string;
  category: string;
  price: number;
}

const Home = () => {
  const [loading, setLoading] = useState(true);

  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    getAllEvents().then((data) => {
      setEvents(data.events);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col     text-white ">
        <div className="py-8 h-[600px] flex justify-between mx-auto text-center">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Eventify!</h1>
            <h4 className="text-lg text-gray-300 mb-6">
              Discover, create, and manage events effortlessly with Eventify.
              Whether you're an organizer or an attendee, we have all the tools
              you need to make every event memorable.
            </h4>
          </div>
          <div className="flex flex-col justify-center ">
            <p className="text-xl font-semibold mb-4">What We Offer:</p>
            <ul className="list-disc list-inside  mb-6 text-left mx-auto ">
              <li className=" rounded ">
                Event Creation: Easily set up and manage your events. Add
                details, set dates, and make them stand out.
              </li>
              <li className="">
                Registration Management: Track and manage attendee registrations
                with ease.
              </li>
              <li className="  ">
                Personal Dashboard: View and manage your created events and
                registered events all in one place.
              </li>
              <li className="  ">
                Seamless Integration: Connect with other users, view events, and
                stay updated.
              </li>
            </ul>
          </div>
        </div>

        <h4 className="text-4xl font-bold text-center my-8">Explore Events:</h4>
        <div className="flex flex-row flex-wrap align-middle items-center justify-center ">
          {loading ? <p className="text-white">Loading...</p> : ""}
          {events.map((event) => (
            <EventCard
              title={event.eventTitle}
              key={event.id}
              description={event.description}
              date={event.date}
              registered={false}
              eventId={event.id}
              price={event.price}
              category={event.category}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
