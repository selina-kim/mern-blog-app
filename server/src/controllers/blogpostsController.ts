import { RequestHandler } from "express";
import BlogpostModel from "../models/BlogPost";

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
    const blogpost = await BlogpostModel.findById(blogpostId).exec();

    res.status(200).json(blogpost);
  } catch (error) {
    next(error);
  }
};

export const createBlogpost: RequestHandler = async (req, res, next) => {
  const { title, summary, content, thumbnail } = req.body;

  try {
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
