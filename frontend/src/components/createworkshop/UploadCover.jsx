import React, { useState, useEffect, useRef } from "react";

const UploadCover = ({ data, onChange }) => {
  const [coverImage, setCoverImage] = useState(data.image || null);
  const fileInputRef = useRef(null);
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    onChange({ image: coverImage });
  }, [coverImage, onChange]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      // Unggah gambar ke server
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(`${API_BASE_URL}/api/workshops/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        });
        const result = await response.json();
        if (result.imageUrl) {
          setCoverImage(result.imageUrl); // Gunakan URL dari server
        } else {
          alert("Failed to upload image");
        }
      } catch (err) {
        alert("Error uploading image");
      }
    } else {
      alert("Please select an image file.");
    }
  };

  const handleRemove = () => {
    setCoverImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div id="upload">
      <h2 className="p-6 text-black space-y-8 text-2xl font-bold mb-4 flex items-center gap-2">
        <img src="/img/icon_image.svg" alt="Cover Icon" className="w-8 h-8" />
        Upload Cover
      </h2>
      <p className="ml-6 text-sm text-gray-600 mb-4">
        Upload the workshop cover to capture your audience’s attention
      </p>

      <div className="ml-6 border border-dashed border-gray-400 p-6 rounded-md min-h-[300px] flex items-center justify-center">
        {coverImage ? (
          <div className="flex flex-col w-full">
            <img
              src={coverImage}
              alt="Cover"
              className="w-full max-h-[300px] object-contain mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleRemove}
                className="flex items-center gap-1 text-black px-3 py-1 rounded-[8px]"
              >
                <img
                  src="/img/icon_sampah.svg"
                  alt="Remove Icon"
                  className="w-4 h-4"
                />
                Remove
              </button>
              <label className="bg-[#FF5126] text-white px-5 py-1 rounded-[8px] cursor-pointer">
                Change
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-gray-500 mb-4">No cover uploaded yet.</div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadCover;
