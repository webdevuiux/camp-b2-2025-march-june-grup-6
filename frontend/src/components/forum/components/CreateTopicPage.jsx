import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, LoaderCircle } from "lucide-react";
import Footer from "../../layout/Footer";

// Konfigurasi base URL dari environment variable
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const CreateTopicPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setError("Please choose a category.");
      return;
    }
    setIsLoading(true);
    setError(null);

    const newTopic = { title, content, category };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/forum/topics`,
        newTopic,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Topic published successfully!");
      navigate("/forum");
    } catch (err) {
      console.error(
        "Failed to create topic:",
        err.response ? err.response.data : err.message
      );
      const errorMessage =
        err.response?.data?.message ||
        "Failed to publish topic. Please try again later.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBE8D3] pt-10 flex flex-col max-md:pt-5">
      <main className="flex-grow container mx-auto px-4 py-8 max-md:px-2 max-md:py-4">
        <div className="relative w-full h-62 md:h-68 overflow-hidden mb-8 shadow-lg max-md:h-48 max-md:mb-4">
          <img
            src="../img/banner_newtopik.svg"
            alt="Create topic banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-4 max-md:p-2">
            <h1 className="text-3xl md:text-4xl font-bold max-md:text-2xl">
              CREATE NEW TOPIC
            </h1>
            <p className="mt-2 text-sm max-w-xl max-md:text-xs max-md:mt-1">
              Start a new discussion — ask a question, share tips, or spark a
              conversation with fellow makers.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white/60 p-6 md:p-8 rounded-lg shadow-md border border-gray-200 max-md:max-w-full max-md:p-4"
        >
          <div className="mb-6 max-md:mb-4">
            <label
              htmlFor="title"
              className="block text-lg font-bold text-gray-800 mb-2 max-md:text-base max-md:mb-1"
            >
              Subject
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 max-md:text-sm"
              placeholder="Enter a descriptive title for your topic"
              required
            />
          </div>

          <div className="mb-6 max-md:mb-4">
            <label className="block text-lg font-bold text-gray-800 mb-2 max-md:text-base max-md:mb-1">
              Body
            </label>
            <div className="bg-white border border-gray-300 rounded-md">
              <div className="p-2 bg-gray-100 border-b border-gray-300 max-md:p-1">
                <span className="font-bold">B</span>{" "}
                <span className="italic">I</span>{" "}
                <span className="underline">U</span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-48 p-4 border-none rounded-b-md focus:outline-none resize-y max-md:h-32 max-md:p-2 max-md:text-sm"
                placeholder="Share your thoughts, questions, or ideas here..."
                required
              ></textarea>
            </div>
            <p className="text-xs text-gray-500 mt-1 max-md:text-xxs">
              You can use markdown for formatting.
            </p>
          </div>

          <div className="mb-8 max-md:mb-4">
            <label
              htmlFor="category"
              className="block text-lg font-bold text-gray-800 mb-2 max-md:text-base max-md:mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white max-md:text-sm"
              required
            >
              <option value="" disabled>
                Choose your topic's category
              </option>
              <option value="pottery">Pottery</option>
              <option value="textile">Textile & Weaving</option>
              <option value="painting">Painting</option>
              <option value="general">General Discussion</option>
            </select>
          </div>

          {error && (
            <div className="my-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded-md text-center max-md:my-2 max-md:p-2 max-md:text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-4 max-md:flex-col max-md:gap-2">
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white text-sm font-semibold shadow max-md:px-2 max-md:py-1 max-md:text-xs">
              +43 Points
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-black text-white font-semibold rounded-none hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors max-md:px-4 max-md:py-1 max-md:text-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <span>Publish Topic</span>
                  <Plus size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CreateTopicPage;