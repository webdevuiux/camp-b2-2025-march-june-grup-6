import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../layout/Footer";
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Discussion = () => {
  const { topicId } = useParams(); // Ambil topicId dari URL
  const [topic, setTopic] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopicAndComments = async () => {
      // console.log("Starting fetch for topicId:", topicId);
      if (!topicId) {
        // console.log("topicId is undefined, please check the URL");
        setError("Topik tidak ditemukan, periksa URL.");
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // console.log("No token found in localStorage");
          setError("Anda perlu login terlebih dahulu.");
          setLoading(false);
          return;
        }
        // console.log(
        //   "Fetching from:",
        //   `${API_BASE_URL}/api/forum/topics/${topicId}`
        // );
        const response = await axios.get(
          `${API_BASE_URL}/api/forum/topics/${topicId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("API Response:", response.data);
        const data = response.data;
        const topicWithUser = data.topic.avatar
          ? { avatar: `${API_BASE_URL}${data.topic.avatar}` }
          : { avatar: "https://placehold.co/40x40/EFE2D3/000000?text=U" };
        setTopic({ ...data.topic, ...topicWithUser });
        const commentsWithUsers = data.comments.map((comment) => ({
          ...comment,
          avatar: comment.avatar
            ? `${API_BASE_URL}${comment.avatar}`
            : "https://placehold.co/40x40/EFE2D3/000000?text=U",
        }));
        setComments(commentsWithUsers);
      } catch (err) {
        console.error("Error fetching topic and comments:", err);
        setError("Gagal memuat topik atau komentar.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopicAndComments();
  }, [topicId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda perlu login terlebih dahulu.");
      return;
    }

    if (!comment.trim()) {
      alert("Komentar tidak boleh kosong.");
      return;
    }

    const formData = new FormData();
    formData.append("content", comment.trim());
    if (file) formData.append("file", file);

    // console.log("Submitting comment with data:", {
    //   content: comment,
    //   file: file ? file.name : null,
    //   topicId: topicId,
    // });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/forum/topics/${topicId}/comments`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Comment posted successfully:", response.data);
      const newComment = {
        ...response.data,
        avatar: response.data.avatar
          ? `${API_BASE_URL}${response.data.avatar}`
          : "https://placehold.co/40x40/EFE2D3/000000?text=U",
      };
      setComments([...comments, newComment]);
      setComment("");
      setFile(null);
      alert("Comment posted!");
    } catch (err) {
      console.error("Error posting comment:", {
        message: err.message,
        response: err.response ? err.response.data : "No response data",
        status: err.response ? err.response.status : null,
      });
      alert(
        `Gagal memposting komentar. Status: ${
          err.response ? err.response.status : "Unknown"
        }. Periksa konsol untuk detail.`
      );
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#FBE8D3] pt-10 flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-[#FBE8D3] pt-10 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  if (!topic)
    return (
      <div className="min-h-screen bg-[#FBE8D3] pt-10 flex items-center justify-center">
        Topik tidak ditemukan.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FBE8D3] pt-10 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Banner */}
        <div className="relative w-full h-50 md:h-58 overflow-hidden mb-8 shadow-lg">
          <img
            src={`/img/banner_newtopik.svg`}
            alt="Create topic banner"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Banner image load error:", e);
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x200/EFE2D3/000000?text=Banner";
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-5 flex flex-col items-center justify-center text-white text-center p-4">
            <h1 className="text-3xl md:text-4xl font-bold">{topic.title}</h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-[#FFDEB5] px-6 py-4 mb-6 rounded-sm">
          <p className="text-sm text-gray-700">
            <span className="text-gray-600">Forum / </span>
            <span className="font-semibold text-black">{topic.title}</span>
          </p>
        </div>

        {/* Komentar Diskusi */}
        <div className="space-y-6 mb-10">
          {/* Komentar dari OP */}
          <div className="bg-[#FBE8D3] p-4 shadow-sm border border-[#EFD5B7]">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <img
                  src={topic.avatar}
                  alt={topic.author_name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    console.error("OP image load error:", e);
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/40x40/EFE2D3/000000?text=U";
                  }}
                />
                <div>
                  <p className="font-semibold text-sm text-black">
                    {topic.author_name}{" "}
                    <span className="text-[#FF6B00] font-bold text-xs ml-1">
                      • OP
                    </span>
                  </p>
                  <p className="text-sm text-gray-800 mt-1">{topic.content}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(topic.created_at).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          {/* Komentar Balasan dari Pengguna Lain */}
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-[#FFDEB5] p-4 shadow-sm border border-[#E0B075]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <img
                    src={comment.avatar}
                    alt={comment.comment_author_name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      console.error("Comment image load error:", e);
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/40x40/EFE2D3/000000?text=U";
                    }}
                  />
                  <div>
                    <p className="font-semibold text-sm text-black">
                      {comment.comment_author_name || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-800 mt-1">
                      {comment.content}
                    </p>
                    {comment.file && (
                      <p className="text-xs text-gray-600 mt-1">
                        File: {comment.file}
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(comment.created_at).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Reply Form */}
        <div className="bg-[#FBE8D3] border-t border-black pt-6">
          <div className="ml-[50px] mx-auto">
            <h2 className="flex items-center font-semibold text-[30px] mb-4 text-gray-800">
              <img
                src="/img/icon_inbox.svg"
                alt="Chat icon"
                className="w-8 h-8 mr-2"
                onError={(e) => {
                  console.error("Icon inbox load error:", e);
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/40x40/EFE2D3/000000?text=I";
                }}
              />
              Reply to this topic
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Write Here"
                className="w-[1150px] h-36 p-3 border border-gray-400 bg-[#E9DBC8] rounded-[5px] text-sm resize-none"
              ></textarea>

              <div className="w-[600px] h-[80px] border border-gray-400 bg-[#E9DBC8] rounded-[5px] px-4 py-2 text-sm">
                <label className="cursor-pointer flex items-start gap-3 text-gray-700">
                  <img
                    src="/img/icon_pagevid.svg"
                    alt="Upload icon"
                    className="w-12 h-12 mt-1"
                    onError={(e) => {
                      console.error("Icon pagevid load error:", e);
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/40x40/EFE2D3/000000?text=P";
                    }}
                  />
                  <div className="mt-2 flex flex-col">
                    <span className="font-semibold">Add Photos or Videos</span>
                    <span className="text-xs text-gray-600">
                      Click here or drag to upload
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {file && (
                  <p className="text-xs mt-2 text-gray-600">
                    Uploaded: {file.name}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-black text-white w-[1150px] h-[50px] py-2 rounded-lg font-medium hover:bg-gray-800 transition"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Discussion;
