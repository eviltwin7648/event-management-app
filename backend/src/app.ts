import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute";
import eventsRoute from "./routes/eventRoute";
require("dotenv").config();
import path from "path";
import { extractUserIdFromToken } from "./middlewares/authenticate";
import Stripe from "stripe";
import { registerEvent } from "./controllers/registerController";

const stripe = new Stripe(process.env.STRIPE_SECRET as string);

const endpointSecret = process.env.WEBHOOK_SECRET as string;

const app = express();


app.use(cors({ origin: "https://event-management-app-eight.vercel.app" }));

app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();  // Skip express.json() for /webhook
  } else {
    express.json()(req, res, next);  // Apply express.json() to other routes
  }
});


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
console.log(path.join(__dirname, "./uploads"));
app.use("/user", userRoute);
app.use("/events", eventsRoute);

//stripe webhook
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  extractUserIdFromToken,
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    if (!sig) {
      return response.status(400).send("Missing Stripe signature");
    }

    let event;

    try {
      // Construct Stripe event from webhook
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.error("Error verifying webhook signature:", err);
      return response.status(400).send(`Webhook Error: ${err}`);
    }

    // If event is not constructed, return error
    if (!event) {
      return response.status(400).send("Invalid event");
    }

    // Handle the event types
    if (event.type === "checkout.session.completed") {
      const session = event.data.object; // TypeScript type for session object

      if (!session.metadata) {
        return response.status(400).send("Missing metadata in session");
      }

      const userId = request.userId; // Extracted from the token by middleware
      const eventId = parseInt(session.metadata.eventId);

      // Ensure userId and eventId are valid
      if (!userId || isNaN(eventId)) {
        return response.status(400).send("Invalid userId or eventId");
      }

      try {
        // Register the user for the event
        await registerEvent(userId, eventId);
        console.log(`User ${userId} registered for event ${eventId}`);
      } catch (err) {
        console.error("Error adding registration to database:", err);
        return response.status(500).send("Internal Server Error");
      }
    }

    // Send response to Stripe
    response.json({ received: true });
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is up and running on PORT:" + PORT);
});
