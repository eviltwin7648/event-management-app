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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventSchema_1 = require("../zod/eventSchema");
const eventController_1 = require("../controllers/eventController");
const authenticate_1 = require("../middlewares/authenticate");
const authorizeOrganizer_1 = require("../middlewares/authorizeOrganizer");
const registerController_1 = require("../controllers/registerController");
const router = (0, express_1.Router)();
router.post("/", authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date(req.body.date);
    console.log(date);
    console.log(req.body.date);
    const price = parseInt(req.body.price);
    const { success, error } = eventSchema_1.eventSchema.safeParse({
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
        const event = yield (0, eventController_1.createNewEvent)({
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
    }
    catch (error) {
        res.status(500).json({
            message: "Error Creating Event",
            error,
        });
    }
}));
router.put("/:id", authenticate_1.authenticate, authorizeOrganizer_1.authorizeOrganizer, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date(req.body.date);
    const eventId = parseInt(req.params.id);
    const { description, eventTitle } = req.body;
    const { success, error } = eventSchema_1.updateEventSchema.safeParse({
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
        const event = yield (0, eventController_1.updateEvent)({
            id: eventId,
            eventTitle,
            description,
            date,
        });
        res.json({
            message: "Event Updated Successfully",
            event,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error Updating Event",
            error,
        });
    }
}));
router.delete("/:id", authenticate_1.authenticate, authorizeOrganizer_1.authorizeOrganizer, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = parseInt(req.params.id);
    try {
        yield (0, eventController_1.deleteEvent)(eventId);
        res.status(200).json({
            message: "Event Deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error Deleting Event",
            error,
        });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield (0, eventController_1.getAllEvents)();
        if (!events) {
            return res.json({ message: "No Events Found" });
        }
        res.json({ events });
    }
    catch (error) {
        res.status(500).json({ message: "Error getting Events", error });
    }
}));
router.get("/:id", authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = parseInt(req.params.id);
        const event = yield (0, eventController_1.getEventById)(eventId);
        if (!event) {
            return res.json({ message: "No event Found" });
        }
        res.json(event);
    }
    catch (error) {
        res.json({
            message: "Error Fetching Event",
            error,
        });
    }
}));
router.post("/:id/rsvp", authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //register for the event
    try {
        const userId = parseInt(req.body.userId);
        const eventId = parseInt(req.params.id);
        const registered = yield (0, registerController_1.registerEvent)(userId, eventId);
        res.json({ message: "Registered Successfully", registered });
    }
    catch (error) {
        console.error("Error occurred while Registering:", error);
        res.status(500).json({ message: "Error occurred while Registring", error });
    }
}));
router.post("/:id/unrsvp", authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //unregister for the event
    try {
        const userId = parseInt(req.body.userId);
        const eventId = parseInt(req.params.id);
        const registered = yield (0, registerController_1.unRegisterEvent)(userId, eventId);
        res.json({ message: "UnRegistered Successfully", registered });
    }
    catch (error) {
        console.error("Error occurred while UnRegistering:", error);
        res
            .status(500)
            .json({ message: "Error occurred while UnRegistring", error });
    }
}));
exports.default = router;
