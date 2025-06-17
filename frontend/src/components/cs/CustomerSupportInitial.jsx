import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const CustomerSupportInitial = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/customer-service/form');
  };

  return (
    <div className="min-h-screen bg-[#FBE8D3]">
      {/* Navbar */}
      <Navbar />

      {/* Konten */}
      <div className="flex w-full h-[90vh]">
        {/* Gambar kiri diperlebar */}
        <div className="w-[53%] h-full">
          <img
            src="/img/csService.png"
            alt="Customer Support"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Konten kanan */}
        <div className="w-[45%] flex items-center justify-center">
          <div className="max-w-md px-8">
            <h1 className="text-3xl font-bold text-black mb-4">Customer Support</h1>
            <p className="text-base text-black mb-6 leading-relaxed">
              <span className="font-semibold">Need help?</span> Contact us and your complaint will be handled promptly by our support team.
            </p>
            <button
              onClick={handleContinue}
              className="bg-black text-white py-3 px-12 rounded-md text-base hover:bg-gray-800 transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportInitial;
