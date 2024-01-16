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
