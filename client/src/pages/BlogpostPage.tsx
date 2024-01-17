import { Blogpost as BlogpostModel } from "../models/blogpost";
import { PiPencilSimpleLineBold, PiTrashBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import * as BlogpostsApi from "../api/blogposts_api";
import { Navigate, useParams } from "react-router-dom";
import Blogpost from "../components/Blogpost";

interface BlogpostProps {
  blogpostId: string;
  onDeleteBlogpostClicked: (blogpost: BlogpostModel) => void;
}

export function BlogpostPage() {
  const { blogpostId } = useParams();
  const [blogpost, setBlogpost] = useState<BlogpostModel[]>([]);
  const [redirect, setRedirect] = useState(false);

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
    if (!blogpost) setRedirect(true);
  }, []);

  if (redirect) return <Navigate to="/" />;

  return (
    <>
      <div className="mx-10 mb-auto mt-10 pb-4">
        <div className="flex flex-row justify-end gap-x-3">
          <button
            className="flex flex-row items-center gap-x-1 rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
            onClick={() => {}}
          >
            <div className="font-mono text-xl font-semibold leading-none">
              EDIT
            </div>
            <PiPencilSimpleLineBold className="text-xl" />
          </button>
          <button
            className="rounded bg-red-200 p-1 text-xl hover:bg-red-300"
            onClick={() => {}}
          >
            <PiTrashBold className="-mb-0.5" />
          </button>
        </div>
        {blogpost.map((blogpost) => (
          <Blogpost
            width="656"
            key={blogpost._id}
            blogpost={blogpost}
            onDeleteBlogpostClicked={() => {}}
          />
        ))}
      </div>
    </>
  );
}
