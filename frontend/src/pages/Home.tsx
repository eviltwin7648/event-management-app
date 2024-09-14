import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getAllEvents } from "../services/api";
import HeroImage from "../assets/Hero.png";
import Search from "../components/Search";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import HomeCreateEvent from "../components/HomeCreateEvent";
interface Event {
  id: string;
  eventTitle: string;
  imagePath: string;
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
      <NavBar />
      <div className="relative">
        <img src={HeroImage} alt="hero-image" className="w-full h-auto" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-7xl text-center font-bold mb-48">MADE FOR THOSE <br /> WHO DO</h1>
        </div>
        <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2 ">
          <Search />
        </div>
      </div>

      <h4 className="mt-36 text-4xl font-bold text-left my-8">
        Upcoming <span className="text-primary">Events</span>
      </h4>
      <div className="flex flex-row flex-wrap align-middle items-center justify-center ">
        {loading ? <p className="text-white">Loading...</p> : ""}
        {events.map((event) => (
          <EventCard
            imagePath={event.imagePath}
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
      <div className="flex justify-center">
        <Button title="Load More..." link="/" />
      </div>
      <HomeCreateEvent/>
    </>
  );
};

export default Home;
