import env from "../util/validateEnv";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Types } from "mongoose";

interface UsersErrorBody {
  username: string;
  email: string;
  password: string;
}

const handleUsersErrors = (error: any) => {
  let errors: UsersErrorBody = { email: "", username: "", password: "" };

  // Dupicate Error
  if (error.code === 11000) {
    if (error.keyValue.username) {
      errors.username =
        "Username already taken. Please choose a different one or log in instead.";
    }
    if (error.keyValue.email) {
      errors.email =
        "A user with this email address already exists. Please choose a different one or log in instead.";
    }

    return createHttpError(409, { errors });
  }

  // Validation Errors
  if (error.message.includes("User validation failed")) {
    Object.values(error.errors).forEach(({ properties }: any) => {
      errors[properties.path as keyof UsersErrorBody] = properties.message;
    });
  }

  return createHttpError(400, { errors });
};

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    const user = await UserModel.findById(decodedToken.id)
      .select("+email")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const createToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

interface SignupBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signup: RequestHandler<
  unknown,
  unknown,
  SignupBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordRaw,
    });

    const token = createToken(newUser._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: env.JWT_EXPIRES_IN * 1000,
      secure: true,
      sameSite: "none",
    });
    res.status(201).json({ user: newUser._id });
  } catch (error) {
    const userError = handleUsersErrors(error);
    console.error(userError);
    res.status(userError.status).json({ errors: userError.errors });
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameters missing.");
    }

    const user = await UserModel.findOne({ username })
      .select("+password +email")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials.");
    }

    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: env.JWT_EXPIRES_IN * 1000,
      secure: true,
      sameSite: "none",
    });
    res.status(201).json({ user: user._id });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
