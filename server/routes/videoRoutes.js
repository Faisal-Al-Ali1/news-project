const express = require('express');
const router = express.Router();
const { getAllVideos, getVideoById, createVideo } = require('../controllers/videoController');

router.get('/', getAllVideos);

router.get('/:id', getVideoById);

router.post('/', createVideo);

module.exports = router;