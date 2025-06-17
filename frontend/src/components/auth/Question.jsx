// src/pages/Question.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPaintBrush, FaMusic, FaSocks } from "react-icons/fa";

const categories = {
  "Arts & craft": [
    "Painting", "Pottery", "Origami", "Drawing & Sketching",
    "Woodworking", "Calligraphy", "Paper Craft", "Sculpture", "Printmaking"
  ],
  "Music": [
    "Guitar", "Ukulele", "Singing & Vocal Training", "Songwriting",
    "Traditional Instruments", "Sound Design"
  ],
  "Textile & fabric": [
    "Batik", "Natural Dyeing", "Weaving", "Embroidery",
    "Fabric Painting", "Hand Sewing", "Crochet & Knitting", "Quilting", "Fashion Upcycling"
  ],
};

const icons = {
  "Arts & craft": <FaPaintBrush className="mr-2" />,
  Music: <FaMusic className="mr-2" />,
  "Textile & fabric": <FaSocks className="mr-2" />,
};

const Question = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const toggleInterest = (interest) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleNext = () => {
    console.log("Selected Interests:", selected);
    navigate("/register-success");
  };

  return (
    <div className="min-h-screen bg-[#FCEBD9] p-8 flex flex-col justify-between relative">
      <div className="flex flex-col md:flex-row max-w-[1200px] mx-auto gap-12">
        {/* Left Stepper */}
        <div className="w-full md:w-1/3">
          <p className="text-gray-600 mb-4">Tell Us</p>
          <div className="relative ml-4">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-black border-2 border-black" />
              <h2 className="text-4xl font-bold ml-4">What Are Your Interest?</h2>
            </div>
            <div className="h-16 border-l-2 border-dashed border-black ml-2" />
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-black ml-0.5" />
              <h2 className="text-3xl font-bold ml-4">What Is Your Preferred Location</h2>
            </div>
          </div>
        </div>

        {/* Right Selection */}
<div className="w-full md:w-2/3 mt-12">
  {Object.entries(categories).map(([category, items]) => (
    <div key={category} className="mb-6">
      <div className="flex items-center text-lg font-bold mb-3">
        {icons[category]}
        {category}
      </div>
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => toggleInterest(item)}
            className={`px-4 py-2 rounded-full text-sm transition-colors
              ${selected.includes(item) ? "bg-black text-white" : "bg-[#FFDDAF] text-black"}
            `}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  ))}
</div>
      </div>

      {/* Floating Bottom Buttons */}
      <div className="absolute bottom-8 left-8">
        <button
          onClick={() => navigate("/register-success")}
          className="underline text-black text-base"
        >
          Skip
        </button>
      </div>

      <div className="absolute bottom-8 right-8">
        <button
          onClick={handleNext}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-opacity-80 flex items-center gap-2"
        >
          <span>Next</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default Question;
