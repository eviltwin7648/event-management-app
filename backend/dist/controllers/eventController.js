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
exports.createNewEvent = createNewEvent;
exports.updateEvent = updateEvent;
exports.getAllEvents = getAllEvents;
exports.getEventById = getEventById;
exports.deleteEvent = deleteEvent;
exports.getAllEventsByUserID = getAllEventsByUserID;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createNewEvent(_a) {
    return __awaiter(this, arguments, void 0, function* ({ eventTitle, description, date, organizerId, }) {
        try {
            const res = yield prisma.event.create({
                data: {
                    eventTitle,
                    description,
                    date,
                    organizerId,
                },
            });
            return res;
        }
        catch (error) {
            console.log("Error Creating Event:", error);
            throw new Error("Failed to create event");
        }
    });
}
function updateEvent(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, eventTitle, description, date, }) {
        const data = {};
        if (eventTitle !== undefined) {
            data.eventTitle = eventTitle;
        }
        if (description !== undefined) {
            data.description = description;
        }
        if (date !== undefined) {
            data.date = date;
        }
        try {
            const res = yield prisma.event.update({
                where: {
                    id: id,
                },
                data: data,
            });
            return res;
        }
        catch (error) {
            console.log("Error Updating Event", error);
            throw error;
        }
    });
}
function getAllEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.event.findMany();
            return res;
        }
        catch (error) {
            console.log("Error Fetching Events", error);
            throw error;
        }
    });
}
function getEventById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.event.findUnique({
                where: {
                    id: id,
                },
                include: {
                    organiser: {
                        select: {
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            });
            return res;
        }
        catch (error) {
            console.log("Error getting Event", error);
            throw error;
        }
    });
}
function deleteEvent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.event.delete({
                where: {
                    id: id,
                },
            });
            return res;
        }
        catch (error) {
            console.log("Error deleting Event", error);
            throw error;
        }
    });
}
function getAllEventsByUserID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.event.findMany({
                where: {
                    organizerId: id,
                },
            });
            return res;
        }
        catch (error) {
            console.log("Error fetching user's events", error);
            throw error;
        }
    });
}
