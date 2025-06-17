const express = require("express");
const router = express.Router();
const customerSupportController = require("../controllers/customerSupportController");



router.post("/submit", customerSupportController.submitTicket);

module.exports = router;
