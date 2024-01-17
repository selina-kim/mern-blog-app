import { useEffect, useState } from "react";
import { BlogpostCard as BlogpostCardModel } from "../models/blogpostCard";
import BlogpostCard from "../components/BlogpostCard";
import * as BlogpostsApi from "../api/blogposts_api";

export function Home() {
  const [blogpostCards, setBlogpostCards] = useState<BlogpostCardModel[]>([]);

  useEffect(() => {
    async function loadBlogpostCards() {
      try {
        const newBlogpostCards = await BlogpostsApi.fetchBlogposts();
        setBlogpostCards(newBlogpostCards);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadBlogpostCards();
  }, []);

  async function deleteBlogpostCard(blogpostCard: BlogpostCardModel) {
    try {
      await BlogpostsApi.deleteBlogpost(blogpostCard._id);
      setBlogpostCards(
        blogpostCards.filter(
          (existingBlogpostCard) =>
            existingBlogpostCard._id != blogpostCard._id,
        ),
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <>
      <div className="mb-auto mt-8 grid grid-cols-1 gap-7 text-left">
        {blogpostCards.map((blogpostCard) => (
          <BlogpostCard
            blogpostCard={blogpostCard}
            key={blogpostCard._id}
            onDeleteBlogpostClicked={deleteBlogpostCard}
          />
        ))}
      </div>
    </>
  );
}
