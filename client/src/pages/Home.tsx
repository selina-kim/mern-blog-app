import { useEffect, useState } from "react";
import { BlogpostCard as BlogpostCardModel } from "../models/blogposts";
import BlogpostCard from "../components/BlogpostCard";

export function Home() {
  const [blogposts, setBlogposts] = useState<BlogpostCardModel[]>([]);

  useEffect(() => {
    async function loadBlogposts() {
      try {
        const response = await fetch("/api/blogposts", {
          method: "GET",
        });
        const newBlogposts = await response.json();
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
