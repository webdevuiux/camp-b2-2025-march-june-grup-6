import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TopicItem from "./TopicItem";

// Konfigurasi base URL dari environment variable
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const TopicList = ({ searchQuery }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForumTopics = async () => {
      // console.log("Starting fetchForumTopics...");
      const token = localStorage.getItem("token");
      // console.log("Token:", token ? "Found" : "Not found");

      try {
        const response = await fetch(`${API_BASE_URL}/api/forum/topics`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        // console.log("Fetch response status:", response.status);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        // console.log("Raw data from server:", data);

        if (!Array.isArray(data)) {
          throw new Error("Expected an array of topics, but got:", data);
        }

        const mappedTopics = data.map((topic) => ({
          id: topic.id || 0,
          author: topic.author_name || "Unknown Author",
          username: topic.author_name || "unknown",
          avatar: topic.avatar
            ? `${API_BASE_URL}${topic.avatar}`
            : `https://placehold.co/40x40/EFE2D3/000000?text=${(
                topic.author_name || "U"
              )
                .charAt(0)
                .toUpperCase()}`,
          title: topic.title || "No Title",
          replies: topic.comments_count || 0,
          lastPost: topic.created_at
            ? new Date(topic.created_at).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "N/A",
        }));
        // console.log("Mapped topics:", mappedTopics);
        setTopics(mappedTopics);
      } catch (err) {
        console.error("Error in fetchForumTopics:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForumTopics();
  }, []);

  // Filter topics based on searchQuery
  const filteredTopics = topics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-center py-10">Loading topics...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">Error: {error}</p>;
  if (filteredTopics.length === 0)
    return <p className="text-center py-10">No topics found.</p>;

  return (
    <div className="space-y-3">
      {filteredTopics.map((topic) => (
        <TopicItem key={topic.id} topic={topic} />
      ))}
    </div>
  );
};

TopicList.propTypes = {
  searchQuery: PropTypes.string,
};

TopicList.defaultProps = {
  searchQuery: "",
};

export default TopicList;
