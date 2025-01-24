import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers["authorization"]?.split(" ")[1];
  try {
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token not provided",
      });
    }

    const decode = jwt.verify(token, "SECRET");
    res.locals.user = decode;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid expired token",
    });
  }
};
