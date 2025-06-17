import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateWorkshopSuccess = () => {
  const navigate = useNavigate();

  // Scroll ke atas saat pertama kali render
  useEffect(() => {
    window.scrollTo(0, 0);
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
            Workshop Submitted Successfully
          </h1>
          <div className="text-lg text-gray-700 leading-relaxed space-y-2">
            <p>Your workshop has been submitted!</p>
            <p>
              Our team will review your submission and publish it with in 1–2< br/>business days.
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

export default CreateWorkshopSuccess;
