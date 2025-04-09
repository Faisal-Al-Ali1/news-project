// controllers/mostViewedController.js
// const Video = require('../models/Video'); // استخدم نموذج المقالات الموجود

const Article = require('../models/Article')
exports.getMostViewedArticles = async (req, res) => {
  try {
    const filter = req.query.filter || 'today'; 

    let dateRange = {};
    if (filter === 'week') {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      dateRange = { publishDate: { $gte: lastWeek } };
    } else if (filter === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      dateRange = { publishDate: { $gte: today } };
    }

    const articles = await Article.find(dateRange)
      .sort({ views: -1 }) 
      .limit(5) 
      .exec();

    if (articles.length === 0) {
      return res.status(404).json({ message: 'No articles found.' });
    }

    const articlesWithFullUrls = articles.map((article) => ({
      ...article.toObject(),
      featuredImage: article.featuredImage ? `http://localhost:8000/${article.featuredImage.replace(/\\/g, '/')}` : null, 
      media: article.media.map((mediaUrl) => `http://localhost:8000/${mediaUrl.replace(/\\/g, '/')}`), 
    }));

    res.json(articlesWithFullUrls); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
