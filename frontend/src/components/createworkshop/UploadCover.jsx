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
          setCoverImage(result.imageUrl);
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
    <div id="upload" className="px-4 sm:px-6 py-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 flex items-center gap-2">
        <img
          src="/img/icon_image.svg"
          alt="Cover Icon"
          className="w-6 h-6 sm:w-8 sm:h-8"
        />
        Upload Cover
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 mb-4">
        Upload the workshop cover to capture your audience’s attention
      </p>

      <div className="border border-dashed border-gray-400 p-4 sm:p-6 rounded-md min-h-[200px] sm:min-h-[300px] flex items-center justify-center">
        {coverImage ? (
          <div className="flex flex-col w-full">
            <img
              src={coverImage}
              alt="Cover"
              className="w-full max-h-[200px] sm:max-h-[300px] object-contain mb-4"
            />
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
              <button
                onClick={handleRemove}
                className="flex items-center gap-1 text-black px-2 sm:px-3 py-1 text-sm sm:text-base rounded-[8px]"
              >
                <img
                  src="/img/icon_sampah.svg"
                  alt="Remove Icon"
                  className="w-3 h-3 sm:w-4 sm:h-4"
                />
                Remove
              </button>
              <label className="bg-[#FF5126] text-white px-3 py-1 sm:px-5 sm:py-2 text-sm sm:text-base rounded-[8px] cursor-pointer">
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
            <div className="text-gray-500 text-xs sm:text-sm mb-4">
              No cover uploaded yet.
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="text-xs sm:text-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadCover;