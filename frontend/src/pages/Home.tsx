import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getAllEvents } from "../services/api";
import HeroImage from "../assets/Hero.png";
import Search from "../components/Search";
import HomeCreateEvent from "../components/HomeCreateEvent";
import spotify from "../assets/spotify.png";
import google from "../assets/google.png";
import grab from "../assets/grab.png";
import medium from "../assets/medium.png";
import microsoft from "../assets/microsoft.png";
import stripe from "../assets/stripe.png";
import uber from "../assets/uber.png";
import youtube from "../assets/youtube.png";
import zoom from "../assets/zoom.png";

interface Event {
  id: string;
  eventTitle: string;
  imagePath: string;
  description: string;
  date: string;
  category: string;
  price: number;
  location: string;
}

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    getAllEvents().then((data) => {
      setEvents(data.events);
      setFilteredEvents(data.events);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    const filtered = events.filter((event) => {
      const matchedCategory = selectedCategory
        ? event.category == selectedCategory
        : true;
      const matchedLocation = selectedLocation
        ? event.location == selectedLocation
        : true;
      return matchedCategory && matchedLocation;
    });

    setFilteredEvents(filtered);
    console.log(filtered);
  }, [selectedCategory, selectedLocation, events]);

  useEffect(() => {
    const filtered = events.filter((event) =>
      event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const location = [...new Set(events.map((event) => event.location))];
  const category = [...new Set(events.map((event) => event.category))];

  return (
    <>
      <div className="relative">
        <img src={HeroImage} alt="hero-image" className="w-full h-auto" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-7xl text-center font-bold mb-48">
            MADE FOR THOSE <br /> WHO DO
          </h1>
        </div>
        <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2 ">
          <Search
            location={location}
            category={category}
            setSelectedCategory={setSelectedCategory}
            setSelectedLocation={setSelectedLocation}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />
        </div>
      </div>

      <h4 className="mt-36 text-4xl font-bold text-left my-8">
        Upcoming <span className="text-primary">Events</span>
      </h4>
      <div className="flex flex-row flex-wrap align-middle items-center justify-center ">
        {loading ? <p className="text-white">Loading...</p> : ""}
        {filteredEvents.map((event) => (
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
            location={event.location}
          />
        ))}
      </div>
      <HomeCreateEvent />
      <div className="flex flex-col gap-5 my-5">
        <p className="font-bold text-center text-4xl">
          Join these <span className="text-primary">brands</span>
        </p>
        <p className="text-center font-bold">
          We've had the pleasure of working with industry-defining brands. These
          are just some of them.
        </p>
        <div className="flex flex-wrap gap-5 justify-center items-center">
          <img className="" src={spotify} alt="" />
          <img src={google} alt="" />
          <img src={medium} alt="" />
          <img src={uber} alt="" />
          <img src={youtube} alt="" />
          <img src={zoom} alt="" />
          <img src={grab} alt="" />
          <img src={microsoft} alt="" />
          <img src={stripe} alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
