import { config } from "dotenv";
config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import blogpostsRoutes from "./routes/blogpostsRoutes";

const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:5174",
  })
);
app.use(express.json());

// Endpoints
app.use("/api/blogposts", blogpostsRoutes);

// Non-existent Endpoint Handler Middleware
app.use((req, res, next) => {
  next(Error("Endpoint not found."));
});

// Error Handler Middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occured.";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
