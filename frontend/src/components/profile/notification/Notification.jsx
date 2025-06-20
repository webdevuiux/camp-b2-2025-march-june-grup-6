import React, { useState, useEffect } from "react";
import axios from "axios";
import NotificationPopup from "../notification/NotificationPopup1";
import NotificationPopupForum from "../notification/NotificationPopupForum";

const NotificationCard1 = ({ notification, onSeeMore }) => {
  const processMessage = (msg) => {
    const dateMatch = msg.match(/on\s+(.+?)(?=\s+\d{2}:\d{2}:\d{2}\s+GMT)/);
    if (dateMatch && dateMatch[1]) {
      return msg.replace(
        /on\s+.+\s+\d{2}:\d{2}:\d{2}\s+GMT\S+\s\(.*?\)/,
        `on ${dateMatch[1]}`
      );
    }
    return msg;
  };

  const processedMessage = processMessage(notification.message);

  if (
    notification.type === "purchase_confirmation" &&
    (!notification.workshop_title || !notification.workshop_date)
  ) {
    return null;
  }

  return (
    <div className="bg-[#FEE4C4] w-full overflow-hidden flex flex-col md:flex-row items-center mb-4">
      <div className="relative w-12 h-12 shrink-0">
        <img
          src="./img/frame1.png"
          alt="notif"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 px-3 py-3 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg font-robotoMono sm:text-xl">
            {processedMessage.split("starts")[0] || processedMessage}
          </h3>
          <p className="text-sm text-gray-700 mt-1 line-clamp-2 sm:text-base">
            {notification.type === "purchase_confirmation" && (
              <span>Thanks for signing up! Your spot is confirmed.</span>
            )}
            {notification.type === "workshop_reminder" && (
              <span>Just a reminder that your workshop is starting soon.</span>
            )}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 sm:text-base">
          <p className="mb-2 md:mb-0">
            {new Date(notification.created_at).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <button
            onClick={() => onSeeMore(notification)}
            className="text-sm font-semibold text-black underline sm:text-base"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationCard2 = ({ notification, onSeeMore }) => (
  <div className="bg-[#FCEDDA] w-full overflow-hidden flex flex-col md:flex-row mb-4">
    <div className="relative w-12 h-12 shrink-0">
      <img
        src="./img/newforum.png"
        alt="notif"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 px-3 py-3 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg font-robotoMono sm:text-xl">
          New Forum Reply
        </h3>
        <p className="text-sm text-gray-700 mt-1 line-clamp-2 sm:text-base">
          {notification.message}
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 sm:text-base">
        <p className="mb-2 md:mb-0">
          {new Date(notification.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <button
          onClick={() => onSeeMore(notification)}
          className="text-sm font-semibold text-black underline sm:text-base"
        >
          See More
        </button>
      </div>
    </div>
  </div>
);

const NotificationCard3 = ({ notification }) => (
  <div className="bg-[#FEE4C4] w-full overflow-hidden flex flex-col md:flex-row items-center mb-4">
    <div className="relative w-12 h-12 shrink-0">
      <img
        src="./img/frame2.png"
        alt="notif"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 px-3 py-3 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg font-robotoMono sm:text-xl">
          Workshop Reminder (1 day before)
        </h3>
        <p className="text-sm text-gray-700 mt-1 line-clamp-2 sm:text-base">
          {notification.message}
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 sm:text-base">
        <p className="mb-2 md:mb-0">
          {new Date(notification.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <a
          href="#"
          className="text-sm font-semibold text-black underline sm:text-base"
        >
          See More
        </a>
      </div>
    </div>
  </div>
);

const NotificationCard4 = ({ notification }) => (
  <div className="bg-[#FCEDDA] w-full overflow-hidden flex flex-col md:flex-row mb-4">
    <div className="relative w-12 h-12 shrink-0">
      <img
        src="./img/draft.png"
        alt="notif"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 px-3 py-3 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg font-robotoMono sm:text-xl">
          Draft Saved
        </h3>
        <p className="text-sm text-gray-700 mt-1 line-clamp-2 sm:text-base">
          Your workshop listing draft is saved.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 sm:text-base">
        <p className="mb-2 md:mb-0">
          {new Date(notification.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <a
          href="#"
          className="text-sm font-semibold text-black underline sm:text-base"
        >
          See More
        </a>
      </div>
    </div>
  </div>
);

const NotificationCard5 = ({ notification }) => (
  <div className="bg-[#FEE4C4] w-full overflow-hidden flex flex-col md:flex-row items-center mb-4">
    <div className="relative w-12 h-12 shrink-0">
      <img
        src="./img/frame1.png"
        alt="notif"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 px-3 py-3 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg font-robotoMono sm:text-xl">
          Ticket Purchase Confirmation
        </h3>
        <p className="text-sm text-gray-700 mt-1 line-clamp-2 sm:text-base">
          {notification.message}
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 sm:text-base">
        <p className="mb-2 md:mb-0">
          {new Date(notification.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <a
          href="#"
          className="text-sm font-semibold text-black underline sm:text-base"
        >
          See More
        </a>
      </div>
    </div>
  </div>
);

const NotificationCard6 = ({ notification, onSeeMoreForum }) => (
  <div className="bg-[#FCEDDA] w-full overflow-hidden flex flex-col md:flex-row mb-4">
    <div className="relative w-12 h-12 shrink-0">
      <img
        src="./img/newforum.png"
        alt="notif"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 px-3 py-3 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg font-robotoMono sm:text-xl">
          New Forum Reply
        </h3>
        <p className="text-sm text-gray-700 mt-1 line-clamp-2 sm:text-base">
          {notification.message}
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 sm:text-base">
        <p className="mb-2 md:mb-0">
          {new Date(notification.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <button
          onClick={() => onSeeMoreForum(notification)}
          className="text-sm font-semibold text-black underline sm:text-base"
        >
          See More
        </button>
      </div>
    </div>
  </div>
);

const UnseenNotification = ({
  notifications,
  onSeeMoreWorkshop,
  onSeeMoreForum,
}) => (
  <div className="space-y-6">
    {notifications.map((notification) =>
      notification.type === "workshop_reminder" ||
      (notification.type === "purchase_confirmation" &&
        notification.workshop_title &&
        notification.workshop_date) ? (
        <NotificationCard1
          key={notification.id}
          notification={notification}
          onSeeMore={onSeeMoreWorkshop}
        />
      ) : (
        <NotificationCard2
          key={notification.id}
          notification={notification}
          onSeeMore={onSeeMoreForum}
        />
      )
    )}
  </div>
);

const SeenNotification = ({ notifications, onSeeMoreForum }) => (
  <div className="space-y-6">
    {notifications.map((notification) =>
      notification.type === "workshop_reminder" ? (
        <NotificationCard3 key={notification.id} notification={notification} />
      ) : notification.type === "purchase_confirmation" &&
        notification.workshop_title &&
        notification.workshop_date ? (
        <NotificationCard5 key={notification.id} notification={notification} />
      ) : notification.type === "forum_reply" ? (
        <NotificationCard6
          key={notification.id}
          notification={notification}
          onSeeMoreForum={onSeeMoreForum}
        />
      ) : (
        <NotificationCard4 key={notification.id} notification={notification} />
      )
    )}
  </div>
);

const Notification = () => {
  const [tab, setTab] = useState("unseen");
  const [showPopup, setShowPopup] = useState(false);
  const [showForumPopup, setShowForumPopup] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/notif/notifications`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotifications(response.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const markNotificationAsSeen = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/notif/notifications/${notificationId}/seen`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n.id === notificationId ? { ...n, is_seen: true } : n
        )
      );
    } catch (err) {
      console.error("Error marking notification as seen:", err);
    }
  };

  const handleSeeMoreWorkshop = async (notification) => {
    if (!notification.is_seen) {
      await markNotificationAsSeen(notification.id);
    }
    setSelectedNotification(notification);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedNotification(null);
  };

  const handleSeeMoreForum = async (notification) => {
    if (!notification.is_seen) {
      await markNotificationAsSeen(notification.id);
    }
    setSelectedNotification(notification);
    setShowForumPopup(true);
  };

  const handleCloseForumPopup = () => {
    setShowForumPopup(false);
    setSelectedNotification(null);
  };

  const unseenNotifications = notifications.filter((n) => !n.is_seen);
  const seenNotifications = notifications.filter((n) => n.is_seen);

  return (
    <div className="relative w-full ml-[-15px] mt-4 px-4">
      <div className="flex space-x-8 border-black mt-12 mb-2">
        <button
          onClick={() => setTab("unseen")}
          className={`pb-2 font-semibold border-b-2 ${
            tab === "unseen" ? "border-black" : "border-transparent"
          }`}
        >
          Unseen
        </button>
        <button
          onClick={() => setTab("seen")}
          className={`pb-2 font-semibold border-b-2 ${
            tab === "seen" ? "border-black" : "border-transparent"
          }`}
        >
          Seen
        </button>
      </div>

      {tab === "unseen" && (
        <div className="space-y-6">
          {unseenNotifications.length === 0 ? (
            <div className="text-center mt-20">
              <p className="font-semibold text-lg">
                You don’t have any unseen notifications yet.
              </p>
              <p className="text-md mt-2">
                Check back later for new notifications!
              </p>
            </div>
          ) : (
            <UnseenNotification
              notifications={unseenNotifications}
              onSeeMoreWorkshop={handleSeeMoreWorkshop}
              onSeeMoreForum={handleSeeMoreForum}
            />
          )}
        </div>
      )}

      {tab === "seen" && (
        <div className="space-y-6">
          {seenNotifications.length === 0 ? (
            <div className="text-center mt-20">
              <p className="font-semibold text-lg">
                You don’t have any seen notifications yet.
              </p>
              <p className="text-md mt-2">
                Check back later for new notifications!
              </p>
            </div>
          ) : (
            <SeenNotification
              notifications={seenNotifications}
              onSeeMoreForum={handleSeeMoreForum}
            />
          )}
        </div>
      )}

      {showPopup && selectedNotification && (
        <NotificationPopup
          onClose={handleClosePopup}
          notification={selectedNotification}
        />
      )}
      {showForumPopup && selectedNotification && (
        <NotificationPopupForum
          onClose={handleCloseForumPopup}
          notification={selectedNotification}
        />
      )}
    </div>
  );
};

export default Notification;