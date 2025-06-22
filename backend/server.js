const express = require("express");

require("./config/cron");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db"); // Ini adalah 'db.js' yang sudah Anda buat
const workshopRoutes = require("./routes/workshopRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes"); // NEW
const submissionRoutes = require("./routes/submissionRoutes"); // NEW
const bookingRoutes = require("./routes/bookingRoutes"); // NEW
const refundRoutes = require("./routes/refundRoutes"); // NEW
const creativeArticleRoutes = require("./routes/creativeArticleRoutes"); // NEW
const forumRoutes = require("./routes/forumRoutes"); // NEW
const userRoutes = require("./routes/userRoutes"); //NEW
const reviewRoutes = require("./routes/reviewRoutes"); //NEW
const analyticsRoutes = require("./routes/analyticsRoutes"); //NEW
const customerSupportRoutes = require("./routes/customerSupportRoutes");//NEW
const notificationRoutes = require("./routes/notificationRoutes"); //NEW

dotenv.config();

const app = express();

// Middleware
app.use(cors(
  {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/uploads", express.static("uploads"));

// Test database connection
async function testConnection() {
  try {
    await db.query("SELECT 1");
    console.log("MySQL Database Connected...");
  } catch (err) {
    console.error("MySQL Connection Error:", err);
  }
}

testConnection();

// Basic Routes
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to TiketKarya Application" });
});

// Mount Routes
app.use("/api/workshops", workshopRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); // NEW Admin routes
app.use("/api/submissions", submissionRoutes); // NEW Submission routes
app.use("/api/bookings", bookingRoutes); // NEW Booking routes
app.use("/api/refunds", refundRoutes); // NEW Refund routes
app.use("/api/creative-articles", creativeArticleRoutes); // NEW Creative Articles routes
app.use("/api/forum", forumRoutes); // NEW Forum routes
app.use("/api/users", userRoutes); //NEW User routes
app.use("/api/reviews", reviewRoutes); //NEW Review routes
app.use("/api/analytics", analyticsRoutes); //NEW Analytics routes
app.use("/api/cs", customerSupportRoutes); //NEW Analytics routes
app.use("/api/notif", notificationRoutes); //NEW Notification routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
