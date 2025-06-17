import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Refund_Successful = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("xxxxxxxx@gmail.com"); // Default value

  // Scroll ke atas saat pertama kali render
  useEffect(() => {
    window.scrollTo(0, 0);

    // Ambil email pengguna
    const fetchUserEmail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const API_BASE_URL =
            process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
          const response = await fetch(`${API_BASE_URL}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const userData = await response.json();
          setUserEmail(userData.email || "xxxxxxxx@gmail.com"); // Update email dari API
        }
      } catch (err) {
        console.error("Error fetching user email:", err);
        // Jika gagal, tetap gunakan default email
      }
    };

    fetchUserEmail();
  }, []);

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-[#FCEDDA] flex flex-col items-center pt-28 pb-12 px-4">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/a698bdb8c61876e67b32bbd518c48fb0367d6e8b"
            alt="Success"
            className="w-24 h-24 mx-auto"
          />
        </div>

        {/* Success Message */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-black mb-5">
            Permintaan Refund Terkirim
          </h1>
          <div className="text-lg text-gray-700 leading-relaxed space-y-2">
            <p>We've received your request!</p>
            <p>
              Our team will review it and get back to you within 3–5 business
              days
            </p>
            <p>
              A confirmation has been sent to{" "}
              <span className="font-medium">{userEmail}</span>
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleReturnHome}
          className="bg-black text-white text-lg font-semibold px-10 py-3 rounded-[5px] hover:bg-opacity-90 transition-colors w-full max-w-md mx-auto"
        >
          Return to Home
        </button>
      </div>
    </main>
  );
};

export default Refund_Successful;
