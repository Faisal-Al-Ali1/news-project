const Article = require('../models/Article');
const Comment = require('../models/Comment');
const Report = require('../models/Report');
const mongoose = require('mongoose');

exports.createArticle = async (req, res) => {
  try {
    const { title, content, featuredImage, media, categoryIds, tags, author, publishDate } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ success: false, message: 'Title, content, and author are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(author)) {
      return res.status(400).json({ success: false, message: 'Invalid author ID' });
    }
    const authorObjectId = new mongoose.Types.ObjectId(author);

    let categoryObjectIds = [];
    if (categoryIds) {
      const ids = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
      for (const id of ids) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ success: false, message: `Invalid category ID: ${id}` });
        }
        categoryObjectIds.push(new mongoose.Types.ObjectId(id));
      }
    }

    const article = new Article({
      title,
      content,
      featuredImage,
      media,
      categoryIds: categoryObjectIds,
      tags,
      author: authorObjectId,
      publishDate: publishDate || new Date(),
    });

    const savedArticle = await article.save();
    res.status(201).json({ success: true, data: savedArticle, message: 'Article created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const { page = 1, limit = 8, category, sortBy = 'createdAt', order = 'desc', status = 'published' } = req.query;

    let query = { status, isDeleted: false };

    if (category) {
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ success: false, message: 'Invalid category ID' });
      }
      query.categoryIds = { $in: [new mongoose.Types.ObjectId(category)] };
    }

    const skip = (page - 1) * limit;
    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    const articles = await Article.find(query)
      .populate({ path: 'author', select: 'full_name' })
      .populate({ path: 'categoryIds', select: 'name' })
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const articlesWithFullUrls = articles.map((article) => ({
      ...article.toObject(),
      featuredImage: article.featuredImage ? `http://localhost:8000/${article.featuredImage}` : null,
      media: article.media.map((mediaUrl) => `http://localhost:8000/${mediaUrl}`),
    }));

    const totalArticles = await Article.countDocuments(query);

    res.status(200).json({
      success: true,
      data: articlesWithFullUrls,
      pagination: { total: totalArticles, page: parseInt(page), pages: Math.ceil(totalArticles / limit) },
    });
  } catch (error) {
    console.error('Error in getArticles:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findOne({ _id: id, isDeleted: false })
      .populate('author', 'name')
      .populate('categoryIds', 'name')
      .populate('videoId', 'videoUrl title');

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    article.views = (article.views || 0) + 1;
    await article.save();

    const relatedArticles = await Article.find({
      categoryIds: { $in: article.categoryIds },
      _id: { $ne: id },
      status: 'published',
      isDeleted: false,
    })
      .populate('author', 'name')
      .populate('categoryIds', 'name')
      .limit(3);

    const comments = await Comment.find({ article: id, status: 'visible' })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    const articleWithFullUrl = {
      ...article.toObject(),
      featuredImage: article.featuredImage ? `http://localhost:8000/${article.featuredImage}` : null,
    };

    res.status(200).json({
      success: true,
      data: {
        article: articleWithFullUrl,
        relatedArticles,
        comments,
        engagementStats: {
          likes: article.likes ? article.likes.length : 0,
          views: article.views,
          commentCount: comments.length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

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

exports.addComment = async (req, res) => {
  try {
    const { id } = req.params; 
    const { content } = req.body; 
    const userId = req.user._id; 

    const comment = new Comment({
      article: id,
      author: userId,
      content,
    });

    await comment.save();
    await comment.populate('author', 'username'); 
    res.status(201).json({ success: true, data: comment, message: 'Comment added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.reportArticle = async (req, res) => {
  try {
    const { id } = req.params; 
    const { reason } = req.body; 
    const userId = req.user._id; 
    const report = new Report({
      article: id,
      reportedBy: userId,
      reason,
    });

    await report.save();

    res.status(201).json({ success: true, message: 'Report submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params; 
    const updates = req.body; 

    const allowedUpdates = ['title', 'content', 'featuredImage', 'media', 'categoryIds', 'tags', 'publishDate', 'status'];
    const invalidUpdates = Object.keys(updates).filter((field) => !allowedUpdates.includes(field));

    if (invalidUpdates.length > 0) {
      return res.status(400).json({ success: false, message: `Invalid fields: ${invalidUpdates.join(', ')}` });
    }

    if (updates.categoryIds) {
      updates.categoryIds = Array.isArray(updates.categoryIds)
        ? updates.categoryIds.map((id) => new mongoose.Types.ObjectId(id))
        : [new mongoose.Types.ObjectId(updates.categoryIds)];
    }

    if (updates.author) {
      updates.author = new mongoose.Types.ObjectId(updates.author);
    }

    const article = await Article.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true });

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    res.status(200).json({ success: true, data: article, message: 'Article updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating article', error: error.message });
  }
};

