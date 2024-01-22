import env from "../util/validateEnv";
import { RequestHandler } from "express";
import BlogpostModel from "../models/BlogPost";
import createHttpError from "http-errors";
import mongoose, { Types } from "mongoose";
import UserModel from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";

const findUserIdByUsername = async (username: string) => {
  const user = await UserModel.findOne({ username: username });
  if (user) return user._id;
};

const findUsernameByUserId = async (userId: Types.ObjectId) => {
  const user = await UserModel.findOne({ _id: userId });
  if (user) return user.username;
};

export const getBlogposts: RequestHandler = async (req, res, next) => {
  const username = req.params.username;

  try {
    const userId = await findUserIdByUsername(username);

    if (!mongoose.isValidObjectId(userId)) {
      throw createHttpError(400, "Invalid username.");
    }

    const blogposts = await BlogpostModel.find({
      userId: userId,
    })
      .select("-content -userId")
      .exec();

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

    const {
      _id,
      title,
      summary,
      content,
      thumbnail,
      createdAt,
      updatedAt,
      userId,
    } = blogpost;

    if (!mongoose.isValidObjectId(userId)) {
      throw createHttpError(400, "Invalid user ID.");
    }

    const username = await findUsernameByUserId(userId);

    res.status(200).json({
      _id,
      title,
      summary,
      content,
      thumbnail,
      createdAt,
      updatedAt,
      username,
    });
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

    const token = req.cookies.jwt;
    const { id } = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    const newBlogpost = await BlogpostModel.create({
      title: title,
      summary: summary,
      content: content,
      thumbnail: thumbnail,
      userId: id,
    });

    res.status(201).json(newBlogpost);
  } catch (error) {
    next(error);
  }
};

interface UpdateBlogpostParams {
  blogpostId: string;
}

interface UpdateBlogpostBody {
  title?: string;
  summary?: string;
  content?: string;
  thumbnail?: string;
}

export const updateBlogpost: RequestHandler<
  UpdateBlogpostParams,
  unknown,
  UpdateBlogpostBody,
  unknown
> = async (req, res, next) => {
  const blogpostId = req.params.blogpostId;
  const { title, summary, content, thumbnail } = req.body;

  try {
    if (!mongoose.isValidObjectId(blogpostId)) {
      throw createHttpError(400, "Invalid blog post ID.");
    }

    if (!title) {
      throw createHttpError(400, "Blog post must have a title.");
    }

    const blogpost = await BlogpostModel.findById(blogpostId).exec();

    if (!blogpost) {
      throw createHttpError(404, "Blog post not found.");
    }

    blogpost.title = title;
    blogpost.summary = summary;
    blogpost.content = content;
    blogpost.thumbnail = thumbnail;

    const updatedBlogpost = await blogpost.save();

    res.status(200).json(updatedBlogpost);
  } catch (error) {
    next(error);
  }
};

export const deleteBlogpost: RequestHandler = async (req, res, next) => {
  const blogpostId = req.params.blogpostId;

  try {
    if (!mongoose.isValidObjectId(blogpostId)) {
      throw createHttpError(400, "Invalid blog post ID.");
    }

    const blogpost = await BlogpostModel.findById(blogpostId).exec();

    if (!blogpost) {
      throw createHttpError(404, "Blog post not found.");
    }

    await blogpost.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
