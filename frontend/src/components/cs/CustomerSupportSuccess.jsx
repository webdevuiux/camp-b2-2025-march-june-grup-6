import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import axios from "axios"; // Pastikan axios diinstal: npm install axios

const CustomerSupportSuccess = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(""); // State untuk menyimpan email pengguna
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  // Fetch email pengguna saat komponen dimuat
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Asumsi token disimpan di localStorage
        });
        setUserEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user email:", error);
        setUserEmail("xxxxxxx@gmail.com"); // Fallback jika gagal fetch
      }
    };

    fetchUserEmail();
  }, [API_BASE_URL]);

  const handleReturnToHome = () => {
    navigate("/");
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#FAE6D1]">
      {/* Navbar */}
      <Navbar />

      {/* Konten Utama */}
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="text-center">
          {/* Ikon Centang */}
          <svg
            className="mx-auto h-24 w-24 text-black mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          {/* Judul */}
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            Your message has been received
          </h1>

          {/* Paragraf */}
          <p className="text-lg text-black mt-4 mb-10 max-w-xl mx-auto leading-relaxed">
            Thanks for contacting us! We’ve received your message. Check on your
            email <strong>{userEmail || "xxxxxxx@gmail.com"}</strong> for
            confirmation.
          </p>

          {/* Tombol */}
          <button
            onClick={handleReturnToHome}
            className="bg-black text-white text-lg font-semibold py-3 px-28 rounded-[50px] hover:bg-gray-800 transition-colors"
          >
            Return to home
          </button>
        </div>
      </div>
    </main>
  );
};

export default CustomerSupportSuccess;
