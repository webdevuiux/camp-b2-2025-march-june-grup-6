import React, { useState, useEffect } from "react";

const GeneralInformation = ({ data, onChange }) => {
  const [formData, setFormData] = useState({
    title: data.title || "",
    description: data.description || "",
    category: data.category || "", // Biarkan kosong sampai kategori diambil
  });
  const [albumImages, setAlbumImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  // Ambil kategori dari backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await fetch(`${API_BASE_URL}/api/workshops/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        console.log("Fetched categories:", data); // Debug
        setCategories(data);

        // Set default category jika formData.category kosong atau tidak valid
        if (
          !formData.category ||
          !data.find((cat) => cat.name === formData.category)
        ) {
          setFormData((prev) => ({
            ...prev,
            category: data.length > 0 ? data[0].name : "",
          }));
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setErrorCategories("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Kirim formData ke parent saat berubah
  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  const handleAlbumUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setAlbumImages((prev) => [...prev, ...imageUrls]);
  };

  const handleDeleteImage = (indexToDelete) => {
    setAlbumImages((prev) => prev.filter((_, idx) => idx !== indexToDelete));
  };

  return (
    <div className="p-6 text-black space-y-8">
      {/* General Information */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <img src="/img/icon_alert.svg" alt="Info Icon" className="w-8 h-8" />
          General Information
        </h2>

        {/* Name Field */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Terrarium Jar : Little Gardens Indoors"
            className="w-full bg-[#E8DCCF] border border-black rounded px-4 py-2 text-base"
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-lg font-semibold mb-1">
            Description
          </label>
          <p className="text-sm text-gray-700 mb-2">
            Provide essential workshop details
          </p>
          <textarea
            rows={6}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter description here..."
            className="w-full bg-[#E8DCCF] border border-black rounded px-4 py-2 text-base"
            required
          />
        </div>
      </div>

      {/* Category and Album */}
      <div>
        {/* Category */}
        <div className="mb-8">
          <label className="block text-2xl font-bold mb-1">Category</label>
          <p className="text-sm text-gray-700 mb-2">
            Choose the category for your workshop
          </p>
          <div className="relative">
            {loadingCategories ? (
              <p className="text-sm text-gray-600">Loading categories...</p>
            ) : errorCategories ? (
              <p className="text-sm text-red-500">{errorCategories}</p>
            ) : (
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="appearance-none w-full border border-black rounded px-12 py-3 bg-[#E8DCCF] text-base text-gray-800 cursor-pointer"
                required
              >
                {categories.length === 0 ? (
                  <option value="">No categories available</option>
                ) : (
                  categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>
            )}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <img
                src="/img/icon_home.svg"
                alt="Home Icon"
                className="w-5 h-5"
              />
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <img
                src="/img/icon_arrow_down.svg"
                alt="Arrow Down"
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* Album */}
        <div>
          <label className="block text-2xl font-bold mb-1">Album</label>
          <p className="text-sm text-gray-700 mb-2">
            Upload images for your workshop
          </p>
          <div className="flex flex-wrap gap-4">
            <label className="w-24 h-24 border border-black flex items-center justify-center text-4xl text-black rounded cursor-pointer hover:bg-[#FF5126] hover:text-white transition">
              +
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAlbumUpload}
                className="hidden"
              />
            </label>
            {albumImages.map((url, index) => (
              <div
                key={index}
                className="w-24 h-24 border border-black rounded overflow-hidden relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={url}
                  alt={`Album ${index}`}
                  className="w-full h-full object-cover"
                />
                {hoveredIndex === index && (
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full p-1 hover:bg-red-600 transition"
                    aria-label="Delete image"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
