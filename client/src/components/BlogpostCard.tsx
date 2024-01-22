import { BlogpostCard as BlogpostCardModel } from "../models/blogpostCard";
import { Link } from "react-router-dom";
import { formatDateShort } from "../utils/formatDateShort";
import { PiTrashBold } from "react-icons/pi";

interface BlogpostCardProps {
  blogpostCard: BlogpostCardModel;
  onDeleteBlogpostClicked: (blogpostId: string) => void;
  blogOwner: string;
  isBlogOwner: boolean;
}

const BlogpostCard = ({
  blogpostCard,
  onDeleteBlogpostClicked,
  blogOwner,
  isBlogOwner,
}: BlogpostCardProps) => {
  const { title, summary, thumbnail, createdAt, updatedAt } = blogpostCard;

  let latestDate: string;
  if (updatedAt > createdAt) {
    latestDate = "Updated: " + formatDateShort(updatedAt);
  } else {
    latestDate = "Created: " + formatDateShort(createdAt);
  }

  return (
    <div className="flex flex-row-reverse gap-x-2">
      {isBlogOwner && (
        <button
          className="rounded bg-red-200 p-1 text-xl hover:bg-red-300"
          onClick={() => {
            onDeleteBlogpostClicked(blogpostCard._id);
          }}
        >
          <PiTrashBold className="-mb-0.5" />
        </button>
      )}
      <Link to={`/blogpost/${blogpostCard._id}`} className="w-full">
        <div className="flex flex-row gap-x-2 rounded-lg border border-gray-300 p-2 md:gap-x-3 md:p-3">
          <div className="flex h-24 w-full flex-col md:h-36">
            <h2 className="line-clamp-1 font-bold sm:text-lg md:text-2xl">
              {title}
            </h2>
            <div className="flex flex-col justify-start gap-x-3 sm:flex-row">
              <p className="text-xs font-semibold">{blogOwner}</p>
              <time className="text-xs text-gray-400">{latestDate}</time>
            </div>
            <p className="mt-1 line-clamp-2 max-h-full text-xs md:mt-2 md:line-clamp-3 md:text-sm">
              {summary}
            </p>
          </div>
          {thumbnail == "" ? (
            <></>
          ) : (
            <div className="h-24 w-24 shrink-0 md:h-36 md:w-56">
              <div className="relative h-full overflow-hidden rounded-lg">
                <img
                  className="absolute left-1/2 top-1/2 min-h-full -translate-x-1/2 -translate-y-1/2 object-cover md:h-36 md:w-56"
                  src={thumbnail}
                />
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default BlogpostCard;
