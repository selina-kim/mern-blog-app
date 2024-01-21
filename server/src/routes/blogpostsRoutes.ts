import express from "express";
import * as BlogpostsController from "../controllers/blogpostsController";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/:username", BlogpostsController.getBlogposts);

router.get("/blogpost/:blogpostId", BlogpostsController.getBlogpost);

router.post("/blogpost", requiresAuth, BlogpostsController.createBlogpost);

router.patch(
  "/blogpost/:blogpostId",
  requiresAuth,
  BlogpostsController.updateBlogpost
);

router.delete(
  "/blogpost/:blogpostId",
  requiresAuth,
  BlogpostsController.deleteBlogpost
);

export default router;
