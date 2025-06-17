import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AnalyticsCard from "./AnalyticsCard";
import StatCard from "./StatCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const MainContent = () => {
  const [orders, setOrders] = useState(0);
  const [pending, setPending] = useState(0);
  const [users, setUsers] = useState(0);
  const [forumPosts, setForumPosts] = useState(0);
  const [previousOrders, setPreviousOrders] = useState(0);
  const [previousUsers, setPreviousUsers] = useState(0);
  const [previousForumPosts, setPreviousForumPosts] = useState(0);
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/analytics/analytics`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch analytics data");
        const data = await response.json();
        console.log("API Response:", data); // Debug API response
        // Simpan data sebelumnya sebelum memperbarui
        setPreviousOrders(orders);
        setPreviousUsers(users);
        setPreviousForumPosts(forumPosts);
        // Perbarui data baru
        setOrders(data.orders || 0);
        setPending(data.pending || 0);
        setUsers(data.users || 0);
        setForumPosts(data.forumPosts || 0);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };

    fetchAnalyticsData();
    const interval = setInterval(fetchAnalyticsData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [token, API_BASE_URL]);

  // Gunakan total orders dan users untuk chart (tanpa simulasi acak)
  const chartDataOrders = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Orders",
        data: Array(7).fill(orders), // Gunakan total orders untuk semua hari
        backgroundColor: "#ff3b30",
      },
    ],
  };

  const chartDataUsers = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Logged-in Users",
        data: Array(7).fill(users), // Gunakan total users untuk semua hari
        borderColor: "#34c759",
        backgroundColor: "rgba(52, 199, 89, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 10, callback: (value) => value }, // Langkah 10, tanpa desimal
      },
    },
  };

  // Hitung percentChange secara real-time
  const calculatePercentChange = (newValue, oldValue) => {
    if (oldValue === 0) return "N/A";
    const change = ((newValue - oldValue) / oldValue) * 100;
    return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
  };

  const ordersPercentChange = calculatePercentChange(orders, previousOrders);
  const usersPercentChange = calculatePercentChange(users, previousUsers);
  const forumPostsPercentChange = calculatePercentChange(
    forumPosts,
    previousForumPosts
  );

  return (
    <div className="h-full py-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span>Admin</span>
          <span>/</span>
          <span>Analytics</span>
        </div>
        <h1 className="text-4xl font-bold mt-4">Analytics</h1>
        <p className="text-gray-600 mt-2">
          Check the sales, user counts, and Topic Posted
        </p>
      </div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Orders"
          value={orders.toString()}
          secondaryValue={pending.toString()}
          secondaryLabel="Pending"
          percentChange={ordersPercentChange}
          timeframe="Than last update"
        />
        <StatCard
          title="Today's Users"
          value={users.toString()}
          percentChange={usersPercentChange}
          timeframe="Than last update"
        />
        <StatCard
          title="Forum Posts"
          value={forumPosts.toString()}
          percentChange={forumPostsPercentChange}
          timeframe="Than last update"
        />
      </div>
      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <AnalyticsCard
          title="Workshop Sales"
          chartData={chartDataOrders}
          options={chartOptions}
          lastUpdate="5 minutes ago"
        />
        <AnalyticsCard
          title="User Growth"
          chartData={chartDataUsers}
          options={chartOptions}
          lastUpdate="5 minutes ago"
        />
      </div>
    </div>
  );
};

export default MainContent;
