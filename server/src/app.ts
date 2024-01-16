import { config } from "dotenv";
config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import BlogpostModel from "./models/BlogPost";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
  })
);
app.use(express.json());

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
