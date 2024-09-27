import { Router } from "express";
import { eventSchema, updateEventSchema } from "../zod/eventSchema";
import {
  createNewEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../controllers/eventController";
import {
  authenticate,
  extractUserIdFromToken,
} from "../middlewares/authenticate";
import { authorizeOrganizer } from "../middlewares/authorizeOrganizer";
import {
  registerEvent,
  unRegisterEvent,
} from "../controllers/registerController";
import multer from "multer";
import path from "path";
import Stripe from "stripe";
import fs from "fs";
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET as string);

//multer to handle image upload

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single("image");

const router = Router();

// create the event
//also accepting Image (how tf do i modify it store and then save a ref to the db)
//do i send formData from the frontend (will json not work?i dont suppose we can do images in json.)

router.post("/", authenticate, upload, async (req, res) => {
  const date = new Date(req.body.date);
  const price = parseInt(req.body.price);
  console.log(req);
  console.log(req.body);
  console.log(req.file?.originalname);
  if (req.organizerId == undefined) {
    return res.json({ message: "Wrong Input" });
  }
  const { success, error } = eventSchema.safeParse({
    eventTitle: req.body.eventTitle,
    description: req.body.description,
    date: date,
    organizerId: req.organizerId,
    category: req.body.category,
    price: price,
    location: req.body.location,
  });
  if (!success) {
    return res.status(411).json({
      message: "Wrong Input",
      error: error.errors,
    });
  }
  try {
    if (req.file == undefined) {
      return res.json({
        message: "No Image Found",
      });
    }

    const fileName =
      req.file.originalname +
      "_" +
      Date.now() +
      path.extname(req.file.originalname);
    const imagePath = path.join(__dirname, "../../uploads", fileName);

    try {
      await fs.promises.writeFile(imagePath, req.file.buffer);
    } catch (err) {
      return res.status(500).json({
        message: "Error saving file",
        error: err,
      });
    }

    const event = await createNewEvent({
      eventTitle: req.body.eventTitle,
      description: req.body.description,
      date: date,
      organizerId: req.organizerId,
      category: req.body.category,
      price: price,
      imagePath: fileName,
      location: req.body.location,
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

//update the event
//also add image field
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

//delete the event
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

//get all events
//modify to send image also
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

//get event by their Id
//modify to send image also

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

//register for an event

router.post("/:id/rsvp", authenticate, async (req, res) => {
  //register for the event
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({ message: "Wrong User" });
    }
    const eventId = parseInt(req.params.id);
    const registered = await registerEvent(userId, eventId);

    res.json({ message: "Registered Successfully", registered });
  } catch (error) {
    console.error("Error occurred while Registering:", error);

    res.status(500).json({ message: "Error occurred while Registring", error });
  }
});

//unregister from an evnet

router.post("/:id/unrsvp", authenticate, async (req, res) => {
  //unregister for the event
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({ message: "Wrong User" });
    }
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

//stripe checkout route

router.post("/create-checkout-session", async (req, res) => {
  const YOUR_DOMAIN = process.env.YOUR_DOMAIN;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        // price: req.body.eventDetail.price,
        price_data: {
          currency: "inr",
          product_data: {
            name: req.body.eventDetail.eventTitle,
          },
          unit_amount: req.body.eventDetail.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}`,
    cancel_url: `${YOUR_DOMAIN}/eventdetails${req.body.eventDetail.id}`,
    metadata: {
      eventId: req.body.eventDetail.id,
    },
    client_reference_id: req.headers.token as string,
  });

  res.json(session.id);
});
export default router;
