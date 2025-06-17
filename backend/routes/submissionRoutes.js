// backend/routes/submissionRoutes.js
const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");

router.route("/")
  .get(submissionController.getWorkshopSubmissions); // cite: 1

router.route("/:id")
  .get(submissionController.getWorkshopSubmission) // cite: 1
  .put(submissionController.processWorkshopSubmission); // cite: 1 // Untuk approve/reject

module.exports = router;