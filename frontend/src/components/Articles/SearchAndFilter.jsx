import React from 'react';

const SearchAndFilter = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
      <button className="flex items-center justify-center px-4 py-2 border border-gray-400 rounded-md text-[#3B3021] font-semibold w-full md:w-auto hover:bg-gray-200 transition-colors">
        {/* SVG for filter icon */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="#3B3021" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        FILTERS
      </button>
      <div className="relative flex-grow w-full">
        <input 
          type="text" 
          placeholder="Search topics" 
          className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE9D2B]"
        />
        <button className="absolute right-0 top-0 h-full px-6 bg-[#3B3021] text-white rounded-r-md font-semibold hover:bg-opacity-90 transition-colors">
          Search
        </button>
      </div>
    </div>
  );
};
export default SearchAndFilter;