import { config } from "dotenv";
config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch(console.error);
