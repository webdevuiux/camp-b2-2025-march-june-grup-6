const express = require("express");
const router = express.Router();
const refundController = require("../controllers/refundController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/refund-requests", authMiddleware, refundController.submitRefundRequest);
router.get("/refund-requests", authMiddleware, refundController.getRefundRequests);
router.get("/refund-requests/:id", authMiddleware, refundController.getRefundRequest);
router.put("/refund-requests/:id", authMiddleware, refundController.processRefundRequest);

module.exports = router;