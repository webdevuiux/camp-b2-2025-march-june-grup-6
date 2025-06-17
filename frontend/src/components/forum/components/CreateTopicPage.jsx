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
      // console.log("Topic created successfully:", response.data);
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
    <div className="min-h-screen bg-[#FBE8D3] pt-10 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="relative w-full h-62 md:h-68 overflow-hidden mb-8 shadow-lg">
          <img
            src="../img/banner_newtopik.svg"
            alt="Create topic banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-4">
            <h1 className="text-3xl md:text-4xl font-bold">CREATE NEW TOPIC</h1>
            <p className="mt-2 text-sm max-w-xl">
              Start a new discussion — ask a question, share tips, or spark a
              conversation with fellow makers.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white/60 p-6 md:p-8 rounded-lg shadow-md border border-gray-200"
        >
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-lg font-bold text-gray-800 mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter a descriptive title for your topic"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-bold text-gray-800 mb-2">
              Body
            </label>
            <div className="bg-white border border-gray-300 rounded-md">
              <div className="p-2 bg-gray-100 border-b border-gray-300">
                <span className="font-bold">B</span>{" "}
                <span className="italic">I</span>{" "}
                <span className="underline">U</span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-48 p-4 border-none rounded-b-md focus:outline-none resize-y"
                placeholder="Share your thoughts, questions, or ideas here..."
                required
              ></textarea>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              You can use markdown for formatting.
            </p>
          </div>

          <div className="mb-8">
            <label
              htmlFor="category"
              className="block text-lg font-bold text-gray-800 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white"
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
            <div className="my-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded-md text-center">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-4">
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white text-sm font-semibold shadow">
              +43 Points
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-black text-white font-semibold rounded-none hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
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
