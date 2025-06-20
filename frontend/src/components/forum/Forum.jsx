import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import SearchFilter from "./components/SearchFilter";
import TopicList from "./components/TopicList";
import Pagination from "./components/Pagination";
import Footer from "../layout/Footer";

const Forum = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const handleCreateTopicClick = () => {
    navigate("/forum/create");
  };

  return (
    <div className="min-h-screen bg-[#FBE8D3] flex flex-col max-md:pt-5">
      <main className="flex-grow container mx-auto px-4 py-8 max-md:px-2 max-md:py-4">
        <HeroSection />
        <div className="flex justify-between items-center my-6 max-md:flex-col max-md:gap-4 max-md:my-3">
          <SearchFilter onSearch={handleSearch} />
          <button
            onClick={handleCreateTopicClick}
            className="-mt-8 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-[5px] shadow-md transition duration-300 ease-in-out whitespace-nowrap max-md:mt-0 max-md:w-full max-md:text-sm"
          >
            Create New Topic
          </button>
        </div>
        <TopicList searchQuery={searchQuery} />
        <Pagination />
      </main>
      <Footer />
    </div>
  );
};

export default Forum;