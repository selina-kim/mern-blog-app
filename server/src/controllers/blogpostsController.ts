import { RequestHandler } from "express";
import BlogpostModel from "../models/BlogPost";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getBlogposts: RequestHandler = async (req, res, next) => {
  try {
    const blogposts = await BlogpostModel.find().exec();
    res.status(200).json(blogposts);
  } catch (error) {
    next(error);
  }
};

export const getBlogpost: RequestHandler = async (req, res, next) => {
  const blogpostId = req.params.blogpostId;

  try {
    if (!mongoose.isValidObjectId(blogpostId)) {
      throw createHttpError(400, "Invalid blog post ID.");
    }

    const blogpost = await BlogpostModel.findById(blogpostId).exec();

    if (!blogpost) {
      throw createHttpError(404, "Blog post not found.");
    }

    res.status(200).json(blogpost);
  } catch (error) {
    next(error);
  }
};

interface CreateBlogpostBody {
  title?: string;
  summary?: string;
  content?: string;
  thumbnail?: string;
}

export const createBlogpost: RequestHandler<
  unknown,
  unknown,
  CreateBlogpostBody,
  unknown
> = async (req, res, next) => {
  const { title, summary, content, thumbnail } = req.body;

  try {
    if (!title) {
      throw createHttpError(400, "Blog post must have a title.");
    }

    const newBlogpost = await BlogpostModel.create({
      title: title,
      summary: summary,
      content: content,
      thumbnail: thumbnail,
    });

    res.status(201).json(newBlogpost);
  } catch (error) {
    next(error);
  }
};
