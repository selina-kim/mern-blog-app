import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogpostSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: String,
    content: String,
    thumbnail: String,
    // author: { type: SchemaTypes.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const BlogpostModel = mongoose.model("Blogpost", BlogpostSchema);

export default BlogpostModel;
