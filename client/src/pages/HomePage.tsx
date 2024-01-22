import { useEffect, useState } from "react";
import { BlogpostCard as BlogpostCardModel } from "../models/blogpostCard";
import BlogpostCard from "../components/BlogpostCard";
import * as BlogpostsApi from "../api/blogposts_api";
import { ScaleLoader } from "react-spinners";
import { User } from "../models/user";
import { useParams } from "react-router-dom";

interface HomePageProps {
  loggedInUser: User | null;
}

export function HomePage({ loggedInUser }: HomePageProps) {
  const { username } = useParams();
  const [blogpostCards, setBlogpostCards] = useState<BlogpostCardModel[]>([]);
  const [blogpostCardsLoading, setBlogpostCardsLoading] = useState(true);
  const [showBlogpostCardsLoadingError, setShowBlogpostCardsLoadingError] =
    useState(false);

  useEffect(() => {
    async function loadBlogpostCards() {
      try {
        setShowBlogpostCardsLoadingError(false);
        setBlogpostCardsLoading(true);
        const newBlogpostCards = await BlogpostsApi.fetchBlogposts(username!);
        setBlogpostCards(newBlogpostCards);
      } catch (error) {
        console.error(error);
        setShowBlogpostCardsLoadingError(true);
      } finally {
        setBlogpostCardsLoading(false);
      }
    }
    loadBlogpostCards();
  }, []);

  async function deleteBlogpost(blogpostId: string) {
    try {
      await BlogpostsApi.deleteBlogpost(blogpostId);
      setBlogpostCards(
        blogpostCards.filter(
          (existingBlogpostCard) => existingBlogpostCard._id != blogpostId,
        ),
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const blogpostCardsGrid = (
    <div className="grid grid-cols-1 gap-y-5 py-8 text-left sm:gap-y-7">
      {blogpostCards.map((blogpostCard) => (
        <BlogpostCard
          blogpostCard={blogpostCard}
          key={blogpostCard._id}
          onDeleteBlogpostClicked={deleteBlogpost}
          blogOwner={username!}
          isBlogOwner={loggedInUser?.username == username}
        />
      ))}
    </div>
  );

  return (
    <>
      {blogpostCardsLoading && (
        <div className="flex h-full flex-col items-center justify-center">
          <ScaleLoader
            color="#8b5cf6"
            // aria-label="Loading Spinner"
          />
        </div>
      )}
      {showBlogpostCardsLoadingError && (
        <div className="flex h-full flex-col items-center justify-center">
          <p>Something went wrong. Please refresh the page.</p>
        </div>
      )}
      {!blogpostCardsLoading && !showBlogpostCardsLoadingError && (
        <>
          {blogpostCards.length > 0 ? (
            blogpostCardsGrid
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <p>No blog posts yet.</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
