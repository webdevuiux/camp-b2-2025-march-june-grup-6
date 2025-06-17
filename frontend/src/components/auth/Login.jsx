import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from ".././layout/Navbar";
import axios from "axios"; // Pastikan axios diinstal: npm install axios

// Konfigurasi base URL dari environment variable
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Efek untuk memuat data pengguna setelah login
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      // Anda bisa menambahkan logika untuk memeriksa apakah pengguna sudah login
      // Jika sudah, arahkan ke halaman utama
      if (parsedUserData && parsedUserData.id) {
        navigate("/login-succes"); // Arahkan ke dashboard atau halaman utama
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        // console.log("Login successful:", data);
        // Simpan semua data pengguna ke localStorage, termasuk field tambahan
        const userData = {
          id: data.user.id,
          username: data.user.username,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone || "", // Pastikan field ini ada
          country: data.user.country || "", // Pastikan field ini ada
          language: data.user.language || "", // Pastikan field ini ada
          profileImage: data.user.profileImage || "", // Pastikan field ini ada
          role: data.user.role,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("token", data.token);
        navigate("/login-success");
      } else {
        console.error("Login failed:", data.message);
        setError(
          data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      console.error("Network or server error during login:", err);
      setError(
        err.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  const handleSignUp = () => navigate("/register");
  const handleadminLogin = () => navigate("/login-admin");
  const handleForgotPassword = () => navigate("/reset-password");

  return (
    <main className="flex flex-col items-stretch bg-[#FCEDDA] min-h-screen">
      {/* Navbar */}
      <div className="w-full max-w-[1440px] mx-auto px-8 py-4">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        <div className="flex w-full max-w-[1440px] mx-auto">
          {/* Left side - Image */}
          <div className="w-1/2 flex items-center justify-center p-8 max-md:hidden">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/bfbd4cb16b365e1694925c5aa26bac5b583b306f?placeholderIfAbsent=true"
              alt="Register Illustration"
              className="w-full h-auto max-w-[650px] rounded-[15px]"
            />
          </div>

          {/* Right - Form */}
          <div className="w-1/2 flex items-center justify-center p-8 max-md:w-full relative">
            <div className="w-[490px] max-w-full">
              {/* Close Button */}
              <button
                onClick={() => navigate("/")}
                className="absolute top-4 right-4 text-black text-2xl font-bold hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                X
              </button>

              <form onSubmit={handleSubmit}>
                <div className="w-full">
                  <h1 className="text-black text-center text-[44px] font-bold leading-tight max-md:text-[36px]">
                    Sign In
                  </h1>

                  <div className="w-full font-normal mt-[48px] max-md:mt-10 space-y-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="username"
                        className="text-sm text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full py-[6px] border-b-[2px] border-black bg-transparent focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full py-[6px] border-b-[2px] border-black bg-transparent focus:outline-none"
                      />
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-[#FFDEB5] text-black font-semibold py-[15px] rounded-full text-lg mt-8 hover:bg-[#FFD19F] transition-colors"
                    >
                      SIGN IN
                    </button>
                  </div>
                </div>
              </form>

              {/* Auth Links */}
              <div className="self-center flex flex-col items-center text-sm text-black font-normal mt-6 space-y-6">
                <button
                  className="text-center underline"
                  onClick={handleForgotPassword}
                >
                  Forgot your password?
                </button>

                <div className="flex items-center gap-2 text-sm">
                  <span>Don't have an account?</span>
                  <button className="underline" onClick={handleSignUp}>
                    Sign Up
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Login as Admin</span>
                  <button className="underline" onClick={handleadminLogin}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
