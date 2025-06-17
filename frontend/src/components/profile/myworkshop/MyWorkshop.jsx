import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyWorkshop = () => {
  const [tab, setTab] = useState("published");
  const [workshops, setWorkshops] = useState([]);
  const navigate = useNavigate();
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Reset workshops saat tab berubah
    setWorkshops([]);

    const fetchWorkshops = async () => {
      try {
        const status = tab === "published" ? "upcoming" : "pending"; // 'upcoming' untuk published, 'pending' untuk draft
        const response = await fetch(
          `${API_BASE_URL}/api/workshops/my?status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            setWorkshops([]); // Set ke array kosong jika 404
            return;
          }
          throw new Error("Failed to fetch workshops");
        }

        const data = await response.json();
        setWorkshops(data);
      } catch (err) {
        console.error("Error fetching workshops:", err);
        setWorkshops([]); // Pastikan state tetap aman meskipun ada error
      }
    };

    fetchWorkshops();
  }, [tab, token, API_BASE_URL]);

  const handleCreateWorkshop = () => {
    navigate("/create-workshop");
  };

  // Fungsi untuk membuka draft dengan data workshop
  const handleOpenDraft = (workshop) => {
    navigate("/create-workshop", {
      state: { workshop }, // Kirim data workshop sebagai state
    });
  };

  return (
    <div className="relative w-full max-w-4xl ml-[-15px] mt-4 px-4">
      <div className="flex space-x-8 border-black mt-12 mb-2">
        <button
          onClick={() => setTab("published")}
          className={`pb-2 font-semibold border-b-2 ${
            tab === "published" ? "border-black" : "border-transparent"
          }`}
        >
          Published
        </button>
        <button
          onClick={() => setTab("draft")}
          className={`pb-2 font-semibold border-b-2 ${
            tab === "draft" ? "border-black" : "border-transparent"
          }`}
        >
          Draft
        </button>
      </div>

      {tab === "published" && (
        <div className="space-y-6">
          {workshops.length === 0 ? (
            <div className="text-center mt-20">
              <p className="font-semibold text-lg">
                You don’t have any published workshops yet.
              </p>
              <p className="text-md mt-2">
                Continue your draft or create a new one to get started!
              </p>
            </div>
          ) : (
            workshops.map((workshop) => (
              <div
                key={workshop.submission_id}
                className="bg-[#FEE4C4] overflow-hidden flex md:flex-row flex-col"
              >
                <div className="w-40 md:w-40 h-full">
                  <img
                    src={workshop.image_url || "/img/file-icon.png"}
                    alt={workshop.topic}
                    className="w-[160px] h-40 object-cover"
                  />
                </div>
                <div className="flex-1 px-3 py-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg font-robotoMono">
                      {workshop.topic}
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">
                      {workshop.description || "No description available."}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex gap-6">
                      <span className="flex items-center gap-1">
                        <img
                          src="/img/location.svg"
                          alt="iconL"
                          className="w-4 h-4"
                        />
                        {workshop.location || "No location"}
                      </span>
                      <span className="flex items-center gap-1">
                        <img
                          src="/img/calender.svg"
                          alt="iconC"
                          className="w-4 h-4"
                        />
                        {workshop.date
                          ? new Date(workshop.date).toLocaleDateString()
                          : "No date"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "draft" && (
        <div className="space-y-6">
          {workshops.length === 0 ? (
            <div className="text-center mt-20">
              <p className="font-semibold text-lg">
                You have no draft workshops yet.
              </p>
              <p className="text-md mt-2">
                Start drafting your ideas and publish them when you're ready!
              </p>
            </div>
          ) : (
            workshops.map((workshop) => (
              <div
                key={workshop.submission_id}
                className="bg-[#FEE4C4] overflow-hidden flex md:flex-row flex-col"
              >
                <div className="w-40 md:w-40 h-full">
                  <img
                    src={workshop.image_url || "/img/file-icon.png"}
                    alt={workshop.topic}
                    className="w-[160px] h-40 object-cover"
                  />
                </div>
                <div className="flex-1 px-3 py-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg font-robotoMono">
                      {workshop.topic}
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">
                      {workshop.description || "No description available."}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex gap-6">
                      <span className="flex items-center gap-1">
                        <img
                          src="/img/location.svg"
                          alt="iconL"
                          className="w-4 h-4"
                        />
                        {workshop.location || "No location"}
                      </span>
                      <span className="flex items-center gap-1">
                        <img
                          src="/img/calender.svg"
                          alt="iconC"
                          className="w-4 h-4"
                        />
                        {workshop.date
                          ? new Date(workshop.date).toLocaleDateString()
                          : "No date"}
                      </span>
                    </div>
                    <button
                      onClick={() => handleOpenDraft(workshop)}
                      className="bg-[#FA5A1E] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
                    >
                      Open Draft
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <div className="mt-36 flex justify-end">
        <button
          onClick={handleCreateWorkshop}
          className="bg-[#2B2B2B] text-[#FCEDDA] px-4 py-2 rounded-[5px] flex items-center gap-2 shadow-md"
        >
          Create Workshop
          <img src="/img/plusicon.svg" alt="plus icon" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MyWorkshop;
