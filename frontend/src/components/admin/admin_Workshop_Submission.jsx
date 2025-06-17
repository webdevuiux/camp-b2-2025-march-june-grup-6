import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const AdminWorkshopSubmission = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  const normalizeCategory = (category) => {
    if (!category) return "";
    return category.toLowerCase().replace(/ & /g, "").replace(/\s+/g, "");
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/api/workshops/workshops/submissions`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch workshop submissions");
        }
        const data = await response.json();
        // console.log("Fetched submissions:", data);
        setSubmissions(data);
        setFilteredSubmissions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredSubmissions(submissions);
    } else {
      const filtered = submissions.filter((submission) => {
        const normalizedCategory = normalizeCategory(submission.category);
        const date = submission.date
          ? new Date(submission.date).toLocaleDateString("en-GB")
          : "";
        return (
          (submission.topic?.toLowerCase() || "").includes(query) ||
          normalizedCategory.includes(query) ||
          (submission.host?.toLowerCase() || "").includes(query) ||
          (submission.price?.toString().toLowerCase() || "").includes(query) ||
          date.includes(query)
        );
      });
      // console.log("Filtered submissions:", filtered);
      setFilteredSubmissions(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, submissions]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleView = async (workshopId) => {
    if (!workshopId) {
      setError("Workshop ID is undefined");
      return;
    }
    try {
      setActionLoading(workshopId);
      const response = await fetch(
        `${API_BASE_URL}/api/workshops/workshops/${workshopId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch workshop details");
      }
      const data = await response.json();
      setSelectedWorkshop(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleApprove = async (submissionId) => {
    try {
      setActionLoading(submissionId);
      const response = await fetch(
        `${API_BASE_URL}/api/workshops/workshops/submissions/${submissionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            status: "approved",
            admin_notes: "Approved by admin",
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to approve submission");
      }
      const data = await response.json();
      const updatedSubmissions = submissions.filter(
        (s) => s.submission_id !== submissionId
      );
      setSubmissions(updatedSubmissions);
      setFilteredSubmissions(updatedSubmissions);
      alert(data.message);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (submissionId) => {
    try {
      setActionLoading(submissionId);
      const response = await fetch(
        `${API_BASE_URL}/api/workshops/workshops/submissions/${submissionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            status: "rejected",
            admin_notes: "Rejected by admin",
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reject submission");
      }
      const data = await response.json();
      const updatedSubmissions = submissions.filter(
        (s) => s.submission_id !== submissionId
      );
      setSubmissions(updatedSubmissions);
      setFilteredSubmissions(updatedSubmissions);
      alert(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCloseModal = () => {
    setSelectedWorkshop(null);
  };

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-[#E7E7E8] min-h-screen">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>Admin</span>
          <span>/</span>
          <span>Workshop Submission</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Workshop Submission
        </h1>
        <p className="text-gray-600 mt-1">
          Check the sales, user counts, and Topic Posted
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Text"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <button className="px-4 py-2 bg-[#FF570C] text-white rounded-lg hover:bg-orange-600 transition-colors">
          Filters
        </button>
      </div>

      <div className="bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#FF570C] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Workshop Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Host
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedSubmissions.length > 0 ? (
                paginatedSubmissions.map((submission) => (
                  <tr
                    key={submission.submission_id}
                    className={
                      paginatedSubmissions.indexOf(submission) % 2 === 0
                        ? "bg-white"
                        : "bg-[#FFDEB5] bg-opacity-30"
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {submission.topic}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {submission.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {submission.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {submission.host}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(submission.date).toLocaleDateString("en-GB")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                          onClick={() => handleView(submission.workshop_id)}
                          disabled={actionLoading === submission.submission_id}
                        >
                          View
                        </button>
                        <button
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                          onClick={() =>
                            handleApprove(submission.submission_id)
                          }
                          disabled={actionLoading === submission.submission_id}
                        >
                          Approve
                        </button>
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                          onClick={() => handleReject(submission.submission_id)}
                          disabled={actionLoading === submission.submission_id}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No submissions found.
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
              className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
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
                className={`px-3 py-1 rounded ${
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
              className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      {selectedWorkshop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-2xl font-bold mb-4">Workshop Details</h2>
            <div className="space-y-4">
              <p>
                <strong>Workshop Name:</strong>{" "}
                {selectedWorkshop.topic || selectedWorkshop.title || "N/A"}
              </p>
              <p>
                <strong>Category:</strong> {selectedWorkshop.category}
              </p>
              <p>
                <strong>Price:</strong> {selectedWorkshop.price}
              </p>
              <p>
                <strong>Host:</strong> {selectedWorkshop.host}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedWorkshop.date).toLocaleDateString("en-GB")}
              </p>
              <p>
                <strong>Location:</strong> {selectedWorkshop.location}
              </p>
              {selectedWorkshop.description && (
                <p>
                  <strong>Description:</strong> {selectedWorkshop.description}
                </p>
              )}
              {selectedWorkshop.image_url && (
                <img
                  src={selectedWorkshop.image_url}
                  alt={
                    selectedWorkshop.topic ||
                    selectedWorkshop.title ||
                    "Workshop Image"
                  }
                  className="mt-2 w-full h-32 object-cover rounded"
                />
              )}
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-6 px-4 py-2 bg-[#FF570C] text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWorkshopSubmission;
