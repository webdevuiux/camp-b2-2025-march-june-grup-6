import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Konfigurasi base URL dari environment variable
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Reset_Password_Form = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset pesan sebelum pengiriman

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/reset-password-success");
      } else {
        setMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Error during reset password:", err);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <main className="flex flex-col items-center bg-[#FCEDDA] min-h-screen relative">
      {/* Spacer untuk navbar tetap */}
      <div className="h-[60px] w-full" /> {/* Sesuaikan tinggi navbar Anda */}
      <div className="flex w-full max-w-[1440px] flex-1">
        {/* Left side - Image - 50% */}
        <div className="w-1/2 flex items-center justify-center p-8 bg-gray-100">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/e3eba738bee301607c6d12179c1ad9cc03bfe6a4?placeholderIfAbsent=true"
            alt="Reset Password Illustration"
            className="w-full h-auto max-w-[650px] rounded-[15px] object-cover"
          />
        </div>

        {/* Right side - Reset Password Form - 50% */}
        <div className="w-1/2 flex items-center justify-center p-8 bg-[#FCEDDA]">
          <div className="w-full max-w-[490px] text-center">
            <h1 className="text-black text-5xl font-bold leading-none mb-6 max-md:text-[40px]">
              Set New Password
            </h1>
            <form onSubmit={handleSubmit} className="w-full font-normal">
              <div className="w-full text-left">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  required
                  className="w-full min-h-[29px] text-[15px] text-black py-2 border-b-2 border-black bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full min-h-[55px] text-xl bg-[#FFDEB5] mt-10 px-4 py-3 rounded-[50px] hover:bg-[#FFD19F] transition-colors"
                >
                  RESET PASSWORD
                </button>
              </div>
              {message && (
                <p className="text-center mt-4 text-red-600">{message}</p>
              )}
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-base text-black leading-7 hover:underline"
                >
                  Back to <span className="underline">Sign In</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Reset_Password_Form;
