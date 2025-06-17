import React, { useState, useEffect } from "react";
import axios from "axios";
import NotificationPopup from "../notification/NotificationPopup1";
import NotificationPopupForum from "../notification/NotificationPopupForum";

const NotificationCard1 = ({ notification, onSeeMore }) => {
  // Memproses message untuk menghapus waktu dan zona waktu
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

  // Hanya tampilkan jika data workshop tersedia untuk purchase_confirmation
  if (
    notification.type === "purchase_confirmation" &&
    (!notification.workshop_title || !notification.workshop_date)
  ) {
    return null; // Sembunyikan jika data tidak lengkap
  }

  return (
    <div className="bg-[#FEE4C4] p-4 flex gap-4 w-full">
      <div className="relative w-12 h-12 shrink-0">
        <img
          src="./img/frame1.png"
          alt="notif"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-between items-start w-full gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg">
            {processedMessage.split("starts")[0] || processedMessage}
          </h3>
          <p className="text-sm text-gray-800 mt-1">
            {notification.type === "purchase_confirmation" && (
              <span>Thanks for signing up! Your spot is confirmed.</span>
            )}
            {notification.type === "workshop_reminder" && (
              <span>Just a reminder that your workshop is starting soon.</span>
            )}
          </p>
        </div>
        <div className="flex flex-col items-end min-w-fit text-sm text-gray-700 whitespace-nowrap">
          <p className="mb-8">
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
            className="text-black font-semibold underline cursor-pointer"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationCard2 = ({ notification, onSeeMore }) => (
  <div className="bg-[#FCEDDA] p-4 flex gap-4 w-full">
    <div className="relative w-12 h-12 shrink-0">
      <img
        src="./img/newforum.png"
        alt="notif"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex justify-between items-start w-full gap-4">
      <div className="flex-1">
        <h3 className="font-bold text-lg">New Forum Reply</h3>
        <p className="text-sm text-gray-800 mt-1">{notification.message}</p>
      </div>
      <div className="flex flex-col items-end text-sm text-gray-700 whitespace-nowrap">
        <p className="mb-8">
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
          className="text-black font-semibold underline cursor-pointer"
        >
          See More
        </button>
      </div>
    </div>
  </div>
);

const NotificationCard3 = ({ notification }) => (
  <div className="bg-[#FEE4C4] p-4 flex gap-4 w-full">
    <div className="relative w-12 h-12 shrink-0">
      <img
        src="./img/frame2.png"
        alt="notif"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex justify-between items-start w-full gap-4">
      <div className="flex-1">
        <h3 className="font-bold text-lg">Workshop Reminder (1 day before)</h3>
        <p className="text-sm text-gray-800 mt-1">{notification.message}</p>
      </div>
      <div className="flex flex-col items-end text-sm text-gray-700 whitespace-nowrap">
        <p className="mb-8">
          {new Date(notification.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <a href="#" className="text-black font-semibold underline">
          See More
        </a>
      </div>
    </div>
  </div>
);

const NotificationCard4 = ({ notification }) => (
  <div className="bg-[#FCEDDA] p-4 flex gap-4 w-full">
    <div className="relative w-12 h-12 shrink-0">
      <img
        src="./img/draft.png"
        alt="notif"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex justify-between items-start w-full gap-4">
      <div className="flex-1">
        <h3 className="font-bold text-lg">Draft Saved</h3>
        <p className="text-sm text-gray-800 mt-1">
          Your workshop listing draft is saved.
        </p>
      </div>
      <div className="flex flex-col items-end text-sm text-gray-700 whitespace-nowrap">
        <p className="mb-8">
          {new Date(notification.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <a href="#" className="text-black font-semibold underline">
          See More
        </a>
      </div>
    </div>
  </div>
);

const NotificationCard5 = ({ notification }) => (
  <div className="bg-[#FEE4C4] p-4 flex gap-4 w-full">
    <div className="relative w-12 h-12 shrink-0">
      <img
        src="./img/frame1.png"
        alt="notif"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex justify-between items-start w-full gap-4">
      <div className="flex-1">
        <h3 className="font-bold text-lg">Ticket Purchase Confirmation</h3>
        <p className="text-sm text-gray-800 mt-1">{notification.message}</p>
      </div>
      <div className="flex flex-col items-end text-sm text-gray-700 whitespace-nowrap">
        <p className="mb-8">
          {new Date(notification.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <a href="#" className="text-black font-semibold underline">
          See More
        </a>
      </div>
    </div>
  </div>
);

const NotificationCard6 = ({ notification, onSeeMoreForum }) => (
  <div className="bg-[#FCEDDA] p-4 flex gap-4 w-full">
    <div className="relative w-12 h-12 shrink-0">
      <img
        src="./img/newforum.png"
        alt="notif"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex justify-between items-start w-full gap-4">
      <div className="flex-1">
        <h3 className="font-bold text-lg">New Forum Reply</h3>
        <p className="text-sm text-gray-800 mt-1">{notification.message}</p>
      </div>
      <div className="flex flex-col items-end text-sm text-gray-700 whitespace-nowrap">
        <p className="mb-8">
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
          className="text-black font-semibold underline cursor-pointer"
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
  <div className="space-y-2">
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
  <div className="space-y-2">
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
          onSeeMoreForum={onSeeMoreForum} // Gunakan onSeeMoreForum yang konsisten
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
    const interval = setInterval(fetchNotifications, 30000); // Polling setiap 30 detik
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
      // Perbarui state lokal setelah menandai sebagai seen
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
    // console.log("Selected notification for workshop:", notification); // Debug log
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
    // console.log("Selected notification for forum:", notification); // Debug log
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
    <div className="w-full max-w-4xl mx-auto mt-10 relative">
      <div className="mb-4 flex space-x-8">
        <button
          onClick={() => setTab("unseen")}
          className={`font-semibold border-b-2 ${
            tab === "unseen" ? "border-black" : "border-transparent"
          }`}
        >
          Unseen
        </button>
        <button
          onClick={() => setTab("seen")}
          className={`font-semibold border-b-2 ${
            tab === "seen" ? "border-black" : "border-transparent"
          }`}
        >
          Seen
        </button>
      </div>

      {tab === "unseen" && (
        <UnseenNotification
          notifications={unseenNotifications}
          onSeeMoreWorkshop={handleSeeMoreWorkshop}
          onSeeMoreForum={handleSeeMoreForum}
        />
      )}
      {tab === "seen" && (
        <SeenNotification
          notifications={seenNotifications}
          onSeeMoreForum={handleSeeMoreForum} 
        />
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
