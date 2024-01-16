import express from "express";
import * as BlogpostsController from "../controllers/blogpostsController";

const router = express.Router();

router.get("/", BlogpostsController.getBlogposts);

router.get("/:blogpostId", BlogpostsController.getBlogpost);

router.post("/", BlogpostsController.createBlogpost);

router.patch("/:blogpostId", BlogpostsController.updateBlogpost);

router.delete("/:blogpostId", BlogpostsController.deleteBlogpost);

export default router;
