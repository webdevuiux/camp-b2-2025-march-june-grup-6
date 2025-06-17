import React from 'react';

const Pagination = () => {
  return (
    <div className="flex items-center justify-center gap-2 mt-8 text-sm text-gray-700">
      <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200" disabled>
        ← Previous
      </button>
      <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200">1</button>
      <button className="px-3 py-1 bg-gray-800 text-white border border-gray-800 rounded-md">2</button>
      <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200">3</button>
      <span className="px-2">...</span>
      <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200">87</button>
      <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200">
        Next →
      </button>
    </div>
  );
};

export default Pagination;
