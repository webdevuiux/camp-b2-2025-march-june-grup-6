import React from "react";
import PropTypes from "prop-types";
import { MessageSquare, ThumbsUp, MoreHorizontal, X, Flag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopicItem = ({ topic }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/60 border border-gray-300 rounded-lg p-4 flex items-start gap-4 transition-shadow hover:shadow-lg max-md:p-2 max-md:gap-2">
      <img
        src={topic.avatar}
        alt={topic.author}
        className="w-10 h-10 rounded-full flex-shrink-0 mt-1 max-md:w-8 max-md:h-8"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/40x40/EFE2D3/000000?text=U";
        }}
      />

      <div className="flex-grow">
        <div className="flex items-center justify-between max-md:flex-col max-md:items-start">
          <div>
            <span className="font-semibold text-gray-900 max-md:text-sm">
              {topic.author}
            </span>
            <span className="text-xs text-gray-500 ml-2 max-md:text-xxs">
              @{topic.username}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-500 max-md:mt-1">
            <p className="text-xs max-md:text-xxs">{topic.lastPost}</p>
            <button className="hover:text-gray-800 max-md:text-sm">
              <X size={16} />
            </button>
          </div>
        </div>

        <h3
          className="text-lg font-bold my-1 cursor-pointer hover:underline text-gray-800 max-md:text-base max-md:my-0.5"
          onClick={() => navigate(`/forum/discussion/${topic.id}`)}
        >
          {topic.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-600 mt-2 max-md:text-xs max-md:mt-1">
          <div className="flex items-center gap-4 max-md:gap-2">
            <button
              className="flex items-center gap-1.5 hover:text-blue-600 font-medium max-md:text-xs"
              onClick={() => navigate(`/forum/discussion/${topic.id}`)}
            >
              <MessageSquare size={16} />
              <span>Reply</span>
            </button>
            <div className="flex items-center gap-1.5 text-gray-500 max-md:text-xs">
              <ThumbsUp size={16} />
              <span>{topic.replies || 0}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 max-md:gap-2">
            <button className="flex items-center gap-1.5 hover:text-red-600 max-md:text-xs">
              <Flag size={14} />
              <span className="hidden sm:inline">Report</span>
            </button>
            <button className="hover:text-gray-800 max-md:text-sm">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TopicItem.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.any.isRequired,
    author: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    replies: PropTypes.number,
    lastPost: PropTypes.string.isRequired,
  }).isRequired,
};

export default TopicItem;