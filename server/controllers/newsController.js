const News = require("../models/Article");

const getBreakingNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }).limit(5);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب الأخبار" });
  }
};

module.exports = { getBreakingNews };
