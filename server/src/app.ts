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

app.get("/", async (req, res) => {
  const blogposts = await BlogpostModel.find().exec();
  res.status(200).json(blogposts);
});


export default app;
