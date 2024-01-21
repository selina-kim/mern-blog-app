import env from "../util/validateEnv";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export const requiresAuth: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, env.JWT_SECRET);
    console.log(decodedToken);
    next();
  } catch (error) {
    next(createHttpError(401, "User not authenticated."));
  }
};
