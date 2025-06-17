import React, { useState } from "react";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";

// Mock data untuk testing
const MOCK_ARTICLES = [
  {
    id: 1,
    title:
      "Discover the Timeless Art of Pottery: Shape Your Creativity with Clay",
    author: "David",
    category: "Pottery",
    date: "01/05/2025",
    comments: 0,
  },
  {
    id: 2,
    title: "5 Reasons to Join a Creative Workshop This Weekend",
    author: "James",
    category: "Inspiration",
    date: "01/02/2025",
    comments: 12,
  },
  {
    id: 3,
    title: "The Rise of DIY Culture in Indonesia's Youth",
    author: "Gail",
    category: "Lifestyle",
    date: "01/12/2025",
    comments: 2,
  },
  {
    id: 4,
    title: "How Street Photography Helps You See the World Differently",
    author: "Sari",
    category: "Photography",
    date: "02/21/2025",
    comments: 7,
  },
  {
    id: 5,
    title: "From Hobby to Hustle: Turning Crafts into Creative Business",
    author: "Maya",
    category: "Economy",
    date: "03/25/2025",
    comments: 10,
  },
];

const AdminCreativeCorner = () => {
  const [articles, setArticles] = useState(MOCK_ARTICLES);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();

    if (!query.trim()) {
      setArticles(MOCK_ARTICLES);
      return;
    }

    const filtered = MOCK_ARTICLES.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    );

    setArticles(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 min-h-screen bg-[#E7E7E8]">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>Admin</span>
          <span>/</span>
          <span>Creative Corner</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Creative Corner Articles
        </h1>
        <p className="text-gray-600 mt-1">
          Create and manage creative articles and inspiration
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </form>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-[#FF570C] text-white rounded-lg hover:bg-orange-600 transition-colors">
            Filter
          </button>
          <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 whitespace-nowrap">
            <span>Create Article</span>
            <span className="text-2xl">+</span>
          </button>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#FFDEB5]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-2/5">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Comments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {articles.map((article, index) => (
                <tr
                  key={article.id}
                  className={
                    index % 2 === 0 ? "bg-white" : "bg-[#FFDEB5] bg-opacity-30"
                  }
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                      {article.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {article.author}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {article.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{article.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {article.comments}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="View article"
                      >
                        <FaEye size={18} />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900 transition-colors"
                        title="Edit article"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Delete article"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200 transition-colors"
            >
              Previous
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded transition-colors ${
                  currentPage === page
                    ? "bg-[#FF570C] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((page) => page + 1)}
              disabled={currentPage === 3}
              className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreativeCorner;
