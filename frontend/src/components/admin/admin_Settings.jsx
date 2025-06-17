import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const AdminSettings = () => {
  const [profile, setProfile] = useState({
    id: 1,
    firstName: "Admin",
    lastName: "",
    username: "admin",
    email: "admin@gmail.com",
    phoneNumber: "",
    profileImage: null,
  });

  const [editingField, setEditingField] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk modal Change Password
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State untuk modal Forgot Password
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchAdminSettings = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/admin/settings/2`
        );
        const data = response.data;
        setProfile({
          id: data.id,
          firstName: data.first_name || "Admin",
          lastName: data.last_name || "",
          username: data.username || "admin",
          email: data.email || "admin@gmail.com",
          phoneNumber: data.phone_number || "",
          profileImage: data.profile_image || null,
        });
      } catch (err) {
        console.error("Error fetching admin settings:", err);
        setError(
          "Gagal memuat data admin. Pastikan backend berjalan di " +
            API_BASE_URL
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAdminSettings();
  }, []);

  const handleEditClick = (field) => {
    setEditingField(field);
    setInputValue(profile[field]);
  };

  const handleSave = async (field) => {
    const updatedProfile = { ...profile, [field]: inputValue };
    setProfile(updatedProfile);

    try {
      await axios.put(`${API_BASE_URL}/api/admin/settings/2`, {
        username: updatedProfile.username,
        first_name: updatedProfile.firstName,
        last_name: updatedProfile.lastName,
        email: updatedProfile.email,
        phone_number: updatedProfile.phoneNumber,
      });
      alert("Profil berhasil diperbarui!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error memperbarui profil.");
    }
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setProfile((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setProfile((prev) => ({ ...prev, profileImage: null }));
  };

  const handleChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true);
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Password baru dan konfirmasi password tidak cocok!");
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/api/admin/change-password/2`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      alert("Password berhasil diperbarui!");
      setShowChangePasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Error changing password:", err);
      alert("Error memperbarui password. Pastikan password lama benar.");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
      alert("Password baru dan konfirmasi password tidak cocok!");
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/api/admin/reset-password/2`, {
        newPassword: forgotPasswordData.newPassword,
      });
      alert("Password berhasil direset!");
      setShowForgotPasswordModal(false);
      setForgotPasswordData({ newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error("Error resetting password:", err);
      alert("Error mereset password.");
    }
  };

  const handleGlobalUpdate = async () => {
    const formData = new FormData();
    formData.append("username", profile.username);
    formData.append("first_name", profile.firstName);
    formData.append("last_name", profile.lastName);
    formData.append("email", profile.email);
    formData.append("phone_number", profile.phoneNumber);
    if (selectedImage) {
      formData.append("profile_image", selectedImage);
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/admin/settings/2`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profil berhasil diperbarui!");
      if (response.data.profile_image) {
        setProfile((prev) => ({
          ...prev,
          profileImage: response.data.profile_image,
        }));
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error memperbarui profil.");
    }
  };

  const handleGlobalCancel = () => {
    alert("Tombol Cancel diklik! Perubahan tidak akan disimpan.");
    setSelectedImage(null);
    setProfile((prev) => ({
      ...prev,
      profileImage: prev.profileImage || null,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen p-6 bg-transparent">
      <div className="text-sm text-gray-600 mb-2">
        <span className="text-[#FF5126] font-semibold">Admin</span> / Account
        Settings
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-1">Account Settings</h1>
        <p className="text-gray-500 mb-6">
          Check the sales, user counts, and Topic Posted
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm font-semibold mb-2">Profile Picture</p>
          <div className="relative group w-28 h-28 rounded-md bg-[#FF5126] overflow-hidden flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="profile_image"
              className="hidden"
              id="profileImageInput"
            />
            <label
              htmlFor="profileImageInput"
              className="cursor-pointer w-full h-full flex items-center justify-center"
            >
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-white text-5xl">👤</div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center">
                <FaEdit className="text-white text-xl" />
              </div>
            </label>
          </div>

          {profile.profileImage && (
            <button
              onClick={handleRemoveImage}
              className="flex items-center gap-1 text-sm text-gray-600 mt-2 hover:text-[#FF5126] transition-colors duration-200"
            >
              <FaTrashAlt />
              Remove
            </button>
          )}
        </div>

        {/* Info Cards + Password Section */}
        <div className="flex flex-col gap-4 w-full">
          {[
            {
              label: "Your name",
              field: "firstName",
              display:
                `${profile.firstName} ${profile.lastName}`.trim() || "Admin TK",
            },
            { label: "Username", field: "username" },
            { label: "E-mail", field: "email" },
            { label: "Phone Number", field: "phoneNumber" },
          ].map(({ label, field, display }) => (
            <div
              key={field}
              className="bg-white rounded-md p-4 flex justify-between items-center shadow"
            >
              <div>
                <p className="text-sm text-gray-600">{label}</p>
                {editingField === field ? (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border p-1 mt-1 rounded w-64"
                  />
                ) : (
                  <p className="text-base font-medium mt-1">
                    {display || profile[field]}
                  </p>
                )}
              </div>
              {editingField === field ? (
                <div className="flex gap-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => handleSave(field)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
                  onClick={() => handleEditClick(field)}
                >
                  Edit
                </button>
              )}
            </div>
          ))}

          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <div className="bg-white rounded-md p-4 shadow w-72">
              <h2 className="text-lg font-semibold mb-4">Password Settings</h2>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleChangePassword}
                  className="bg-[#FF5126] hover:bg-orange-600 text-white py-2 rounded-md"
                >
                  Change Password
                </button>
                <button
                  onClick={handleForgotPassword}
                  className="bg-[#FF5126] hover:bg-orange-600 text-white py-2 rounded-md"
                >
                  Forgot Password
                </button>
              </div>
            </div>

            <div className="flex justify-end items-start w-full">
              <div className="flex gap-4">
                <button
                  onClick={handleGlobalCancel}
                  className="bg-[#FF5126] hover:bg-orange-600 text-white px-5 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGlobalUpdate}
                  className="bg-[#FF5126] hover:bg-orange-600 text-white px-5 py-2 rounded-md"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Change Password */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handleChangePasswordSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Password Lama
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Password Baru
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowChangePasswordModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF5126] text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Forgot Password */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Password Baru
                </label>
                <input
                  type="password"
                  value={forgotPasswordData.newPassword}
                  onChange={(e) =>
                    setForgotPasswordData({
                      ...forgotPasswordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  value={forgotPasswordData.confirmPassword}
                  onChange={(e) =>
                    setForgotPasswordData({
                      ...forgotPasswordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF5126] text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
