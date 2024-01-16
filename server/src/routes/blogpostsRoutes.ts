import express from "express";
import * as BlogpostsController from "../controllers/blogpostsController";

const router = express.Router();

router.get("/", BlogpostsController.getBlogposts);

router.get("/:blogpostId", BlogpostsController.getBlogpost);

router.post("/", BlogpostsController.createBlogpost);

export default router;
