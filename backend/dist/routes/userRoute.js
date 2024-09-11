"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authenticate_1 = require("../middlewares/authenticate");
const userSchema_1 = require("../zod/userSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const registerController_1 = require("../controllers/registerController");
const eventController_1 = require("../controllers/eventController");
dotenv.config();
const router = (0, express_1.Router)();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success, error } = userSchema_1.signUpValidation.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Wrong Inputs",
                error,
            });
        }
        const user = yield (0, userController_1.createNewUser)(req.body);
        const userId = user.id;
        const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SCERET);
        res.status(200).json({ message: "User Created Successfully", token });
    }
    catch (error) {
        console.error("Error Occured", error);
        res.status(500).json({ message: "Internal Server Error" });
        throw error;
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success, error } = userSchema_1.signInValidation.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Wrong Inputs",
                error,
            });
        }
        const user = yield (0, userController_1.findUser)(req.body.email, req.body.password);
        if (user == null) {
            return res.status(411).json({
                message: "User Does not exist",
            });
        }
        const userId = user.id;
        const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SCERET);
        res.status(200).json({ message: "Logged In successfully", token });
    }
    catch (error) {
        console.log("Error Logging In", error);
        throw error;
    }
}));
router.get("/rsvp", authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.json({ message: "Wrong User" });
        }
        const events = yield (0, registerController_1.getAllRegisteredEvents)(userId);
        if (events.length == 0) {
            return res.json({ message: "No Events Found" });
        }
        res.json({ events });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error Fetching Registered Events", error });
    }
}));
router.put("/edit", authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success, error } = userSchema_1.updateUserValidation.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Wrong Input",
                error,
            });
        }
        if (!req.userId) {
            return res.json({ message: "Wrong User" });
        }
        const user = yield (0, userController_1.updateUser)({
            id: req.userId,
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        res.json({ message: "User Updated Successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
}));
router.get("/alluserevents", authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    if (!id) {
        return res.json({ message: "Wrong User" });
    }
    try {
        const events = yield (0, eventController_1.getAllEventsByUserID)(id);
        if (events.length == 0) {
            return res.json({ message: "No event Found" });
        }
        res.json({ events });
    }
    catch (error) {
        console.error("Error occurred while fetching events:", error);
        res
            .status(500)
            .json({ message: "Error occurred while getting Events", error });
    }
}));
exports.default = router;
