import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const AdminRefundRequest = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  const normalizeCategory = (category) => {
    if (!category) return "";
    return category.toLowerCase().replace(/ & /g, "").replace(/\s+/g, "");
  };

  useEffect(() => {
    const fetchRefundRequests = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/refunds/refund-requests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch refund requests");
        }
        const data = await response.json();
        // console.log("Fetched refund requests:", data);
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        console.error("Error fetching refund requests:", err);
      }
    };
    fetchRefundRequests();
  }, [token, API_BASE_URL]);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => {
        const normalizedCategory = normalizeCategory(order.category);
        const date = order.date
          ? new Date(order.date).toLocaleDateString("en-GB")
          : "";
        return (
          (order.workshop_name?.toLowerCase() || "").includes(query) ||
          normalizedCategory.includes(query) ||
          (order.requested_by?.toLowerCase() || "").includes(query) ||
          (order.price?.toString().toLowerCase() || "").includes(query) ||
          date.includes(query) ||
          (order.reason?.toLowerCase() || "").includes(query)
        );
      });
      // console.log("Filtered refund requests:", filtered);
      setFilteredOrders(filtered);
    }
  }, [searchQuery, orders]);

  const handleProcessRefund = async (id, status, adminNotes = "") => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/refunds/refund-requests/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status, admin_notes: adminNotes }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to process refund request");
      }
      const updatedOrders = orders.filter((order) => order.id !== id);
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
    } catch (err) {
      console.error("Error processing refund request:", err);
    }
  };

  const handleView = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="p-6 bg-[#E7E7E8] min-h-screen">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>Admin</span>
          <span>/</span>
          <span>Refund Request</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Refund Request</h1>
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

      <table className="w-full bg-white shadow overflow-hidden">
        <thead className="bg-[#FF570C] text-white">
          <tr>
            <th className="px-4 py-2 text-left">Workshop</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Request By</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.workshop_name}</td>
                <td className="px-4 py-2">{order.category}</td>
                <td className="px-4 py-2">{order.price}</td>
                <td className="px-4 py-2">{order.requested_by}</td>
                <td className="px-4 py-2">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleView(order)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleProcessRefund(order.id, "approved")}
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleProcessRefund(order.id, "rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Refund Request Details</h2>
            <div className="space-y-4">
              <p>
                <strong>Workshop:</strong> {selectedOrder.workshop_name}
              </p>
              <p>
                <strong>Category:</strong> {selectedOrder.category}
              </p>
              <p>
                <strong>Price:</strong> {selectedOrder.price}
              </p>
              <p>
                <strong>Requested By:</strong> {selectedOrder.requested_by}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.date).toLocaleDateString()}
              </p>
              {selectedOrder.reason && (
                <p>
                  <strong>Reason:</strong> {selectedOrder.reason}
                </p>
              )}
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-6 bg-[#FF570C] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRefundRequest;
