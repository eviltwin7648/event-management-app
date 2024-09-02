import { Router } from "express";
import {
  createNewUser,
  findUser,
  updateUser,
} from "../controllers/userController";
import { authenticate } from "../middlewares/authenticate";
import {
  signInValidation,
  signUpValidation,
  updateUserValidation,
} from "../zod/userSchema";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { getAllRegisteredEvents } from "../controllers/registerController";
import { getAllEventsByUserID } from "../controllers/eventController";
dotenv.config();

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { success, error } = signUpValidation.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Wrong Inputs",
        error,
      });
    }
    const user = await createNewUser(req.body);
    const userId = user.id;
    const token = jwt.sign({ userId }, process.env.JWT_SCERET as string);
    res.status(200).json({ message: "User Created Successfully", token });
  } catch (error) {
    console.error("Error Occured", error);
    res.status(500).json({ message: "Internal Server Error" });
    throw error;
  }
});

router.post("/login", async (req, res) => {
  try {
    const { success, error } = signInValidation.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Wrong Inputs",
        error,
      });
    }
    const user = await findUser(req.body.email, req.body.password);
    if (user == null) {
      return res.status(411).json({
        message: "User Does not exist",
      });
    }
    const userId = user.id;
    const token = jwt.sign({ userId }, process.env.JWT_SCERET as string);

    res.status(200).json({ message: "Logged In successfully", token });
  } catch (error) {
    console.log("Error Logging In", error);
    throw error;
  }
});

router.get("/rsvp", authenticate, async (req, res) => {
  try {
    const userId = parseInt(req.body.userId);
    const events = await getAllRegisteredEvents(userId);
    if (events.length == 0) {
      return res.json({ message: "No Events Found" });
    }
    res.json({ events });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Registered Events", error });
  }
});

router.put("/edit", authenticate, async (req, res) => {
  try {
    const { success, error } = updateUserValidation.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Wrong Input",
        error,
      });
    }
    const user = await updateUser({
      id: req.body.userId,
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.json({ message: "User Updated Successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

router.get("/alluserevents", authenticate, async (req, res) => {
  const id = parseInt(req.body.userId);
  try {
    const events = await getAllEventsByUserID(id);
    if (events.length == 0) {
      return res.json({ message: "No event Found" });
    }
    res.json({ events });
  } catch (error) {
    console.error("Error occurred while fetching events:", error);

    res
      .status(500)
      .json({ message: "Error occurred while getting Events", error });
  }
});

export default router;
