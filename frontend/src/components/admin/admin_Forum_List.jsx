import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const AdminForumList = () => {
  const [forums, setForums] = useState([]);
  const [filteredForums, setFilteredForums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedForumId, setSelectedForumId] = useState(null);
  const [forumDetail, setForumDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  useEffect(() => {
    const fetchForums = async () => {
      // console.log("Starting fetchForums...");
      const token = localStorage.getItem("token");
      // console.log("Token:", token ? "Found" : "Not found");

      try {
        const response = await fetch(`${API_BASE_URL}/api/forum/topics`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        // console.log("Fetch response status:", response.status);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        // console.log("Raw data from server:", data);

        if (!Array.isArray(data)) {
          throw new Error("Expected an array of forums, but got:", data);
        }

        const mappedForums = data.map((forum) => ({
          id: forum.id || 0,
          topic: forum.title || "No Title",
          replies: forum.comments_count || 0,
          author: forum.author_name || "Unknown Author",
        }));
        // console.log("Mapped forums:", mappedForums);
        setForums(mappedForums);
        setFilteredForums(mappedForums);
      } catch (err) {
        console.error("Error in fetchForums:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, []);

  useEffect(() => {
    const fetchForumDetail = async () => {
      if (!selectedForumId) return;

      setDetailLoading(true);
      setDetailError(null);

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${API_BASE_URL}/api/forum/topics/${selectedForumId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("Fetch detail response status:", response.status);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        // console.log("Forum detail data:", data);
        setForumDetail(data.topic || {});
      } catch (err) {
        console.error("Error in fetchForumDetail:", err);
        setDetailError(err.message);
      } finally {
        setDetailLoading(false);
      }
    };

    fetchForumDetail();
  }, [selectedForumId]);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredForums(forums);
    } else {
      const filtered = forums.filter(
        (forum) =>
          (forum.topic?.toLowerCase() || "").includes(query) ||
          (forum.author?.toLowerCase() || "").includes(query) ||
          (forum.replies?.toString() || "").includes(query)
      );
      // console.log("Filtered forums:", filtered);
      setFilteredForums(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, forums]);

  const handleViewForum = (id) => {
    setSelectedForumId(id);
  };

  const handleCloseModal = () => {
    setSelectedForumId(null);
    setForumDetail(null);
    setDetailError(null);
  };

  const handleDeleteForum = async (id) => {
    if (window.confirm("Are you sure you want to delete this forum?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/api/forum/topics/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
        }

        const updatedForums = forums.filter((forum) => forum.id !== id);
        setForums(updatedForums);
        setFilteredForums(updatedForums);
        // console.log(`Forum with id ${id} deleted successfully`);
        if (selectedForumId === id) handleCloseModal();
      } catch (err) {
        console.error("Error deleting forum:", err);
        setError(`Failed to delete forum: ${err.message}`);
      }
    }
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredForums.length / itemsPerPage);
  const paginatedForums = filteredForums.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading)
    return (
      <div className="p-6 min-h-screen bg-[#E7E7E8] text-center py-10">
        Loading forums...
      </div>
    );
  if (error)
    return (
      <div className="p-6 min-h-screen bg-[#E7E7E8] text-center py-10 text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-[#E7E7E8]">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>Admin</span>
          <span>/</span>
          <span>Forum List</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Forum List</h1>
        <p className="text-gray-600 mt-1">
          Kelola forum, pantau diskusi, dan moderasi topik
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari topik atau penulis..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <button className="px-4 py-2 bg-[#FF570C] text-white rounded-lg hover:bg-orange-600 transition-colors">
          Filter
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#FF570C] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/2">
                  Topic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Replies
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedForums.length > 0 ? (
                paginatedForums.map((forum, index) => (
                  <tr
                    key={forum.id}
                    className={
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-[#FFDEB5] bg-opacity-30"
                    }
                  >
                    <td className="px-6 py-4 whitespace-normal">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">
                        {forum.topic}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {forum.replies}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {forum.author}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewForum(forum.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteForum(forum.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No forums found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200 transition-colors"
            >
              Previous
            </button>
            {Array.from(
              { length: Math.min(3, totalPages) },
              (_, i) => i + 1
            ).map((page) => (
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
            {totalPages > 3 && <span className="px-2">...</span>}
            <button
              onClick={() => setCurrentPage((page) => page + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200 transition-colors"
            >
              Next
            </button>
          </div>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      {selectedForumId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={18} />
            </button>
            {detailLoading && <div className="text-center">Loading...</div>}
            {detailError && (
              <div className="text-red-500 text-center">
                Error: {detailError}
              </div>
            )}
            {forumDetail && (
              <div>
                <h2 className="text-xl font-bold mb-2">
                  {forumDetail.title || "No Title"}
                </h2>
                <p className="text-gray-700 mb-2">
                  {forumDetail.content || "No Content"}
                </p>
                <p className="text-gray-600">
                  Author: {forumDetail.author_name || "Unknown Author"}
                </p>
                <p className="text-gray-600">
                  Replies: {forumDetail.comments_count || 0}
                </p>
                <p className="text-gray-600">
                  Created:{" "}
                  {forumDetail.created_at
                    ? new Date(forumDetail.created_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </p>
                <button
                  onClick={handleCloseModal}
                  className="mt-4 px-4 py-2 bg-[#FF570C] text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminForumList;
