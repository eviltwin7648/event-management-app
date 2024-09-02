import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
require("dotenv").config();

export const authenticate = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let authHeader = req.headers.authorization?.toString();

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(411).json({
        message: "Wrong Header",
      });
    }
    

    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SCERET as string) as {
      userId: string;
    };
    req.body.userId = parseInt(decode.userId)
    req.body.organizerId = parseInt(decode.userId);
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Wrong User",
    });
  }
};
