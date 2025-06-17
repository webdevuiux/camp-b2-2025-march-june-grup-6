import React, { useState, useRef } from "react";

const ReviewForm = ({ workshopId, onClose, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [media, setMedia] = useState(null);
  const [error, setError] = useState(null);

  const mediaRef = useRef(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  // Validasi sederhana: media opsional
  const isFormValid = rating !== 0 && title.trim().length > 0 && description.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const formData = new FormData();
    formData.append("workshop_id", workshopId);
    formData.append("review_title", title.trim());
    formData.append("review_description", description.trim());
    formData.append("rating", rating);
    if (media) {
      Array.from(media).forEach((file) => {
        formData.append("media", file); // multer mendukung multiple files dengan nama "media"
      });
    }

    try {
      const url = `${API_BASE_URL}/api/reviews/reviews`; // URL yang sesuai dengan server.js
      // console.log("Submitting to:", url, "with workshopId:", workshopId); // Debug
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json(); // Ambil detail error
        throw new Error(errorData.message || "Failed to submit review");
      }
      setSubmitted(true);
      if (onReviewSubmitted) onReviewSubmitted();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMediaChange = (e) => {
    setMedia(e.target.files);
  };

  if (submitted) {
    return (
      <div className="w-full min-h-screen bg-[#FAEBDD] flex flex-col justify-center items-center font-Roboto">
        <img
          src="/img/logo_tk_blackwhite.svg"
          alt="Logo"
          className="h-20 mb-6"
        />
        <h2 className="text-lg font-semibold mb-2">Review Submitted</h2>
        <p className="text-sm mb-6">
          Thanks for sharing your feedback with us!
        </p>
        <button
          className="bg-black text-white py-2 px-8 rounded-md"
          onClick={onClose}
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FAEBDD] px-6 md:px-2 py-6 font-Roboto">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img
          src="/img/logo_tk_blackwhite.svg"
          alt="Review Logo"
          className="h-20 md:h-26"
        />
      </div>

      {/* Card */}
      <div className="border border-black bg-[#E9DCCB] rounded-sm max-w-2xl mx-auto flex flex-col md:flex-row p-0 mb-8 overflow-hidden">
        <div className="md:w-1/3 w-full h-full">
          <img
            src="/img/pict2.png"
            alt="Workshop Thumbnail"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center w-full p-6">
          <h2 className="text-xl font-bold mb-2">
            Wheel Throwing for Beginners
          </h2>
          <div className="text-5xl text-black">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`transition duration-200 ${
                  value <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-6 max-w-2xl mx-auto" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="border bg-[#E9DCCB] rounded-sm p-4 border-black">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-none bg-transparent p-0 text-base focus:outline-none focus:ring-0 placeholder-gray-500"
            placeholder="Review Title"
          />
        </div>

        {/* Description */}
        <div className="border bg-[#E9DCCB] rounded-sm p-4 border-black">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-none bg-transparent p-0 text-base focus:outline-none focus:ring-0 placeholder-gray-500 resize-none"
            rows="5"
            placeholder="Review Description"
          ></textarea>
        </div>

        {/* Upload media (opsional) */}
        <label
          htmlFor="media-upload"
          ref={mediaRef}
          className="border bg-[#E9DCCB] rounded-sm p-6 text-center text-sm cursor-pointer hover:bg-[#e0cfb6] transition block border-black"
        >
          <p className="font-semibold">Add Photos or Videos (Optional)</p>
          <p className="text-gray-500">Click here or drag to upload</p>
          <input
            id="media-upload"
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={handleMediaChange}
          />
        </label>

        {/* Preview */}
        {media && (
          <ul className="text-xs text-gray-600">
            {Array.from(media).map((file, index) => (
              <li key={index}>• {file.name}</li>
            ))}
          </ul>
        )}

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* Terms */}
        <p className="text-xs text-center text-gray-600">
          By continuing you agree to our{" "}
          <span className="underline cursor-pointer">Terms and Conditions</span>{" "}
          and <span className="underline cursor-pointer">Privacy Policy</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 border border-gray-500 text-gray-700 rounded-md"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 font-semibold rounded-md ${
              !isFormValid ? "cursor-not-allowed opacity-50" : ""
            } bg-black text-white`}
          >
            Agree & Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;