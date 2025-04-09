const Article = require("../models/Article");
const Category = require("../models/Category");
const upload = require("../middleware/upload"); 

exports.getArticles = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query; 
    const offset = (page - 1) * limit;

    const articles = await Article.find({ author: req.user._id, isDeleted: false })
      .skip(offset)
      .limit(parseInt(limit))
      .populate("categoryIds");

    const totalItems = await Article.countDocuments({ author: req.user._id, isDeleted: false });

    const articlesWithFullUrls = articles.map((article) => ({
      ...article.toObject(),
      featuredImage: `http://localhost:8000/${article.featuredImage}`,
      media: article.media.map((mediaUrl) => `http://localhost:8000/${mediaUrl}`),
    }));

    res.json({
      articles: articlesWithFullUrls,
      totalItems,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createArticle = async (req, res) => {
  try {
    upload.fields([
      { name: "featuredImage", maxCount: 1 }, 
      { name: "media", maxCount: 10 }, 
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const featuredImage = req.files.featuredImage ? req.files.featuredImage[0].path : null;
      const media = req.files.media ? req.files.media.map((file) => file.path) : [];

      const newArticle = new Article({
        title: req.body.title,
        content: req.body.content,
        featuredImage: featuredImage,
        media: media,
        categoryIds: req.body.categoryIds,
        tags: req.body.tags,
        author: req.user._id, 
        likes: [],
      });

      await newArticle.save();

      const populatedArticle = await Article.findById(newArticle._id).populate(
        "categoryIds",
        "name description"
      );

      const articleWithFullUrls = {
        ...populatedArticle.toObject(),
        featuredImage: `http://localhost:8000/${populatedArticle.featuredImage}`,
        media: populatedArticle.media.map((mediaUrl) => `http://localhost:8000/${mediaUrl}`),
      };

      res.status(201).json(articleWithFullUrls);
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    upload.fields([
      { name: "featuredImage", maxCount: 1 }, 
      { name: "media", maxCount: 10 }, 
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const article = await Article.findOne({ _id: req.params.id, author: req.user._id });

      if (!article) {
        return res.status(404).json({ message: "Article not found or not authorized." });
      }
      if (article.status !== "pending") {
        return res.status(403).json({ message: "You can only edit pending articles." });
      }

      const featuredImage = req.files.featuredImage ? req.files.featuredImage[0].path : article.featuredImage;
      const media = req.files.media ? req.files.media.map((file) => file.path) : article.media;

      const updatedArticle = await Article.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          content: req.body.content,
          featuredImage: featuredImage,
          media: media,
          categoryIds: req.body.categoryIds,
          tags: req.body.tags,
        },
        { new: true } 
      );

      const populatedArticle = await Article.findById(updatedArticle._id).populate(
        "categoryIds",
        "name description"
      );

      const articleWithFullUrls = {
        ...populatedArticle.toObject(),
        featuredImage: `http://localhost:8000/${populatedArticle.featuredImage}`,
        media: populatedArticle.media.map((mediaUrl) => `http://localhost:8000/${mediaUrl}`),
      };

      res.json(articleWithFullUrls);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.softDeleteArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id, author: req.user._id });

    if (!article) {
      return res.status(404).json({ message: "Article not found or not authorized." });
    }
    if (article.status !== "pending") {
      return res.status(403).json({ message: "You can only delete pending articles." });
    }

    article.isDeleted = true;
    await article.save();

    res.json({ message: "Article soft deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user._id, isDeleted: false }, "title views likes");
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query; 
    const offset = (page - 1) * limit;

    const articles = await Article.find(
      { author: req.user._id, isDeleted: false },
      "title status"
    )
      .skip(offset)
      .limit(parseInt(limit));

    const totalItems = await Article.countDocuments({ author: req.user._id, isDeleted: false });

    res.json({
      articles,
      totalItems,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find({ deleted: { $ne: true } });
  res.json(categories);
};