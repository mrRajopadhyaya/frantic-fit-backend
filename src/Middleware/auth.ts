import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const { SECRET } = process.env;

const auth = (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers["x-access-token"] as string;
  if (!token) {
    return response.status(401).send("Access denied, No token provided");
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    request["user"] = decoded;
    next();
  } catch (e) {
    response.status(400).send("Invalid token.");
  }
};

export default auth;
