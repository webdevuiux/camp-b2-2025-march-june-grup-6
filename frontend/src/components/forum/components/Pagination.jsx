import React from "react";

const Pagination = () => {
  return (
    <div className="flex items-center justify-center gap-2 mt-8 text-sm text-gray-700 max-md:flex-col max-md:gap-1 max-md:mt-4">
      <button
        className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 max-md:px-2 max-md:py-0.5 max-md:text-xs"
        disabled
      >
        ← Previous
      </button>
      <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 max-md:px-2 max-md:py-0.5 max-md:text-xs">
        1
      </button>
      <button className="px-3 py-1 bg-gray-800 text-white border border-gray-800 rounded-md max-md:px-2 max-md:py-0.5 max-md:text-xs">
        2
      </button>
      <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 max-md:px-2 max-md:py-0.5 max-md:text-xs">
        3
      </button>
      <span className="px-2 max-md:px-1 max-md:text-xs">...</span>
      <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 max-md:px-2 max-md:py-0.5 max-md:text-xs">
        87
      </button>
      <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 max-md:px-2 max-md:py-0.5 max-md:text-xs">
        Next →
      </button>
    </div>
  );
};

export default Pagination;