import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Plus } from "lucide-react";

const SearchFilter = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 max-md:mb-4">
      <div className="flex w-full md:w-auto items-center gap-2 max-md:flex-col max-md:gap-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-grow gap-2 max-md:w-full"
        >
          <div className="relative flex-grow max-md:w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 max-md:left-2"
              size={20}
            />
            <input
              type="text"
              placeholder="Search Text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-12 pr-4 border border-gray-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-800 max-md:h-9 max-md:pl-10 max-md:text-sm"
            />
          </div>
          <button
            type="submit"
            className="h-11 px-6 bg-gray-800 text-white rounded-md hover:bg-gray-700 max-md:h-9 max-md:px-4 max-md:text-sm"
          >
            Search
          </button>
        </form>
        <button className="h-11 flex items-center gap-2 px-4 border border-gray-400 rounded-md hover:bg-gray-100 max-md:h-9 max-md:px-2 max-md:text-sm">
          <SlidersHorizontal size={16} />
          <span className="hidden md:inline">FILTERS</span>
        </button>
      </div>
    </div>
  );
};

SearchFilter.propTypes = {
  onSearch: PropTypes.func,
};

export default SearchFilter;