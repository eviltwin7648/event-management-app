import { Response, Request, NextFunction } from "express";
import { getEventById } from "../controllers/eventController";

export const authorizeOrganizer = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const eventId = parseInt(req.params.id);
    const userId = parseInt(req.body.userId);

    const event = await getEventById(eventId);

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
  } catch (error) {
    console.log("Error Occurred", error);
    res.status(500).json({ message: "Server Error Occurred" });
  }
};
