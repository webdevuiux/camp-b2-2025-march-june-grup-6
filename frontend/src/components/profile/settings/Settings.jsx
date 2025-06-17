import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Konfigurasi base URL dari environment variable
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Settings = () => {
  const navigate = useNavigate();

  // Ambil data pengguna dari localStorage
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user && typeof user === "object") {
          setFormData((prev) => ({
            ...prev,
            firstName: user.firstName || "Nabila",
            lastName: user.lastName || "Sari",
            username: user.username || "nabilasari4",
            email: user.email || "nabilasari4@email.com",
            phone: user.phone || "(+62)555-2304-324",
            country: user.country || "Indonesia",
            language: user.language || "Bahasa Indonesia",
            about: user.about || "",
            workshopsAttended: user.workshopsAttended || 4,
            forumReplies: user.forumReplies || 11,
          }));
          // Set profile image dari localStorage jika ada
          if (user.profileImage) {
            setProfileImage(`${API_BASE_URL}${user.profileImage}`);
          }
        } else {
          localStorage.removeItem("userData"); // Hapus jika bukan objek valid
        }
      } catch (error) {
        console.error("Error parsing userData from localStorage:", error);
        localStorage.removeItem("userData"); // Hapus data korup
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    firstName: "Nabila",
    lastName: "Sari",
    username: "nabilasari4",
    email: "nabilasari4@email.com",
    phone: "(+62)555-2304-324",
    country: "Indonesia",
    language: "Bahasa Indonesia",
    about: "",
    workshopsAttended: 4,
    forumReplies: 11,
  });

  const [profileImage, setProfileImage] = useState("/img/profile.png");
  const [notification, setNotification] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    const stringFields = [
      "firstName",
      "lastName",
      "username",
      "email",
      "phone",
      "country",
      "language",
      "about",
    ];
    const isValid = stringFields.every((field) => {
      const value = formData[field];
      return typeof value === "string" && value.trim() !== "";
    });

    if (!isValid) {
      setNotification("Please fill out all string fields before updating.");
      setTimeout(() => setNotification(""), 3000);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("language", formData.language);
    formDataToSend.append("about", formData.about);
    if (selectedFile) {
      formDataToSend.append("profileImage", selectedFile);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      // Perbarui profileImage dan formData berdasarkan respons
      if (data.user && typeof data.user === "object") {
        const fullImageUrl = data.user.profileImage
          ? `${API_BASE_URL}${data.user.profileImage}`
          : "/img/profile.png";
        setProfileImage(fullImageUrl);
        setFormData((prev) => ({
          ...prev,
          firstName: data.user.firstName || prev.firstName,
          lastName: data.user.lastName || prev.lastName,
          username: data.user.username || prev.username,
          email: data.user.email || prev.email,
          phone: data.user.phone || prev.phone,
          country: data.user.country || prev.country,
          language: data.user.language || prev.language,
          about: data.user.about || prev.about,
          workshopsAttended:
            data.user.workshopsAttended || prev.workshopsAttended,
          forumReplies: data.user.forumReplies || prev.forumReplies,
        }));
        localStorage.setItem("userData", JSON.stringify(data.user));
      } else {
        throw new Error("Invalid user data in response");
      }

      setNotification("Profile successfully updated!");
      setTimeout(() => setNotification(""), 3000);
    } catch (err) {
      setNotification(err.message || "Error updating profile");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleRemovePhoto = () => {
    setProfileImage(null);
    setSelectedFile(null);
  };

  const handleChangePhoto = () => {
    document.getElementById("profileImageInput").click();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#FCEDDA]">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <p className="mb-4 text-gray-700">
        This information will be displayed publicly so be careful what you
        share.
      </p>

      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="relative">
            {profileImage && (
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#FF5126]"
                onError={(e) => {
                  e.target.src = "/img/profile.png"; // Fallback jika gambar gagal dimuat
                }}
              />
            )}
            <div className="absolute -top-2 -right-2 bg-[#FF5126] text-white rounded-full w-6 h-6 flex items-center justify-center">
              !
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleChangePhoto}
              className="bg-[#FF5126] text-white px-4 py-2 rounded-md text-sm"
            >
              Change
            </button>
            {profileImage && (
              <button
                onClick={handleRemovePhoto}
                className="text-red-600 text-sm underline"
              >
                Remove
              </button>
            )}
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {formData.firstName} {formData.lastName}
          </h3>
          <p className="text-gray-600">@{formData.username}</p>
          {/* <button className="mt-2 bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <span>Share</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button> */}
          {/* <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Workshop Attended</p>
              <p className="text-lg font-medium">
                {formData.workshopsAttended}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Forum Replies</p>
              <p className="text-lg font-medium">{formData.forumReplies}</p>
            </div>
          </div> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block mb-1 font-medium text-black">
            First name
          </label>
          <input
            type="text"
            name="firstName"
            className="w-full border border-gray-400 bg-[#EBDECE] px-4 py-2 rounded-md"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-black">Last name</label>
          <input
            type="text"
            name="lastName"
            className="w-full border border-gray-400 bg-[#EBDECE] px-4 py-2 rounded-md"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-black">Username</label>
          <div className="flex items-center border border-gray-400 bg-[#EBDECE] rounded-md px-4 py-2">
            <span className="mr-2 text-gray-500">@</span>
            <input
              type="text"
              name="username"
              className="w-full bg-transparent outline-none"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:col-span-2 mt-4">
          <label className="block mb-1 font-medium text-black">About</label>
          <textarea
            name="about"
            className="w-full border border-gray-400 bg-[#EBDECE] px-4 py-2 rounded-md"
            rows="4"
            value={formData.about}
            onChange={handleChange}
            placeholder="Review Description"
          />
          <p className="text-xs text-gray-500 mt-1">
            Brief description for your profile. URLs are hyperlinked.
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-6">INTEREST</h3>
      <div className="flex gap-2 mt-2">
        <button className="bg-[#FFDEB5] text-black px-3 py-1 rounded-full text-sm">
          Pottery
        </button>
        <button className="bg-[#FFDEB5] text-black px-3 py-1 rounded-full text-sm">
          Lifestyle & Home
        </button>
        <button className="bg-[#FFDEB5] text-black px-3 py-1 rounded-full text-sm">
          Painting
        </button>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Personal Information</h3>
        <p className="mb-4 text-gray-700">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium text-black">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-400 bg-[#EBDECE] px-4 py-2 rounded-md"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-black">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              className="w-full border border-gray-400 bg-[#EBDECE] px-4 py-2 rounded-md"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-black">Country</label>
            <input
              type="text"
              name="country"
              className="w-full border border-gray-400 bg-[#EBDECE] px-4 py-2 rounded-md"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-black">
              Language
            </label>
            <input
              type="text"
              name="language"
              className="w-full border border-gray-400 bg-[#EBDECE] px-4 py-2 rounded-md"
              value={formData.language}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center w-full">
        {notification && (
          <div
            className={`ml-0 font-semibold ${
              notification.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {notification}
          </div>
        )}
        <div className="flex gap-6 ml-auto">
          <button
            onClick={handleCancel}
            className="bg-[#FFDEB5] text-black rounded-md px-6 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-[#FF5126] rounded-md text-white px-6 py-2 text-sm"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
