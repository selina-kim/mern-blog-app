import { Blogpost as BlogpostModel } from "../models/blogpost";
import { useContext, useEffect, useState } from "react";
import * as BlogpostsApi from "../api/blogposts_api";
import { Navigate, useParams } from "react-router-dom";
import Blogpost from "../components/Blogpost";
import { UserContext } from "../userContext";

export function BlogpostPage() {
  const { loggedInUser } = useContext(UserContext);

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

  if (redirectHome)
    return (
      <Navigate to={loggedInUser ? `/blog/${loggedInUser.username}` : "/"} />
    );

  return (
    <>
      <div className="p-4 md:p-8">
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
