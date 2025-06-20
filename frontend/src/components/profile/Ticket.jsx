import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShareProfile from "../profile/shareprofile/ShareProfile";
import Notification from "../profile/notification/Notification";
import MyWorkshop from "../profile/myworkshop/MyWorkshop";
import Points from "../profile/points/Points";
import Settings from "../profile/settings/Settings";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Ticket = () => {
  const [mainTab, setMainTab] = useState("ticket");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [userData, setUserData] = useState({
    firstName: "Nabila",
    lastName: "Sari",
    username: "nabilasari4",
    email: "nabilasari4@email.com",
    phone: "(+62)555-2304-324",
    country: "Indonesia",
    language: "Bahasa Indonesia",
    about: "",
    workshopsAttended: 0,
    forumReplies: 0,
    profileImage: "/img/profile.png",
    id: null,
  });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        if (parsedUserData && typeof parsedUserData === "object") {
          setUserData((prev) => ({
            ...prev,
            firstName: parsedUserData.firstName || "Nabila",
            lastName: parsedUserData.lastName || "Sari",
            username: parsedUserData.username || "nabilasari4",
            email: parsedUserData.email || "nabilasari4@email.com",
            phone: parsedUserData.phone || "(+62)555-2304-324",
            country: parsedUserData.country || "Indonesia",
            language: parsedUserData.language || "Bahasa Indonesia",
            about: parsedUserData.about || "",
            profileImage: parsedUserData.profileImage
              ? `${API_BASE_URL}${parsedUserData.profileImage}`
              : "/img/profile.png",
            id: parsedUserData.id || null,
          }));
        }
      } catch (error) {
        console.error("Error parsing userData from localStorage:", error);
        localStorage.removeItem("userData");
      }
    }

    const fetchTicketsAndStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUserData = localStorage.getItem("userData");
        let userId = null;
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          userId = parsedUserData.id;
        }
        if (!userId) {
          throw new Error("User ID not found. Pastikan Anda login kembali.");
        }
        if (!token) {
          throw new Error("Token autentikasi tidak ditemukan. Silakan login.");
        }

        const ticketsResponse = await fetch(
          `${API_BASE_URL}/api/bookings/user/bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!ticketsResponse.ok) {
          const errorText = await ticketsResponse.text();
          throw new Error(
            `Gagal mengambil tiket: ${errorText} (Status: ${ticketsResponse.status})`
          );
        }
        const ticketsData = await ticketsResponse.json();
        setTickets(ticketsData);

        const currentDate = new Date();
        const usedTicketsCount = ticketsData.filter((ticket) => {
          const workshopDate = new Date(ticket.workshop_date || ticket.date);
          return ticket.status === "confirmed" && workshopDate < currentDate;
        }).length;
        setUserData((prev) => ({
          ...prev,
          workshopsAttended: usedTicketsCount,
        }));

        const forumRepliesResponse = await fetch(
          `${API_BASE_URL}/api/forum/users/${userId}/forumReplies`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!forumRepliesResponse.ok) {
          throw new Error("Gagal mengambil forum replies");
        }
        const forumRepliesData = await forumRepliesResponse.json();
        setUserData((prev) => ({
          ...prev,
          forumReplies: forumRepliesData.forumReplies || 0,
        }));
      } catch (err) {
        console.error("Error pengambilan data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTicketsAndStats();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const currentDate = new Date();
  const upcomingTickets = tickets.filter((ticket) => {
    const workshopDate = new Date(ticket.workshop_date || ticket.date);
    return ticket.status === "confirmed" && workshopDate >= currentDate;
  });
  const usedTickets = tickets.filter((ticket) => {
    const workshopDate = new Date(ticket.workshop_date || ticket.date);
    return ticket.status === "confirmed" && workshopDate < currentDate;
  });

  if (loading) return <div className="p-6 text-center sm:p-8">Memuat...</div>;
  if (error)
    return <div className="p-6 text-center text-red-500 sm:p-8">{error}</div>;

  return (
    <div className="bg-[#FCEDDA] min-h-screen text-[#000000] pt-[2px] pl-2 pr-2 pb-8 sm:p-6 md:pr-24">
      <div className="flex flex-col md:flex-row gap-10 mt-24 sm:gap-12">
        <aside className="md:w-1/3 flex flex-col items-center text-center sm:px-4 md:max-w-xs">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40">
            <img
              src={userData.profileImage}
              alt="Profile"
              className="rounded-full w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/img/profile.png";
              }}
            />
            <img
              src="/img/badge.png"
              alt="Verified"
              className="absolute bottom-0 right-0 w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]"
            />
          </div>
          <div className="mt-[30px] flex items-center gap-2 sm:mt-6">
            <h2 className="text-3xl font-bold sm:text-4xl">
              {userData.firstName} {userData.lastName}
            </h2>
          </div>
          <p className="text-lg text-[#696767] sm:text-xl">
            @{userData.username}
          </p>
          <ShareProfile />
          <div className="mt-10 space-y-2 w-full max-w-full sm:max-w-[300px] px-4">
            <div className="flex justify-between w-full sm:text-lg">
              <span className="font-medium">Workshop Attended</span>
              <span className="text-gray-500">
                {userData.workshopsAttended}
              </span>
            </div>
            <div className="flex justify-between w-full sm:text-lg">
              <span className="font-medium">Forum Replies</span>
              <span className="text-gray-500">{userData.forumReplies}</span>
            </div>
          </div>
          <div className="mt-10 px-6 md:ml-15 text-left md:text-left flex flex-col items-center md:block sm:px-8">
            <h4 className="font-semibold mb-2 sm:text-lg">INTEREST</h4>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full sm:gap-3">
              <span className="mt-1 bg-[#FFDEB5] px-2 py-1 rounded-full text-sm sm:text-base">
                Pottery
              </span>
              <span className="mt-1 bg-[#FFDEB5] px-2 py-1 rounded-full text-sm sm:text-base">
                Lifestyle & Home
              </span>
              <span className="mt-1 bg-[#FFDEB5] px-2 py-1 rounded-full text-sm sm:text-base">
                Painting
              </span>
            </div>
          </div>
        </aside>

        <section className="flex-1 px-4 md:px-0 sm:px-6">
          <div className="border-b border-black mb-10 sm:mb-12">
            <ul className="flex gap-6 text-sm font-robotoMono overflow-x-auto scrollbar-hide sm:text-base">
              <li
                onClick={() => setMainTab("ticket")}
                className={`cursor-pointer pb-2 whitespace-nowrap ${
                  mainTab === "ticket" ? "border-b-2 border-black" : ""
                }`}
              >
                <strong>Ticket</strong>
              </li>
              <li
                onClick={() => setMainTab("notification")}
                className={`cursor-pointer pb-2 whitespace-nowrap ${
                  mainTab === "notification" ? "border-b-2 border-black" : ""
                }`}
              >
                <strong>Notification</strong>
              </li>
              <li
                onClick={() => setMainTab("workshop")}
                className={`cursor-pointer pb-2 whitespace-nowrap ${
                  mainTab === "workshop" ? "border-b-2 border-black" : ""
                }`}
              >
                <strong>My Workshop</strong>
              </li>
              <li
                onClick={() => setMainTab("settings")}
                className={`cursor-pointer pb-2 whitespace-nowrap ${
                  mainTab === "settings" ? "border-b-2 border-black" : ""
                }`}
              >
                <strong>Settings</strong>
              </li>
            </ul>
          </div>

          {mainTab === "ticket" && (
            <>
              <div className="mb-4 mt-12 sm:mb-6">
                <ul className="flex gap-6 text-l font-semibold overflow-x-auto scrollbar-hide sm:text-xl">
                  <li
                    className={`cursor-pointer pb-2 whitespace-nowrap ${
                      activeTab === "upcoming" ? "border-b-2 border-black" : ""
                    }`}
                    onClick={() => setActiveTab("upcoming")}
                  >
                    Upcoming
                  </li>
                  <li
                    className={`cursor-pointer pb-2 whitespace-nowrap ${
                      activeTab === "used" ? "border-b-2 border-black" : ""
                    }`}
                    onClick={() => setActiveTab("used")}
                  >
                    Used
                  </li>
                </ul>
              </div>

              {activeTab === "upcoming" ? (
                <div className="space-y-6">
                  {upcomingTickets.length > 0 ? (
                    upcomingTickets.map((ticket) => (
                      <div
                        key={ticket.booking_id}
                        className="bg-[#FEE4C4] overflow-hidden flex flex-col md:flex-row"
                      >
                        <div className="w-full md:w-40 h-40 md:h-40">
                          <img
                            src={ticket.image_url || "/img/pict1.svg"}
                            alt="Workshop"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 px-3 py-3 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-lg font-robotoMono sm:text-xl">
                              {ticket.title || "Workshop Title"}
                            </h3>
                            <p className="text-sm text-gray-700 mt-1 line-clamp-2 sm:text-base">
                              {ticket.description ||
                                "Learn the basics of this workshop."}
                            </p>
                          </div>
                          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 sm:text-base">
                            <div className="flex flex-col md:flex-row items-center gap-4 mb-2 md:mb-0">
                              <span className="flex items-center gap-1">
                                <img
                                  src="/img/location.svg"
                                  alt="iconL"
                                  className="w-4 h-4 sm:w-5 sm:h-5"
                                />
                                {ticket.location || "Jakarta, Indonesia"}
                              </span>
                              <span className="flex items-center gap-1">
                                <img
                                  src="/img/calender.svg"
                                  alt="iconC"
                                  className="w-4 h-4 sm:w-5 sm:h-5"
                                />
                                {formatDate(
                                  ticket.workshop_date || ticket.date
                                )}
                              </span>
                            </div>
                            <Link
                              to={`/ticket/${ticket.booking_id}`}
                              className="text-sm font-semibold text-black underline sm:text-base"
                            >
                              See Ticket
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center mt-20">
                      <p className="font-semibold text-lg">
                        No upcoming tickets.
                      </p>
                      <p className="text-md mt-2">
                        Check back later for upcoming tickets!
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {usedTickets.length > 0 ? (
                    usedTickets.map((ticket) => (
                      <div
                        key={ticket.booking_id}
                        className="bg-[#FEE4C4] overflow-hidden flex flex-col md:flex-row"
                      >
                        <div className="w-full md:w-40 h-40 md:h-40">
                          <img
                            src={ticket.image_url || "/img/pict2.png"}
                            alt="Workshop"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 px-3 py-3 flex flex-col justify-between">
                          <div>
                            <div className="flex flex-col md:flex-row justify-between items-start">
                              <h3 className="font-bold text-lg font-robotoMono sm:text-xl">
                                {ticket.title || "Workshop Title"}
                              </h3>
                              <div className="text-md font-bold text-gray-700 flex items-center gap-1 sm:text-lg">
                                <span>N/A</span>
                                <img
                                  src="/img/starline.svg"
                                  alt="Rating Icon"
                                  className="w-7 h-7 object-contain sm:w-8 sm:h-8"
                                />
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mt-1 line-clamp-2 sm:text-base">
                              {ticket.description ||
                                "Learn the basics of this workshop."}
                            </p>
                          </div>
                          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 sm:text-base">
                            <div className="flex flex-col md:flex-row items-center gap-4 mb-2 md:mb-0">
                              <span className="flex items-center gap-1">
                                <img
                                  src="/img/location.svg"
                                  alt="iconL"
                                  className="w-4 h-4 sm:w-5 sm:h-5"
                                />
                                {ticket.location || "Jakarta, Indonesia"}
                              </span>
                              <span className="flex items-center gap-1">
                                <img
                                  src="/img/calender.svg"
                                  alt="iconC"
                                  className="w-4 h-4 sm:w-5 sm:h-5"
                                />
                                {formatDate(
                                  ticket.workshop_date || ticket.date
                                )}
                              </span>
                            </div>
                            <a
                              href="#"
                              className="text-sm font-semibold text-black underline sm:text-base"
                            >
                              Give a Review
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center mt-20">
                      <p className="font-semibold text-lg">No used tickets.</p>
                      <p className="text-md mt-2">
                        Check back later for used tickets!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {mainTab === "notification" && (
            <div>
              <Notification />
            </div>
          )}
          {mainTab === "workshop" && (
            <div>
              <MyWorkshop />
            </div>
          )}
          {mainTab === "karya" && (
            <div>
              <Points />
            </div>
          )}
          {mainTab === "settings" && (
            <div>
              <Settings />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Ticket;