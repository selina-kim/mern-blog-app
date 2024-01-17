import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDateLong } from "../utils/formatDateLong";
import { Blogpost as BlogpostModel } from "../models/blogpost";

interface BlogpostProps {
  blogpost: BlogpostModel;
  onDeleteBlogpostClicked: (blogpost: BlogpostModel) => void;
  width: string;
}

const Blogpost = ({
  blogpost,
  onDeleteBlogpostClicked,
  width,
}: BlogpostProps) => {
  const { title, summary, content, thumbnail, createdAt, updatedAt } = blogpost;

  return (
    <>
      <div className={`mb-8 border-b-[1px] py-8 w-[${width}px]`}>
        <h1 className="mb-3 text-4xl font-bold">{title}</h1>
        <h2 className="mb-6 text-lg font-semibold italic">{summary}</h2>
        <div className="text-sm leading-tight">
          <p className="mb-1 font-semibold">Username</p>
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
          className={`w-[${width}px]`}
        >
          {content}
        </Markdown>
      </div>
    </>
  );
};

export default Blogpost;
