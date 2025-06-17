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
  ); // Default profile image

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
        console.error("Error parsing userData from localStorage:", error);
        localStorage.removeItem("userData");
      }
    }
  }, []);

  const handleNavigation = (path) => {
    navigate(path, { replace: true });
    window.location.href = path;
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Hapus data pengguna dari localStorage saat logout
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    handleNavigation("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#FFDEB5] shadow-md px-6 py-1 flex items-center justify-between">
        {/* Bahasa */}
        <div className="ml-10 flex items-center gap-6 text-lg text-black whitespace-nowrap underline leading-[25px]">
          <div className="font-bold">English</div>
          <div className="font-normal">Bahasa</div>
        </div>

        {/* Logo */}
        <button
          onClick={() => handleNavigation("/")}
          className="cursor-pointer"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/3a1bc9cefadf0658c19a552cd245ebafc9e83053?placeholderIfAbsent=true"
            alt="TiketKarya Logo"
            className="w-[82px] h-auto"
          />
        </button>

        {/* Nav Buttons + Profile/Sign In */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavigation("/search")}
            className="text-black text-[15px] font-medium"
          >
            SEARCH
          </button>

          <button
            onClick={() => handleNavigation("/forum")}
            className="text-black text-[15px] font-medium"
          >
            FORUM
          </button>

          <button
            onClick={() => handleNavigation("/articles")}
            className="text-black text-[15px] font-medium"
          >
            ARTICLES
          </button>

          {/* Profile Section atau Sign In */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 bg-[#FCEBD5] px-4 py-2 rounded-full shadow-md"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/3876d5e0c2a0a2f1beac371be3bd500b058f255a?placeholderIfAbsent=true"
                  alt="Arrow"
                  className="w-[15px]"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/53b785877f9554e64479b6d3d7fa84dd798c3d33?placeholderIfAbsent=true"
                  alt="Notification"
                  className="w-[18px]"
                />
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/d68ec5cb80433ba0e4c750a2a5b7f6a311291280?placeholderIfAbsent=true"; // Fallback
                  }}
                />
              </button>

              {/* Dropdown */}
             {isDropdownOpen && (
  <div className="absolute right-0 mt-2 w-48 bg-[#FCEBD5] rounded-md shadow-lg py-2 z-50">
    <button
      onClick={() => handleNavigation("/ticket")}
      className="block px-4 py-2 text-sm text-black hover:bg-[#ffe5c4] w-full text-left"
    >
      PROFILE
    </button>
    <button
      onClick={handleLogout}
      className="block px-4 py-2 text-sm text-black hover:bg-[#ffe5c4] w-full text-left"
    >
      LOGOUT
    </button>
  </div>
)}

            </div>
          ) : (
            <button
              onClick={() => handleNavigation("/login")}
              className="bg-black text-white text-[15px] font-medium px-4 py-2 rounded-xl"
            >
              SIGN IN
            </button>
          )}
        </div>
      </nav>

      {/* Spacer supaya konten tidak tertutup navbar */}
      <div className="h-[40px]" />
    </>
  );
};

export default Navbar;
