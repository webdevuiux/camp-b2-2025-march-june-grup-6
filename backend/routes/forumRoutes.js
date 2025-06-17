const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.memoryStorage(); // atau gunakan diskStorage jika ingin simpan file
const upload = multer({ storage: storage });
// Get all forum topics
router.get("/topics", forumController.getForumTopics);

// Get a single forum topic and its comments
router.get("/topics/:id", forumController.getForumTopicAndComments);

// Create a new forum topic (requires authentication)
router.post("/topics", authMiddleware, forumController.createForumTopic);

// Delete a forum topic (requires authentication)
router.delete("/topics/:id", authMiddleware, forumController.deleteForumTopic);

// Create a new forum comment (requires authentication)
router.post(
  "/topics/:topicId/comments",
  authMiddleware,
  upload.single("file"), // Menangani file opsional
  forumController.createForumComment
);

// Delete a forum comment (requires authentication)
router.delete(
  "/comments/:id",
  authMiddleware,
  forumController.deleteForumComment
);
// Get total forum replies for a user (requires authentication)
router.get(
  "/users/:userId/forumReplies",
  authMiddleware,
  forumController.getUserForumReplies
);

module.exports = router;
