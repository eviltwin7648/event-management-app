import { useEffect, useState } from "react";
import { getAllEvents, getEventDetailsCall } from "../services/api";
import { useParams } from "react-router-dom";
import RegisterNowCard from "../components/RegisterNowCard";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import EventCard from "../components/EventCard";

interface EventDetailsType {
  eventTitle: string;
  description: string;
  date: string;
  price: number;
  location: string;
  category: string;
  imagePath: string;
  organiser: {
    firstName: string;
    lastName: string;
  };
}

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

const EventDetails = () => {
  const { eventId } = useParams();
  const [eventDetail, setEventDetail] = useState<EventDetailsType | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const otherevents = events
    .filter((event) => event.id !== eventId)
    .slice(0, 6);

  const token = localStorage.getItem("token");
  const MakePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_SECRET);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/events/create-checkout-session`,
      {
        eventDetail,
      },
      {
        headers: {
          token,
        },
      }
    );

    const session = await response.data;
    console.log("res:", response);
    stripe?.redirectToCheckout({
      sessionId: session,
    });
  };

  useEffect(() => {
    getAllEvents().then((data) => {
      setEvents(data.events);
    });
  }, []);

  useEffect(() => {
    if (!eventId) {
      return;
    }
    getEventDetailsCall(eventId).then((response) => {
      setEventDetail(response);
    });
  }, [eventId]);

  if (!eventDetail) {
    return;
  }

  if (!eventId) {
    return;
  }

  const shortdescription =
    eventDetail.description.split(" ").slice(0, 50).join(" ") + "...";

  return (
    <div>
      <div
        className="relative flex flex-row h-[595px]  p-12 rounded-lg text-white"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_API_URL}/uploads/${eventDetail.imagePath})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50 filter blur-sm"></div>
        <div className="w-1/2 flex z-10 flex-col gap-5 justify-center ">
          <p className="text-[64px] leading-normal	 font-bold">
            {eventDetail.eventTitle}
          </p>
          <p className="text-3xl font-semibold">{eventDetail.location}</p>
          <p> {shortdescription}</p>
        </div>
        <div className="w-1/2 flex items-center z-10 justify-center ">
          <RegisterNowCard
            onClick={MakePayment}
            date={eventDetail.date}
            price={eventDetail.price}
          />
        </div>
      </div>
      <div className="flex p-10 gap-5">
        <div className="flex w-1/2 flex-col gap-5">
          <div>
            <p className="text-2xl font-bold mb-2">Description</p>
            <p className="text-gray-400">{eventDetail.description}</p>
          </div>
          <div>
            <p className="text-2xl font-bold mb-2">Organizer Details</p>
            <p className="text-gray-500">
              Organizer Name: {eventDetail.organiser.firstName}{" "}
              {eventDetail.organiser.lastName}
            </p>
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-5">
          <div>
            <p className="text-2xl font-bold mb-2">Event Location</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.845149576459!2d75.88887767543604!3d26.813058826706648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc873264c3df3%3A0x4c7b45a9ce474b8!2sVivekananda%20Global%20University!5e0!3m2!1sen!2sin!4v1726689494961!5m2!1sen!2sin"
              loading="lazy"
              width={480}
              height={240}
            ></iframe>
          </div>
          <div>
            <p className="text-2xl font-medium">{eventDetail.eventTitle}</p>
            <p className="text-gray-400">Dummy location for now</p>
          </div>
        </div>
      </div>
      <p className="text-2xl font-bold mb-2">Other events you may like</p>
      <div className="flex flex-row flex-wrap align-middle items-center justify-center ">
        {otherevents.map((event) => (
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
    </div>
  );
};

export default EventDetails;
