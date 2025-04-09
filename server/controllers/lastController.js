const Article = require("../models/Article");

// ✅ Get most viewed articles
exports.getlastArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "published" }) // فقط المقالات المنشورة
      .sort({ createdAt: -1 }) // ترتيب تنازلي حسب تاريخ الإنشاء
      .limit(3) // جلب أحدث 3 مقالات
      .populate("author categoryIds"); // جلب بيانات المؤلف والتصنيفات

    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: "حدث خطأ أثناء جلب المقالات", details: err.message });
  }
};