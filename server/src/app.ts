import { config } from "dotenv";
config();
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";

import blogpostsRoutes from "./routes/blogpostsRoutes";
import userRoutes from "./routes/usersRoutes";
import env from "../src/util/validateEnv";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    methods: "GET,POST,DELETE,PATCH",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Endpoints
app.use("/api/users", userRoutes);
app.use("/api/blog", blogpostsRoutes);

// Non-existent Endpoint Handler Middleware
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found."));
});

// Error Handler Middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occured.";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
