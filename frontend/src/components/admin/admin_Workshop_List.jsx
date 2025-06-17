import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const AdminWorkshopList = () => {
  const [workshops, setWorkshops] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  const normalizeCategory = (category) => {
    if (!category) return "";
    return category.toLowerCase().replace(/ & /g, "").replace(/\s+/g, "");
  };

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/api/workshops/workshops`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch workshops");
        }
        const data = await response.json();
        const workshopData = data.length
          ? data
          : [
              {
                id: 1,
                topic: "Test",
                category: "Test",
                price: "Rp.100.000",
                quantity: 10,
              },
            ];
        // console.log("Fetched workshops:", workshopData);
        setWorkshops(workshopData);
        setFilteredWorkshops(workshopData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredWorkshops(workshops);
    } else {
      const filtered = workshops.filter((workshop) => {
        const normalizedCategory = normalizeCategory(workshop.category);
        const status = workshop.quantity > 0 ? "available" : "sold out";
        return (
          (workshop.topic?.toLowerCase() || "").includes(query) ||
          normalizedCategory.includes(query) ||
          (workshop.price?.toString().toLowerCase() || "").includes(query) ||
          (workshop.quantity?.toString() || "").includes(query) ||
          status.includes(query)
        );
      });
      // console.log("Filtered workshops:", filtered);
      setFilteredWorkshops(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, workshops]);

  const handleEditStatus = async (workshopId) => {
    const workshop = workshops.find((w) => w.id === workshopId);
    const newMaxParticipants = workshop.quantity > 0 ? 0 : 10;
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/workshops/workshops/${workshopId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ max_participants: newMaxParticipants }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update workshop status");
      }
      const updatedWorkshop = await response.json();
      const originalWorkshop = workshops.find((w) => w.id === workshopId);
      const updatedWorkshops = workshops.map((w) =>
        w.id === workshopId
          ? { ...w, ...updatedWorkshop, category: originalWorkshop.category }
          : w
      );
      setWorkshops(updatedWorkshops);
      setFilteredWorkshops(updatedWorkshops);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleView = async (workshopId) => {
    try {
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
    }
  };

  const handleDelete = async (workshopId) => {
    if (window.confirm("Are you sure you want to delete this workshop?")) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/workshops/workshops/${workshopId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete workshop");
        }
        const updatedWorkshops = workshops.filter((w) => w.id !== workshopId);
        setWorkshops(updatedWorkshops);
        setFilteredWorkshops(updatedWorkshops);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedWorkshop(null);
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredWorkshops.length / itemsPerPage);
  const paginatedWorkshops = filteredWorkshops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-[#E7E7E8] min-h-screen">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>Admin</span>
          <span>/</span>
          <span>Workshop List</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Workshop List</h1>
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
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedWorkshops.length > 0 ? (
                paginatedWorkshops.map((workshop, index) => (
                  <tr
                    key={workshop.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {workshop.topic}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {workshop.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {workshop.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {workshop.quantity !== undefined
                          ? workshop.quantity
                          : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          workshop.quantity > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {workshop.quantity > 0 ? "Available" : "Sold Out"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                          onClick={() => handleView(workshop.id)}
                          disabled={false}
                        >
                          View
                        </button>
                        <button
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                          onClick={() => handleEditStatus(workshop.id)}
                          disabled={false}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                          onClick={() => handleDelete(workshop.id)}
                          disabled={false}
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
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No workshops found.
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
                <strong>Quantity:</strong>{" "}
                {selectedWorkshop.quantity !== undefined
                  ? selectedWorkshop.quantity
                  : "N/A"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedWorkshop.quantity > 0 ? "Available" : "Sold Out"}
              </p>
              {selectedWorkshop.location && (
                <p>
                  <strong>Location:</strong> {selectedWorkshop.location}
                </p>
              )}
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

export default AdminWorkshopList;
