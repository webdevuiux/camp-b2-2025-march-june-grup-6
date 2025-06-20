import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Konfigurasi base URL dari environment variable
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/d68ec5cb80433ba0e4c750a2a5b7f6a311291280?placeholderIfAbsent=true"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk toggle menu mobile

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setIsLoggedIn(true);
        setProfileImage(
          parsedUserData.profileImage
            ? `${API_BASE_URL}${parsedUserData.profileImage}`
            : "https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/d68ec5cb80433ba0e4c750a2a5b7f6a311291280?placeholderIfAbsent=true"
        );
      } catch (error) {
        console.error("Error parsing userData dari localStorage:", error);
        localStorage.removeItem("userData");
      }
    }
  }, []);

  const handleNavigation = (path) => {
    navigate(path, { replace: true });
    window.location.href = path;
    setIsMenuOpen(false); // Tutup menu mobile saat navigasi
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    handleNavigation("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#FFDEB5] shadow-md px-4 sm:px-6 py-1 flex items-center justify-between">
        {/* Bahasa - Kiri */}
        <div className="flex items-center gap-2 sm:gap-6 text-sm sm:text-lg text-black whitespace-nowrap underline leading-[20px] sm:leading-[25px]">
          <div className="font-bold">English</div>
          <div className="font-normal">Bahasa</div>
        </div>

        {/* Logo - Tengah */}
        <button
          onClick={() => handleNavigation("/")}
          className="cursor-pointer absolute left-1/2 transform -translate-x-1/2"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/3a1bc9cefadf0658c19a552cd245ebafc9e83053?placeholderIfAbsent=true"
            alt="TiketKarya Logo"
            className="w-[75px] h-[60px] sm:w-[100px]"
          />
        </button>

        {/* Hamburger Menu untuk Mobile - Kanan */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              ></path>
            </svg>
          </button>
        </div>

        {/* Nav Buttons + Profile/Sign In - Kanan */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row items-center gap-2 sm:gap-6 absolute sm:static top-12 left-0 w-full sm:w-auto bg-[#FFDEB5] sm:bg-transparent px-4 sm:px-0 py-2 sm:py-0 shadow-md sm:shadow-none z-40`}
        >
          <button
            onClick={() => handleNavigation("/search")}
            className="text-black text-[12px] sm:text-[15px] font-medium"
          >
            SEARCH
          </button>

          <button
            onClick={() => handleNavigation("/forum")}
            className="text-black text-[12px] sm:text-[15px] font-medium"
          >
            FORUM
          </button>

          <button
            onClick={() => handleNavigation("/articles")}
            className="text-black text-[12px] sm:text-[15px] font-medium"
          >
            ARTICLES
          </button>

          {/* Profile Section atau Sign In */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 bg-[#FCEBD5] px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-md"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/3876d5e0c2a0a2f1beac371be3bd500b058f255a?placeholderIfAbsent=true"
                  alt="Arrow"
                  className="w-[12px] sm:w-[15px]"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/53b785877f9554e64479b6d3d7fa84dd798c3d33?placeholderIfAbsent=true"
                  alt="Notification"
                  className="w-[14px] sm:w-[18px]"
                />
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-7 sm:w-9 h-7 sm:h-9 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/d68ec5cb80433ba0e4c750a2a5b7f6a311291280?placeholderIfAbsent=true";
                  }}
                />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-[#FCEBD5] rounded-md shadow-lg py-2 z-50">
                  <button
                    onClick={() => handleNavigation("/ticket")}
                    className="block px-3 sm:px-4 py-1 sm:py-2 text-sm text-black hover:bg-[#ffe5c4] w-full text-left"
                  >
                    PROFILE
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block px-3 sm:px-4 py-1 sm:py-2 text-sm text-black hover:bg-[#ffe5c4] w-full text-left"
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleNavigation("/login")}
              className="bg-black text-white text-[12px] sm:text-[15px] font-medium px-3 sm:px-4 py-1 sm:py-2 rounded-xl"
            >
              SIGN IN
            </button>
          )}
        </div>
      </nav>

      {/* Spacer supaya konten tidak tertutup navbar */}
      <div className="h-[40px] sm:h-[60px]" />
    </>
  );
};

export default Navbar;