import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ViewWorkshopReview from "./ViewWorkshopReview";
import ReviewForm from "./ReviewForm";

const InfoBox = ({ icon, text, highlight = false }) => (
  <div className="flex w-[255px] rounded-sm overflow-hidden sm:w-[280px]">
    <div className="flex items-center justify-center w-[80px] bg-[#FF5126] sm:w-[90px]">
      <img src={icon} alt="icon" className="w-7 h-7 sm:w-8 sm:h-8" />
    </div>
    <div
      className={`flex items-center px-4 py-4 text-sm font-medium w-full ${
        highlight ? "bg-[#FF570C] text-white" : "bg-[#FFE0B7] text-black"
      } sm:text-base sm:px-6`}
    >
      {text}
    </div>
  </div>
);

const ViewWorkshopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workshop, setWorkshop] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/api/workshops/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch workshop details");
        }
        const data = await response.json();
        setWorkshop(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/reviews/workshops/${id}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) {
      fetchWorkshop();
      fetchReviews();
    } else {
      setLoading(false);
    }
  }, [id]);

  // Fungsi untuk menghitung durasi
  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "N/A";
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    const diffMs = end - start;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} Hours ${minutes > 0 ? `${minutes} Minutes` : ""}`.trim();
  };

  // Hitung rata-rata rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : null;

  if (loading) return <p className="p-6 text-gray-600 sm:p-8">Loading...</p>;
  if (error) return <p className="p-6 text-red-600 sm:p-8">{error}</p>;
  if (!workshop)
    return <p className="p-6 text-gray-600 sm:p-8">Workshop not found</p>;

  const formattedDate = workshop.date
    ? new Date(workshop.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";
  const duration = calculateDuration(workshop.time, workshop.end_time);

  // Fungsi untuk navigasi ke PaymentForm dengan data workshop
  const handleBuyTicket = () => {
    navigate(`/payment-form/${id}`, {
      state: {
        workshop: {
          topic: workshop.topic || "Wheel Throwing for Beginners",
          date: formattedDate,
          location: workshop.location || "Jakarta, Indonesia",
          price: workshop.price || 350000,
          time: workshop.time || "10:00",
        },
      },
    });
  };

  return (
    <div className="flex h-screen overflow-hidden font-Roboto">
      {/* Kiri: Gambar */}
      <div className="w-1/2 hidden md:block">
        <img
          src={workshop.image_url || "/img/pict1.svg"}
          alt={workshop.topic || "Workshop"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Kanan: Konten */}
      <div className="w-full md:w-1/2 bg-[#FCEDDA] overflow-y-auto p-6 md:p-10 sm:p-8">
        {/* === TAB CONTENT === */}
        {activeTab === "review-form" ? (
          <div className="max-w-xl mx-auto mt-10 sm:mt-12">
            <ReviewForm
              workshopId={workshop.id}
              onClose={() => setActiveTab("reviews")}
              onReviewSubmitted={() => setActiveTab("reviews")}
            />
          </div>
        ) : (
          <>
            {/* Judul & Deskripsi */}
            <h1 className="text-2xl md:text-3xl font-bold mt-20 mb-5 sm:text-3xl">
              {workshop.topic || "Untitled Workshop"}
            </h1>
            <p className="text-sm md:text-base mb-4 text-justify sm:text-base">
              {workshop.description || "No description available."}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4 sm:gap-4">
              <div className="flex text-[#FF570C] text-[40px] sm:text-[45px]">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={
                      averageRating !== null && i < Math.round(averageRating)
                        ? ""
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm font-semibold sm:text-base">
                ({averageRating || "N/A"})
              </span>
              <span className="text-xs underline text-gray-600 cursor-pointer ml-2 sm:text-sm">
                {reviews.length} Reviews
              </span>
            </div>

            {/* Creator & Harga */}
            <div className="flex items-center justify-between mb-12 sm:gap-4">
              <div className="flex items-center gap-2 bg-[#FFDEB5] rounded-full px-4 py-3 sm:px-6 sm:py-4">
                <img
                  src={workshop.profile_image || "/img/icon_profil.svg"}
                  alt="creator"
                  className="w-8 h-8 rounded-full sm:w-10 sm:h-10"
                  onError={(e) => {
                    e.target.src = "/img/icon_profil.svg";
                  }}
                />
                <span className="font-medium text-sm sm:text-base">
                  {workshop.host || "Unknown Organizer"}
                </span>
              </div>
              <div className="flex overflow-hidden rounded-full text-[#2C2C2C] mr-8 text-xl font-bold sm:mr-12">
                <div className="bg-[#FF5126] px-4 py-3 text-white text-xl flex items-center sm:px-6 sm:py-4">
                  Rp
                </div>
                <div className="bg-[#FFDEB5] px-5 py-3 tracking-wide sm:px-6 sm:py-4">
                  {workshop.price || "350,000"}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 mb-8 text-base font-xl sm:gap-8">
              {["details", "benefits", "reviews"].map((tab) => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer pb-1 ${
                    activeTab === tab
                      ? "border-b-4 border-black text-black"
                      : "text-gray-500"
                  } capitalize sm:text-lg`}
                >
                  {tab}
                </div>
              ))}
            </div>

            {activeTab === "details" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:gap-6">
                  <InfoBox
                    icon="/img/location_icon.svg"
                    text={workshop.location || "Jakarta, Indonesia"}
                  />
                  <InfoBox
                    icon="/img/clock_icon.svg"
                    text={duration || "3 Hours"}
                  />
                  <InfoBox icon="/img/calender_icon.svg" text={formattedDate} />
                  <InfoBox
                    icon="/img/language_icon.svg"
                    text="Bahasa Indonesia"
                  />
                </div>

                <div className="mb-6 sm:mb-8">
                  <p className="font-semibold mb-1 sm:text-base">
                    Description :
                  </p>
                  <p className="text-sm leading-relaxed text-justify sm:text-base">
                    {workshop.description || "No description available."}
                  </p>
                </div>

                <div className="mb-12 sm:mb-16">
                  <p className="font-semibold mb-1 sm:text-base">Location :</p>
                  <p className="text-sm font-bold sm:text-base">
                    {workshop.location || "Tierra Ceramics Studio"}
                  </p>
                  <p className="text-sm sm:text-base">
                    {workshop.location ||
                      "Jl. Kemang Selatan VIII No. 15, Jakarta, Indonesia"}
                  </p>
                </div>
              </>
            )}

            {activeTab === "benefits" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 sm:gap-8">
                {/* What You'll Learn */}
                <div className="flex rounded-md overflow-hidden shadow-md sm:shadow-lg">
                  <div className="bg-[#FF5126] w-16 md:w-20 flex items-start justify-center py-4 sm:w-20 sm:py-6">
                    <img
                      src="/img/palette_icon.svg"
                      alt="palette"
                      className="w-6 md:w-10 mt-26 sm:w-12"
                    />
                  </div>
                  <div className="bg-[#FFE0B7] px-4 py-4 flex-1 sm:px-6 sm:py-6">
                    <h3 className="font-bold text-lg mb-2 sm:text-xl">
                      What You’ll Learn
                    </h3>
                    <ul className="text-sm list-disc list-inside space-y-1 sm:text-base">
                      <li>How to prepare and center clay on the wheel</li>
                      <li>Basic throwing techniques</li>
                      <li>Firing of one finished piece</li>
                      <li>How to trim and refine</li>
                      <li>Tips on pottery care</li>
                    </ul>
                  </div>
                </div>

                {/* What's Included */}
                <div className="flex rounded-md overflow-hidden shadow-md sm:shadow-lg">
                  <div className="bg-[#FF5126] w-16 md:w-20 flex items-start justify-center py-4 sm:w-20 sm:py-6">
                    <img
                      src="/img/gift_icon.svg"
                      alt="gift"
                      className="w-6 md:w-10 mt-26 sm:w-12"
                    />
                  </div>
                  <div className="bg-[#FFE0B7] px-4 py-4 flex-1 sm:px-6 sm:py-6">
                    <h3 className="font-bold text-lg mb-2 sm:text-xl">
                      What’s Included
                    </h3>
                    <ul className="text-sm list-disc list-inside space-y-1 sm:text-base">
                      <li>Pottery wheel & tools</li>
                      <li>Clay (2 pieces)</li>
                      <li>Firing 1 piece</li>
                      <li>Aprons, towels</li>
                      <li>Refreshments</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <ViewWorkshopReview
                workshopId={workshop.id}
                reviews={reviews}
                onWriteReview={() => setActiveTab("review-form")}
              />
            )}

            {/* BUY TICKET */}
            {activeTab !== "reviews" && (
              <div className="flex justify-center sm:mt-8">
                <button
                  onClick={handleBuyTicket}
                  className="bg-[#FF5126] text-white px-20 py-3 rounded-md text-sm font-bold shadow-md hover:bg-[#e65000] transition sm:px-24 sm:py-4"
                >
                  BUY TICKET
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewWorkshopDetail;