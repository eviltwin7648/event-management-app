import { json, Router } from "express";
import { eventSchema, updateEventSchema } from "../zod/eventSchema";
import {
  createNewEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../controllers/eventController";
import { authenticate } from "../middlewares/authenticate";
import { authorizeOrganizer } from "../middlewares/authorizeOrganizer";
import {
  registerEvent,
  unRegisterEvent,
} from "../controllers/registerController";

const router = Router();

router.post("/", authenticate, async (req, res) => {
  const date = new Date(req.body.date);
  console.log(date);
  console.log(req.body.date);
  const price = parseInt(req.body.price);

  const { success, error } = eventSchema.safeParse({
    eventTitle: req.body.eventTitle,
    description: req.body.description,
    date: date,
    organizerId: req.body.organizerId,
    category: req.body.category,
    price: price,
  });
  if (!success) {
    return res.status(411).json({
      message: "Wrong Input",
      error: error.errors,
    });
  }
  try {
    const event = await createNewEvent({
      eventTitle: req.body.eventTitle,
      description: req.body.description,
      date: date,
      organizerId: req.body.organizerId,
      category: req.body.category,
      price: price,
    });
    res.json({
      message: "Event created Successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Creating Event",
      error,
    });
  }
});

router.put("/:id", authenticate, authorizeOrganizer, async (req, res) => {
  const date = new Date(req.body.date);
  const eventId = parseInt(req.params.id);

  const { description, eventTitle } = req.body;

  const { success, error } = updateEventSchema.safeParse({
    eventTitle,
    description,
    date,
  });

  if (!success) {
    return res.status(411).json({
      message: "Wrong Innput",
      error,
    });
  }

  try {
    const event = await updateEvent({
      id: eventId,
      eventTitle,
      description,
      date,
    });

    res.json({
      message: "Event Updated Successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Updating Event",
      error,
    });
  }
});

router.delete("/:id", authenticate, authorizeOrganizer, async (req, res) => {
  const eventId = parseInt(req.params.id);
  try {
    await deleteEvent(eventId);
    res.status(200).json({
      message: "Event Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Deleting Event",
      error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await getAllEvents();
    if (!events) {
      return res.json({ message: "No Events Found" });
    }
    res.json({ events });
  } catch (error) {
    res.status(500).json({ message: "Error getting Events", error });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const event = await getEventById(eventId);
    if (!event) {
      return res.json({ message: "No event Found" });
    }
    res.json(event);
  } catch (error) {
    res.json({
      message: "Error Fetching Event",
      error,
    });
  }
});

router.post("/:id/rsvp", authenticate, async (req, res) => {
  //register for the event
  try {
    const userId = parseInt(req.body.userId);
    const eventId = parseInt(req.params.id);
    const registered = await registerEvent(userId, eventId);

    res.json({ message: "Registered Successfully", registered });
  } catch (error) {
    console.error("Error occurred while Registering:", error);

    res.status(500).json({ message: "Error occurred while Registring", error });
  }
});

router.post("/:id/unrsvp", authenticate, async (req, res) => {
  //unregister for the event
  try {
    const userId = parseInt(req.body.userId);
    const eventId = parseInt(req.params.id);
    const registered = await unRegisterEvent(userId, eventId);

    res.json({ message: "UnRegistered Successfully", registered });
  } catch (error) {
    console.error("Error occurred while UnRegistering:", error);

    res
      .status(500)
      .json({ message: "Error occurred while UnRegistring", error });
  }
});

export default router;
