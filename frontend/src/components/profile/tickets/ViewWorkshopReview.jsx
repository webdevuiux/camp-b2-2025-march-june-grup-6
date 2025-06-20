import React, { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";

const ViewWorkshopReview = ({ workshopId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const url = `${API_BASE_URL}/api/reviews/workshops/${workshopId}/reviews`;
        // console.log("Workshop ID in ViewWorkshopReview:", workshopId); // Debug workshopId
        // console.log("Fetching reviews from:", url); // Debug URL
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (workshopId) {
      fetchReviews();
    } else {
      setLoading(false);
      // console.log("No workshopId provided in ViewWorkshopReview"); // Debug jika workshopId tidak ada
    }
  }, [workshopId]);

  if (loading)
    return <p className="p-6 text-gray-600 sm:p-8">Loading reviews...</p>;
  if (error) return <p className="p-6 text-red-600 sm:p-8">{error}</p>;

  return (
    <div className="mb-16 max-w-2xl mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-start gap-4 mb-6 flex-col sm:flex-row">
        <button className="border border-black rounded-full px-4 py-3 text-sm font-medium flex items-center gap-2 sm:px-6 sm:py-4">
          <img
            src="/img/filters.icon.svg"
            alt="filter"
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          FILTERS
        </button>
        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-6 py-3 rounded-full font-semibold sm:px-8 sm:py-4"
        >
          Write a Review
        </button>
      </div>
      <div className="flex justify-between items-center mb-4 text-sm sm:text-base">
        <span>{reviews.length} reviews</span>
        <span className="underline cursor-pointer">Sort Most Helpful ▼</span>
      </div>
      {showForm && (
        <ReviewForm
          workshopId={workshopId}
          onClose={() => setShowForm(false)}
          onReviewSubmitted={() => {
            setShowForm(false);
            fetch(
              `${API_BASE_URL}/api/reviews/workshops/${workshopId}/reviews`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
              .then((res) => res.json())
              .then((data) => setReviews(data))
              .catch((err) => setError(err.message));
          }}
        />
      )}
      {reviews.length === 0 ? (
        <div className="text-center text-gray-500 py-6 sm:py-8">
          Belum ada review
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 flex gap-4 sm:gap-6">
              <img
                src={
                  review.profile_image || // Gunakan profile_image dari user
                  `https://i.pravatar.cc/40?img=${(review.id % 10) + 1}` // Fallback avatar
                }
                alt={
                  review.username || `${review.first_name} ${review.last_name}`
                }
                className="rounded-full w-10 h-10 sm:w-12 sm:h-12"
                onError={(e) => {
                  e.target.src = `https://i.pravatar.cc/40?img=${
                    (review.id % 10) + 1
                  }`;
                }}
              />
              <div>
                <div className="font-semibold sm:text-base">
                  {review.username ||
                    `${review.first_name} ${review.last_name}`}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1 sm:text-sm">
                  {/* Rating Bintang */}
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < (review.rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } sm:text-xl`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mb-1 sm:text-sm">
                  {review.created_at
                    ? new Date(review.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : "N/A"}
                </div>
                <div className="font-medium sm:text-base">
                  {review.review_title}
                </div>
                <div className="text-sm text-gray-700 sm:text-base">
                  {review.review_description || "No description provided."}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {reviews.length > 0 && (
        <div className="flex justify-center mt-6 sm:mt-8">
          <button className="bg-black text-white px-8 py-2 rounded-full text-sm font-medium sm:px-10 sm:py-3">
            SEE MORE
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewWorkshopReview;