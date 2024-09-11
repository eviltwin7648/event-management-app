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
exports.authorizeOrganizer = void 0;
const eventController_1 = require("../controllers/eventController");
const authorizeOrganizer = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eventId = parseInt(req.params.id);
            const userId = req.userId;
            const event = yield (0, eventController_1.getEventById)(eventId);
            if (!event) {
                return res.json("Event Does not Exist");
            }
            if (event.organizerId == userId) {
                req.body.eventId = eventId;
                return next();
            }
            return res.json({
                message: "You do not have the Authority to make changes to the Event",
            });
        }
        catch (error) {
            console.log("Error Occurred", error);
            res.status(500).json({ message: "Server Error Occurred" });
        }
    });
};
exports.authorizeOrganizer = authorizeOrganizer;
