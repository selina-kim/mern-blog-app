import { useEffect, useState } from "react";
import { BlogpostCard as BlogpostCardModel } from "../models/blogpostCard";
import BlogpostCard from "../components/BlogpostCard";
import * as BlogpostsApi from "../api/blogposts_api";

export function Home() {
  const [blogposts, setBlogposts] = useState<BlogpostCardModel[]>([]);

  useEffect(() => {
    async function loadBlogposts() {
      try {
        const newBlogposts = await BlogpostsApi.fetchBlogposts();
        setBlogposts(newBlogposts);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadBlogposts();
  }, []);

  return (
    <>
      <div className="mb-auto mt-8 grid grid-cols-1 gap-7 text-left">
        {blogposts.map((blogpost) => (
          <BlogpostCard blogpostCard={blogpost} key={blogpost._id} />
        ))}
      </div>
    </>
  );
}
