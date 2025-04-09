const express = require('express');
const router = express.Router();
const mostLikeController = require('../controllers/mostLikeController');

// Route to get the most liked article
router.get('/most-liked', mostLikeController.getMostLikedArticle);

module.exports = router;
