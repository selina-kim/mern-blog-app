import express from "express";
import * as BlogpostsController from "../controllers/blogpostsController";

const router = express.Router();

router.get("/", BlogpostsController.getBlogposts);

export default router;
