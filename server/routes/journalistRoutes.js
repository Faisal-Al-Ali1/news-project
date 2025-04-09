const express = require("express");
const router = express.Router();
const { isAuthenticated, isJournalist } = require("../middleware/journalistMiddleware");
const journalistController = require("../controllers/journalistController");

// Get this journalist articles 
router.get("/articles", isAuthenticated, isJournalist, journalistController.getArticles);

// Create a new article
router.post("/articles", isAuthenticated, isJournalist, journalistController.createArticle);

// Edit an article 
router.put("/articles/:id", isAuthenticated, isJournalist, journalistController.updateArticle);

// delete an article 
router.put("/articles/:id/delete", isAuthenticated, isJournalist, journalistController.softDeleteArticle);

// Get article analytics 
router.get("/analytics", isAuthenticated, isJournalist, journalistController.getAnalytics);

// Get article status 
router.get("/status", isAuthenticated, isJournalist, journalistController.getStatus);

// Get Categories 
router.get("/categories", journalistController.getCategories);

module.exports = router;
