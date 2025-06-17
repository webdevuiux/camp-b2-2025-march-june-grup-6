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
    workshopsAttended: 0, // Akan dihitung dari tiket
    forumReplies: 0, // Akan diambil dari API
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

        // Fetch tickets
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

        // Hitung workshopsAttended dari tiket yang sudah digunakan
        const currentDate = new Date();
        const usedTicketsCount = ticketsData.filter((ticket) => {
          const workshopDate = new Date(ticket.workshop_date || ticket.date);
          return ticket.status === "confirmed" && workshopDate < currentDate;
        }).length;
        setUserData((prev) => ({
          ...prev,
          workshopsAttended: usedTicketsCount,
        }));

        // Fetch forumReplies for the user
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

  if (loading) return <div className="p-6 text-center">Memuat...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-[#FCEDDA] min-h-screen text-[#000000] pt-[2px] pl-2 pr-24 pb-8">
      <div className="flex flex-col md:flex-row gap-10 mt-24">
        {/* Sidebar profil */}
        <aside className="md:w-1/3 flex flex-col items-center text-center">
          <div className="relative w-36 h-36">
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
              className="absolute bottom-0 right-0 w-[50px] h-[50px]"
            />
          </div>
          <div className="mt-[30px] flex items-center gap-2">
            <h2 className="text-3xl font-bold">
              {userData.firstName} {userData.lastName}
            </h2>
          </div>
          <p className="text-lg text-[#696767]">@{userData.username}</p>
          <ShareProfile />
          <div className="mt-10 space-y-2 w-full max-w-full sm:max-w-[300px] px-4">
            <div className="flex justify-between w-full">
              <span className="font-medium">Workshop Attended</span>
              <span className="text-gray-500">
                {userData.workshopsAttended}
              </span>
            </div>
            <div className="flex justify-between w-full">
              <span className="font-medium">Forum Replies</span>
              <span className="text-gray-500">{userData.forumReplies}</span>
            </div>
          </div>
          <div className="mt-10 px-6 md:ml-15 text-left md:text-left flex flex-col items-center md:block">
            <h4 className="font-semibold mb-2">INTEREST</h4>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full">
              <span className="mt-1 bg-[#FFDEB5] px-2 py-1 rounded-full text-sm">
                Pottery
              </span>
              <span className="mt-1 bg-[#FFDEB5] px-2 py-1 rounded-full text-sm">
                Lifestyle & Home
              </span>
              <span className="mt-1 bg-[#FFDEB5] px-2 py-1 rounded-full text-sm">
                Painting
              </span>
            </div>
          </div>
        </aside>

        {/* Konten utama */}
        <section className="flex-1 px-4 md:px-0">
          <div className="border-b border-black mb-10">
            <ul className="flex gap-6 text-sm font-robotoMono overflow-x-auto scrollbar-hide">
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

          {/* ===== TICKET TAB CONTENT ===== */}
          {mainTab === "ticket" && (
            <>
              <div className="mb-4 mt-12">
                <ul className="flex gap-6 text-l font-semibold overflow-x-auto scrollbar-hide">
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
                <div>
                  {upcomingTickets.length > 0 ? (
                    upcomingTickets.map((ticket) => (
                      <div
                        key={ticket.booking_id}
                        className="bg-[#FEE4C4] overflow-hidden flex md:flex-row flex-col mb-4"
                      >
                        <div className="w-40 md:w-40 h-40">
                          <img
                            src={ticket.image_url || "/img/pict1.svg"}
                            alt="Workshop"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 px-3 py-3 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-lg font-robotoMono">
                              {ticket.title || "Workshop Title"}
                            </h3>
                            <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                              {ticket.description ||
                                "Learn the basics of this workshop."}
                            </p>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <img
                                  src="/img/location.svg"
                                  alt="iconL"
                                  className="w-4 h-4"
                                />
                                {ticket.location || "Jakarta, Indonesia"}
                              </span>
                              <span className="flex items-center gap-1">
                                <img
                                  src="/img/calender.svg"
                                  alt="iconC"
                                  className="w-4 h-4"
                                />
                                {formatDate(
                                  ticket.workshop_date || ticket.date
                                )}
                              </span>
                            </div>
                            <Link
                              to={`/ticket/${ticket.booking_id}`}
                              className="text-sm font-semibold text-black underline"
                            >
                              See Ticket
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No upcoming tickets.
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  {usedTickets.length > 0 ? (
                    usedTickets.map((ticket) => (
                      <div
                        key={ticket.booking_id}
                        className="bg-[#FEE4C4] overflow-hidden flex md:flex-row flex-col mb-4"
                      >
                        <div className="w-40 md:w-40 h-40">
                          <img
                            src={ticket.image_url || "/img/pict2.png"}
                            alt="Workshop"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 px-3 py-3 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-lg font-robotoMono">
                                {ticket.title || "Workshop Title"}
                              </h3>
                              <div className="text-md font-bold text-gray-700 flex items-center gap-1">
                                <span>N/A</span>
                                <img
                                  src="/img/starline.svg"
                                  alt="Rating Icon"
                                  className="w-7 h-7 object-contain"
                                />
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                              {ticket.description ||
                                "Learn the basics of this workshop."}
                            </p>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <img
                                  src="/img/location.svg"
                                  alt="iconL"
                                  className="w-4 h-4"
                                />
                                {ticket.location || "Jakarta, Indonesia"}
                              </span>
                              <span className="flex items-center gap-1">
                                <img
                                  src="/img/calender.svg"
                                  alt="iconC"
                                  className="w-4 h-4"
                                />
                                {formatDate(
                                  ticket.workshop_date || ticket.date
                                )}
                              </span>
                            </div>
                            <a
                              href="#"
                              className="text-sm font-semibold text-black underline"
                            >
                              Give a Review
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No used tickets.
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          {/* == NOTIFICATION == */}
          {mainTab === "notification" && (
            <div>
              <Notification />
            </div>
          )}
          {/* == MY WORKSHOP == */}
          {mainTab === "workshop" && (
            <div>
              <MyWorkshop />
            </div>
          )}
          {/* == KARYA POINTS == */}
          {mainTab === "karya" && (
            <div>
              <Points />
            </div>
          )}
          {/* == SETTINGS == */}
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
