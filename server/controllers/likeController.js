const Article = require('../models/Article');

exports.toggleLikeArticle = async (req, res) => {
  try {
    const { id } = req.params; 
    const userId = req.user._id; 

    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    const userLiked = article.likes.includes(userId);

    if (userLiked) {
      article.likes = article.likes.filter((like) => like.toString() !== userId.toString());
    } else {
      article.likes.push(userId);
    }

    await article.save();

    res.status(200).json({
      success: true,
      data: { likes: article.likes.length },
      message: userLiked ? 'Like removed' : 'Article liked',
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};