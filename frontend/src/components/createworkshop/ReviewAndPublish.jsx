import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReviewAndPublish = ({
  coverData,
  generalData,
  locationData,
  ticketData,
  onBack,
  onSubmit,
  loading,
  error,
  success,
}) => {
  const [isScheduled, setIsScheduled] = useState(false);
  const [publishDate, setPublishDate] = useState("");
  const [publishTime, setPublishTime] = useState("");
  const navigate = useNavigate();

  // Ambil dan parse data user dari localStorage
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const isFormValid = !isScheduled || (publishDate && publishTime);

  const handleFinish = () => {
    if (!isFormValid) {
      alert("Mohon lengkapi tanggal dan waktu publikasi.");
      return;
    }
    onSubmit(); // Panggil fungsi submit dari parent
  };

  // Gunakan data dari userData jika tersedia
  const username = userData?.username || "Unknown User";
  const userProfileImage = userData?.profileImage || "/img/icon_profil.svg";

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <img src="/img/icon_image.svg" alt="Review Icon" className="w-6 h-6" />
        Review
      </h2>

      {/* Workshop Card Preview */}
      <div className="flex bg-[#FFDEB5] shadow mb-8 overflow-hidden">
        <img
          src={coverData.image || "/img/placeholder.png"} // Ganti dengan placeholder jika belum ada
          alt="Workshop Cover"
          className="w-1/3 object-cover"
        />
        <div className="p-8 w-2/3">
          <h3 className="mt-[-15px] text-xl font-semibold mb-1">
            {generalData.title || "Untitled Workshop"}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <img
              src={userProfileImage} // Gunakan gambar profil pengguna
              alt="User Profile"
              className="w-4 h-4 rounded-full"
            />
            <span>{username}</span> {/* Tampilkan username */}
          </div>
          <p className="text-sm mb-4">
            {generalData.description || "No description provided."}
          </p>

          {/* Location, Date, and Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 items-center">
            <div className="flex items-center gap-2">
              <img
                src="/img/location.svg"
                alt="Location Icon"
                className="w-4 h-4"
              />
              <span>{locationData.location || "No location"}</span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/img/calender.svg"
                alt="Date Icon"
                className="w-4 h-4"
              />
              <span>
                {locationData.date
                  ? new Date(locationData.date).toLocaleDateString()
                  : "No date"}
              </span>
            </div>
            <div className="mt-6 mr-6 flex overflow-hidden rounded-full text-[#2C2C2C] text-lg font-bold justify-self-start sm:justify-self-end">
              <div className="bg-[#FF5126] px-3 py-3 text-white">Rp</div>
              <div className="bg-white px-5 py-3 tracking-wide">
                {ticketData.price ? ` ${ticketData.price}` : "0"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publish Schedule */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-semibold">Publish schedule</h3>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isScheduled}
              onChange={() => setIsScheduled(!isScheduled)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500 relative"></div>
          </label>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Set the publishing time to ensure that your workshop appears on the
          website at the designated time
        </p>

        {/* Grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <input
            type="date"
            disabled={!isScheduled}
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            className="w-full bg-white border border-gray-400 rounded px-4 py-2"
            placeholder="Publish Date"
          />
          <input
            type="time"
            disabled={!isScheduled}
            value={publishTime}
            onChange={(e) => setPublishTime(e.target.value)}
            className="w-full bg-white border border-gray-400 rounded px-4 py-2"
            placeholder="Publish Time"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 mt-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-[#FFE1BF] text-black px-6 py-1 rounded-lg"
        >
          ← Back
        </button>
        <button
          onClick={handleFinish}
          disabled={!isFormValid || loading}
          className={`flex items-center gap-2 px-6 py-1 rounded-lg transition-colors
            bg-[#FA5A1E] text-white hover:bg-[#e14e17] disabled:cursor-not-allowed ${
              loading ? "opacity-50" : ""
            }`}
        >
          {loading ? "Submitting..." : "Finish"}
        </button>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {success && <div className="text-green-500 mt-2">{success}</div>}
    </div>
  );
};

export default ReviewAndPublish;
