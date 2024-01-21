import mongoose, { SchemaTypes } from "mongoose";

const Schema = mongoose.Schema;

const BlogpostSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: String,
    content: String,
    thumbnail: String,
    userId: { type: SchemaTypes.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

const BlogpostModel = mongoose.model("Blogpost", BlogpostSchema);

export default BlogpostModel;
