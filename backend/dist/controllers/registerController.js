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
exports.registerEvent = registerEvent;
exports.unRegisterEvent = unRegisterEvent;
exports.getAllRegisteredEvents = getAllRegisteredEvents;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function registerEvent(userId, eventId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.registered.create({
                data: {
                    userId,
                    eventId,
                },
            });
            return res;
        }
        catch (error) {
            console.log("Error registering  for the event", error);
            throw error;
        }
    });
}
function unRegisterEvent(userId, eventId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.registered.delete({
                where: {
                    userId_eventId: {
                        eventId: eventId,
                        userId: userId,
                    },
                },
            });
            return res;
        }
        catch (error) {
            console.log("Error Unregistering for the event", error);
            throw error;
        }
    });
}
function getAllRegisteredEvents(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.registered.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    event: {
                        select: {
                            id: true,
                            eventTitle: true,
                            description: true,
                            date: true,
                        },
                    },
                },
            });
            const events = res.map((registered) => registered.event);
            return events;
        }
        catch (error) {
            console.log("Error getting the Registered Events", error);
            throw error;
        }
    });
}
