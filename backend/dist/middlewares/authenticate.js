"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUserIdFromToken = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const authenticate = function (req, res, next) {
    var _a;
    try {
        let authHeader = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.toString();
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(411).json({
                message: "Wrong Header",
            });
        }
        console.log(req.body);
        const token = authHeader.split(" ")[1];
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SCERET);
        req.userId = parseInt(decode.userId);
        req.organizerId = parseInt(decode.userId);
        next();
    }
    catch (error) {
        return res.status(403).json({
            message: "Wrong User",
        });
    }
};
exports.authenticate = authenticate;
const extractUserIdFromToken = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SCERET);
    req.userId = parseInt(decode.userId); // Ensure the decoded object has a userId property
    next();
};
exports.extractUserIdFromToken = extractUserIdFromToken;
