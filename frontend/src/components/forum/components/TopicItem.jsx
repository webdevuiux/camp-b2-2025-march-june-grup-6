import React from "react";
import PropTypes from "prop-types";
import { MessageSquare, ThumbsUp, MoreHorizontal, X, Flag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopicItem = ({ topic }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/60 border border-gray-300 rounded-lg p-4 flex items-start gap-4 transition-shadow hover:shadow-lg">
      {/* Avatar */}
      <img
        src={topic.avatar}
        alt={topic.author}
        className="w-10 h-10 rounded-full flex-shrink-0 mt-1"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/40x40/EFE2D3/000000?text=U";
        }}
      />

      {/* Konten Utama */}
      <div className="flex-grow">
        {/* Baris Atas: Info Penulis & Tombol X */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-gray-900">{topic.author}</span>
            <span className="text-xs text-gray-500 ml-2">
              @{topic.username}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <p className="text-xs">{topic.lastPost}</p>
            <button className="hover:text-gray-800">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Judul Topik */}
        <h3
          className="text-lg font-bold my-1 cursor-pointer hover:underline text-gray-800"
          onClick={() => navigate(`/forum/discussion/${topic.id}`)}
        >
          {topic.title}
        </h3>

        {/* Baris Bawah: Aksi */}
        <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-1.5 hover:text-blue-600 font-medium"
              onClick={() => navigate(`/forum/discussion/${topic.id}`)}
            >
              <MessageSquare size={16} />
              <span>Reply</span>
            </button>
            <div className="flex items-center gap-1.5 text-gray-500">
              <ThumbsUp size={16} />
              <span>{topic.replies || 0}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 hover:text-red-600">
              <Flag size={14} />
              <span className="hidden sm:inline">Report</span>
            </button>
            <button className="hover:text-gray-800">
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
