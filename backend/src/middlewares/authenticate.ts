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

    console.log(req.body);

    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SCERET as string) as {
      userId: string;
    };
    req.userId = parseInt(decode.userId);
    req.organizerId = parseInt(decode.userId);
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Wrong User",
    });
  }
};

export const extractUserIdFromToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.token as string;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const decode = jwt.verify(token, process.env.JWT_SCERET as string) as {
    userId: string;
  };
  req.userId = parseInt(decode.userId); // Ensure the decoded object has a userId property
  next();
};
