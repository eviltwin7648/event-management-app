"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
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
        const token = authHeader.split(" ")[1];
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SCERET);
        req.body.userId = parseInt(decode.userId);
        req.body.organizerId = parseInt(decode.userId);
        next();
    }
    catch (error) {
        return res.status(403).json({
            message: "Invalid Token",
        });
    }
};
exports.authenticate = authenticate;
