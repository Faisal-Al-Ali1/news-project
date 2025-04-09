const Video = require('../models/Video');

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({ isDeleted: false });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم', error: error.message });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video || video.isDeleted) {
      return res.status(404).json({ message: 'الفيديو غير موجود' });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم', error: error.message });
  }
};

exports.createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, embedUrl, thumbnail, isPremium } = req.body;
    const newVideo = new Video({
      title,
      description,
      videoUrl,
      embedUrl,
      thumbnail,
      isPremium: isPremium || false,
    });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم', error: error.message });
  }
};