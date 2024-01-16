import { BlogpostCard as BlogpostCardModel } from "../models/blogposts";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

interface BlogpostCardProps {
  blogpostCard: BlogpostCardModel;
}

const BlogpostCard = ({ blogpostCard }: BlogpostCardProps) => {
  const { title, summary, thumbnail, createdAt, updatedAt } = blogpostCard;

  let latestDate: string;
  if (updatedAt > createdAt) {
    latestDate = "Updated: " + formatDate(updatedAt);
  } else {
    latestDate = "Created: " + formatDate(createdAt);
  }

  return (
    <div className="flex flex-row gap-x-2 rounded-lg border border-gray-300 p-2 md:gap-x-3 md:p-3">
      <div className="h-24 w-24 shrink-0 md:h-36 md:w-56">
        <Link to="/blogpost">
          <div className="h-full overflow-hidden rounded-lg">
            <img className="min-h-full object-cover" src={thumbnail} />
          </div>
        </Link>
      </div>
      <div className="flex h-24 flex-col md:h-36 ">
        <Link to="/blogpost">
          <h2 className="line-clamp-1 text-lg font-bold md:text-2xl">
            {title}
          </h2>
        </Link>
        <div className="flex flex-row justify-start gap-x-3">
          <p className="text-xs font-semibold">Author</p>
          <time className="text-xs text-gray-400">{latestDate}</time>
        </div>
        <p className="mt-1 line-clamp-2 max-h-full text-xs md:mt-2 md:line-clamp-3 md:text-sm">
          {summary}
        </p>
      </div>
    </div>
  );
};

export default BlogpostCard;
