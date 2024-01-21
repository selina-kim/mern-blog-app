import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { isEmail } from "validator";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: [4, "Minimum username length is 4 characters."],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    select: false,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email."],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [6, "Minimum password length is 6 characters."],
  },
});

// hash password before saving to db
UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
