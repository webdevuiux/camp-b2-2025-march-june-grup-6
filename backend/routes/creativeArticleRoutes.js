// backend/routes/creativeArticleRoutes.js
const express = require("express");
const router = express.Router();
const creativeArticleController = require("../controllers/creativeArticleController");

router.route("/")
  .get(creativeArticleController.getCreativeArticles) // cite: 1
  .post(creativeArticleController.createCreativeArticle); // cite: 1

router.route("/:id")
  .get(creativeArticleController.getCreativeArticle) // cite: 1
  .put(creativeArticleController.updateCreativeArticle) // cite: 1
  .delete(creativeArticleController.deleteCreativeArticle); // cite: 1

module.exports = router;