const express = require("express");
const router = express.Router();
const { getBookmarks, toggleBookmark } = require("../controllers/bookMarkController");
const { isAuthenticated , isUser} = require('../middleware/PaymentAuthMiddleware');

router.get("/bookmarks", isAuthenticated, isUser, getBookmarks);

router.put("/bookmarks/:articleId", isAuthenticated, isUser, toggleBookmark);

module.exports = router;