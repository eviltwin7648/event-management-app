"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const eventRoute_1 = __importDefault(require("./routes/eventRoute"));
require("dotenv").config();
const path_1 = __importDefault(require("path"));
const stripe_1 = __importDefault(require("stripe"));
const registerController_1 = require("./controllers/registerController");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET);
const endpointSecret = process.env.WEBHOOK_SECRET;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "https://events.vishalrai.tech/" }));
app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
        next(); // Skip express.json() for /webhook
    }
    else {
        express_1.default.json()(req, res, next); // Apply express.json() to other routes
    }
});
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
console.log(path_1.default.join(__dirname, "./uploads"));
app.use("/user", userRoute_1.default);
app.use("/events", eventRoute_1.default);
//stripe webhook
app.post("/webhook", express_1.default.raw({ type: "application/json" }), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const sig = request.headers["stripe-signature"];
    if (!sig) {
        return response.status(400).send("Missing Stripe signature");
    }
    let event;
    try {
        // Construct Stripe event from webhook
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    }
    catch (err) {
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
        console.log(session);
        if (!session.metadata) {
            return response.status(400).send("Missing metadata in session");
        }
        const userId = Number(session.client_reference_id); //  
        const eventId = parseInt(session.metadata.eventId);
        // Ensure userId and eventId are valid
        if (!userId || isNaN(eventId)) {
            return response.status(400).send("Invalid userId or eventId");
        }
        try {
            // Register the user for the event
            yield (0, registerController_1.registerEvent)(userId, eventId);
            console.log(`User ${userId} registered for event ${eventId}`);
        }
        catch (err) {
            console.error("Error adding registration to database:", err);
            return response.status(500).send("Internal Server Error");
        }
    }
    // Send response to Stripe
    response.json({ received: true });
}));
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log("Server is up and running on PORT:" + PORT);
});
