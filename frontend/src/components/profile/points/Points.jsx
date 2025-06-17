import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import PointsHistoryPopup from "./PointsHistoryPopup"; // Pastikan path sesuai

const Points = () => {
  const [showPopup, setShowPopup] = useState(false);
  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="max-w-6xl mx-auto px-[-2] py-4">
      {/* Header Section */}
      <div className="bg-[#FEE4C4] p-6 flex justify-between items-center rounded">
        {/* Left Side */}
        <div className="flex items-center gap-6">
          <img
            src="./img/Kpoin.png"
            alt="K Points"
            className="w-34 h-34 object-contain"
          />
          <h1 className="text-6xl font-black text-black">103</h1>
        </div>

        {/* Right Side */}
        <div className="gap-3 text-left flex flex-col items-start">
          <p className="text-xl">Today’s Points</p>
          <p className="text-3xl font-bold">0</p>
          <a
            href="#"
            onClick={handleOpenPopup}
            className="text-blue-600 text-sm flex items-center gap-1"
          >
            Points history <span>❯</span>
          </a>
        </div>
      </div>

      {/* Redeem Section Header */}
      <div className="flex justify-between items-center mt-10 mb-6">
        <h2 className="text-[30px] font-bold">Redeem</h2>

        {/* Search Bar */}
        <div className="flex items-center bg-[#FEE4C4] rounded px-4 py-2 w-full max-w-md">
          <FiSearch className="text-[#797979] mr-2" />
          <input
            type="text"
            placeholder="Search Text"
            className="flex-grow bg-transparent focus:outline-none placeholder:text-gray-700 text-black"
          />
          <div className="border-l border-[#2B2B2B] h-8 mx-4"></div>
          <button className="px-4 py-1 bg-[#2B2B2B] rounded-[5px] text-white">Search</button>
        </div>
      </div>

      {/* Reward Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="gap-4 bg-[#FFDEB5] rounded-xl shadow-md p-6 text-center transition-transform hover:scale-105 min-h-[260px]"
          >
            <img
              src="./img/coupon.png"
              alt="Coupon"
              className="w-30 h-30 mx-auto mb-4 object-contain"
            />
            <h3 className="text-xl font-semibold text-center mb-8 whitespace-nowrap">
              20% Ticket Discount
            </h3>
            <p className="text-base mb-2">1,700 Points</p>
            <a
              href="#"
              className="text-blue-600 text-sm flex justify-center items-center gap-1 font-medium"
            >
              REDEEM REWARD <span>❯</span>
            </a>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mb-8 text-[#2B2B2B]">
        <button className="text-sm text-[#bfbfbf] flex items-center" disabled>
          ← Previous
        </button>
        <button className="bg-[#FF7A00] text-white text-sm px-3 py-1 rounded">1</button>
        <button className="text-sm px-3 py-1">2</button>
        <button className="text-sm px-3 py-1">3</button>
        <span className="text-sm">...</span>
        <button className="text-sm px-3 py-1">67</button>
        <button className="text-sm px-3 py-1">68</button>
        <button className="text-sm flex items-center">Next →</button>
      </div>

      {/* Modal */}
      {showPopup && <PointsHistoryPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default Points;
