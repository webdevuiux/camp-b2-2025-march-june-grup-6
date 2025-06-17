import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";
import axios from "axios";
import { FaCog, FaSignOutAlt } from "react-icons/fa";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Sidebar = () => {
  const navigate = useNavigate();

  const [sections] = useState([
    {
      title: "WORKSHOPS",
      items: [
        { name: "Workshop List", path: "workshop-list" },
        { name: "Workshop Submissions", path: "workshop-submissions" },
      ],
    },
    {
      title: "PAYMENTS",
      items: [
        { name: "Order Request", path: "order-request" },
        { name: "Refund Request", path: "refund-request" },
      ],
    },
    {
      title: "OTHER FEATURES",
      items: [{ name: "Forum List", path: "forum-list" }],
    },
  ]);

  // State untuk menyimpan data admin
  const [adminData, setAdminData] = useState({
    username: "Admin XYZ",
    firstName: "",
    lastName: "",
    profileImage:
      "https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/97a09fd7d997b9e2073117bbe38f75ff22be3412", // Default image
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk dropdown

  // Efek untuk memuat data admin dari backend
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/admin/settings/2`
        );
        const data = response.data;
        setAdminData({
          username: data.username || "Admin XYZ",
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          profileImage:
            data.profile_image ||
            "https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/97a09fd7d997b9e2073117bbe38f75ff22be3412",
        });
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError("Gagal memuat data admin. Pastikan backend berjalan.");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const displayName =
    `${adminData.firstName} ${adminData.lastName}`.trim() || adminData.username;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mt-1 mb-1 bg-white rounded-lg shadow-lg h-screen sticky top-4 flex flex-col max-w-[280px]">
      {/* Header gambar logo */}
      <div className="bg-[#2B2B2B] rounded-t-lg py-6 px-4 flex justify-center items-center">
        <img
          src="/logo_hitamputih.svg"
          alt="Logo Tiket Karya"
          className="h-14 object-contain"
        />
      </div>

      {/* Admin Profile with Dropdown */}
      <div className="p-4 relative">
        <div
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 rounded-md p-2 transition duration-200"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="w-14 h-14 bg-[#FF5126] rounded-full flex items-center justify-center border-2 border-[#FFDEB5]">
            <img
              src={adminData.profileImage}
              alt="Admin"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
          <span className="text-lg font-medium truncate">{displayName}</span>
        </div>
        {isDropdownOpen && (
          <div className="absolute top-full left-3 w-[250px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <button
              onClick={() => navigate("/admin/settings")}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-200"
            >
              <FaCog className="mr-2" /> Account Settings
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("userData");
                localStorage.removeItem("token");
                navigate("/login-admin");
              }}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-200"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <SidebarItem to="/admin">Analytics</SidebarItem>

        {sections.map((section, index) => (
          <SidebarSection key={index} title={section.title} defaultOpen={true}>
            {section.items.map((item, itemIndex) => (
              <SidebarItem key={itemIndex} to={`/admin/${item.path}`}>
                {item.name}
              </SidebarItem>
            ))}
          </SidebarSection>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
