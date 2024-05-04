import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDateLong } from "../utils/formatDateLong";
import { Blogpost as BlogpostModel } from "../models/blogpost";
import { PiPencilSimpleLineBold, PiTrashBold } from "react-icons/pi";
import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../userContext";

interface BlogpostProps {
  blogpost: BlogpostModel;
  onDeleteBlogpostClicked: (blogpostId: string) => void;
}

const Blogpost = ({ blogpost, onDeleteBlogpostClicked }: BlogpostProps) => {
  const { loggedInUser } = useContext(UserContext);

  const { title, summary, content, thumbnail, createdAt, updatedAt, username } =
    blogpost;

  const [redirectEditor, setRedirectEditor] = useState(false);

  if (redirectEditor) return <Navigate to={`/editor/${blogpost._id}`} />;

  return (
    <>
      {loggedInUser?.username == username && (
        <div className="flex flex-row justify-end gap-x-3">
          <button
            className="flex flex-row items-center gap-x-1 rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
            onClick={() => {
              setRedirectEditor(true);
            }}
          >
            <div className="font-mono text-xl font-semibold leading-none">
              EDIT
            </div>
            <PiPencilSimpleLineBold className="text-xl" />
          </button>
          <button
            className="rounded bg-red-200 p-1 text-xl hover:bg-red-300"
            onClick={() => onDeleteBlogpostClicked(blogpost._id)}
          >
            <PiTrashBold className="-mb-0.5" />
          </button>
        </div>
      )}
      <div className={`mb-8 border-b-[1px] py-8`}>
        <h1 className="mb-3 text-2xl font-bold sm:text-4xl">{title}</h1>
        <h2 className="mb-6 font-semibold italic sm:text-lg">{summary}</h2>
        {thumbnail != "" && (
          <img
            src={thumbnail}
            alt="Thumbnail"
            className="mx-auto mb-5 h-[500px] max-w-full"
          />
        )}
        <div className="text-sm leading-tight">
          <p className="mb-1 font-semibold">{username}</p>
          <time className="block text-gray-400">
            Created: {formatDateLong(createdAt)}
          </time>
          <time className="block text-gray-400">
            Updated: {formatDateLong(updatedAt)}
          </time>
        </div>
      </div>
      <div className="prose prose-sm prose-my-colors prose-h5:font-medium prose-li:my-0">
        <Markdown
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          className={`md:w-[672px]`}
        >
          {content}
        </Markdown>
      </div>
    </>
  );
};

export default Blogpost;
