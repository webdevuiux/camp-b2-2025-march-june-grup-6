import React from "react";
import { useNavigate } from "react-router-dom";

const NotificationPopupForum = ({ onClose, notification }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const navigate = useNavigate();

  // Debug: Log notification data untuk memeriksa isi
  // console.log("Notification data:", notification);

  // Gunakan data dari notification dengan fallback yang lebih spesifik
  const commentAuthorName = notification?.comment_author_name || "Unknown";
  const commentContent = notification?.content || "No reply content available.";
  const topicTitle = notification?.topic_title || "Untitled Topic";
  const profileImage = notification?.profile_image || "./img/ellipse.png"; // Fallback ke placeholder jika tidak ada

  // Pastikan topic.id ada sebelum navigasi
  const handleViewReplies = () => {
    if (notification?.related_id) {
      navigate(`/forum/discussion/${notification.related_id}`);
    } else {
      console.error("Topic ID is undefined in notification data");
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/20 z-50 flex justify-end items-start pt-10 sm:pt-12"
    >
      <div className="w-[600px] h-[550px] bg-[#FCEDDA] mt-6 shadow-lg p-6 sm:p-8 animate-slide-in">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-sm font-mono font-bold tracking-wide sm:text-base">
            Notification
          </h2>
          <button
            onClick={onClose}
            className="text-sm font-mono tracking-wide hover:text-black sm:text-base"
          >
            Close - X
          </button>
        </div>

        <div className="flex gap-4 mt-12 mb-8 sm:gap-6">
          <div className="relative w-14 h-14 shrink-0 overflow-hidden sm:w-16 sm:h-16">
            <img
              src="./img/newforum.png"
              alt="forum icon"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-xl text-[#000000] sm:text-2xl">
              New Forum Reply
            </h3>
            <p className="text-xs mt-2 text-[#000000] sm:text-sm">
              {new Date().toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="text-md ml-18 mr-12 text-[#000000] space-y-6 sm:text-lg sm:ml-20 sm:mr-14">
          <p>
            Someone just replied to your post in the{" "}
            <strong>{`"${topicTitle}"`}</strong> thread. Check it out and join
            the conversation.
          </p>
        </div>

        <div className="bg-[#FFDEB5] mr-4 mt-8 mb-10 ml-[-18] px-4 py-3 flex gap-3 items-start sm:ml-[-20] sm:mr-6">
          <img
            src={profileImage}
            alt={commentAuthorName}
            className="w-10 h-10 rounded-full object-cover mt-1 sm:w-12 sm:h-12"
          />
          <div>
            <p className="font-bold sm:text-lg">{commentAuthorName}</p>
            <p className="sm:text-base">{commentContent}</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleViewReplies}
            className="bg-[#2B2B2B] text-white px-8 py-[10px] rounded-[5px] font-semibold hover:bg-[#FFDEB5] hover:text-[#2B2B2B] transition-colors duration-300"
          >
            View Replies
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopupForum;