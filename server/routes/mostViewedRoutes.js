const express = require('express');
const router = express.Router();
const mostViewedController = require("../controllers/mostViewedController")

router.get('/most-viewed', mostViewedController.getMostViewedArticles);

module.exports = router;
