// const express = require("express");
// const router = express.Router();
// const articleController = require("../controllers/articleController");
// const { isAuthenticated } = require("../middleware/journalistMiddleware");

// router.get("/", isAuthenticated, articleController.getArticles);
// router.get("/:id",isAuthenticated, articleController.getArticleById);
// router.put("/:id",isAuthenticated , articleController.updateArticle);
// module.exports = router;

const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const commentController = require("../controllers/commentController");
const reportController = require("../controllers/reportController");
const likeController = require('../controllers/likeController');
const { isAuthenticated } = require("../middleware/userMiddleware"); 

// Public routes (no authentication required)
router.get("/", articleController.getArticles); 
router.get("/:id", articleController.getArticleById); 

// Comment routes (for authenticated users)
router.post("/:id/comments", isAuthenticated, commentController.addComment); 
router.delete("/comments/:commentId", isAuthenticated, commentController.deleteComment); 

router.post('/:id/like', isAuthenticated, likeController.toggleLikeArticle);

// Report routes (for authenticated users)
router.post("/:id/reports", isAuthenticated, reportController.addReport); 

module.exports = router;