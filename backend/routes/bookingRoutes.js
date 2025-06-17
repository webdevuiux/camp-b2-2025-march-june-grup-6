const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/bookings", authMiddleware, bookingController.bookWorkshop);
router.put(
  "/payments/:payment_id/confirm",
  authMiddleware,
  bookingController.confirmPayment
);
router.put(
  "/payments/:payment_id/reject",
  authMiddleware,
  bookingController.rejectPayment
);
router.get(
  "/order-requests",
  authMiddleware,
  bookingController.getOrderRequests
);
router.get("/user/bookings", authMiddleware, bookingController.getUserBookings);
router.get(
  "/bookings/:bookingId",
  authMiddleware,
  bookingController.getBookingDetail
);

module.exports = router;
