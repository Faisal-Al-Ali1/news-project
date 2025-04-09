const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController.js');

router.get('/statistics', statisticsController.getStatistics);

module.exports = router;
