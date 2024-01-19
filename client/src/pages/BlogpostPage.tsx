import { Blogpost as BlogpostModel } from "../models/blogpost";
import { useEffect, useState } from "react";
import * as BlogpostsApi from "../api/blogposts_api";
import { Navigate, useParams } from "react-router-dom";
import Blogpost from "../components/Blogpost";

export function BlogpostPage() {
  const { blogpostId } = useParams();
  const [blogpost, setBlogpost] = useState<BlogpostModel[]>([]);
  const [redirectHome, setRedirectHome] = useState(false);

  useEffect(() => {
    async function loadBlogpost() {
      try {
        const newBlogpost = await BlogpostsApi.fetchBlogpost(blogpostId!);
        setBlogpost([newBlogpost]);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadBlogpost();
    if (!blogpost) setRedirectHome(true);
  }, []);

  async function deleteBlogpost(blogpostId: string) {
    try {
      await BlogpostsApi.deleteBlogpost(blogpostId);
      setRedirectHome(true);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  if (redirectHome) return <Navigate to="/" />;

  return (
    <>
      <div className="px-8 py-8">
        {blogpost.map((blogpost) => (
          <Blogpost
            width="656"
            key={blogpost._id}
            blogpost={blogpost}
            onDeleteBlogpostClicked={deleteBlogpost}
          />
        ))}
      </div>
    </>
  );
}
