import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
  })
);
app.use(express.json());


export default app;
