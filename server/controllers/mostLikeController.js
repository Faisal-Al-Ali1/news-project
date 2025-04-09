
const Article = require('../models/Article'); 

exports.getMostLikedArticle = async (req, res) => {
  try {
    const articles = await Article.aggregate([
      { $match: { isDeleted: false } }, 
      { $project: { title: 1, content: 1, featuredImage: 1, likes: { $size: "$likes" }, media: 1 } }, 
      { $sort: { likes: -1 } }, 
      { $limit: 5 } 
    ]).exec(); 
    if (articles.length === 0) {
      return res.status(404).json({ message: 'No articles found.' });
    }

    const articlesWithFullUrls = articles.map((article) => ({
      ...article,
      featuredImage: article.featuredImage ? `http://localhost:8000/${article.featuredImage.replace(/\\/g, '/')}` : null, 
      media: article.media.map((mediaUrl) => `http://localhost:8000/${mediaUrl.replace(/\\/g, '/')}`), 
    }));

    res.json(articlesWithFullUrls); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
