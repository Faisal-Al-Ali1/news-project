const User = require("../models/User");
const Article = require("../models/Article");

const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "bookmarks",
      match: { isDeleted: false },
      populate: [
        { path: "author", select: "full_name username" },
        { path: "categoryIds", select: "name" },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "المستخدم غير موجود" });
    }

    res.status(200).json({
      success: true,
      data: user.bookmarks,
    });
  } catch (error) {
    console.error("Get Bookmarks Error:", error);
    res.status(500).json({
      success: false,
      error: "فشل في جلب المقالات المحفوظة: " + error.message,
    });
  }
};

const toggleBookmark = async (req, res) => {
  const { articleId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "المستخدم غير موجود" });
    }

    const article = await Article.findById(articleId);
    if (!article || article.isDeleted) {
      return res.status(404).json({ error: "المقال غير موجود أو محذوف" });
    }

    const bookmarkIndex = user.bookmarks.indexOf(articleId);
    let message;

    if (bookmarkIndex === -1) {
      user.bookmarks.push(articleId);
      message = "تمت إضافة المقال إلى المفضلة";
    } else {
      user.bookmarks.splice(bookmarkIndex, 1);
      message = "تمت إزالة المقال من المفضلة";
    }

    await user.save();

    const updatedUser = await User.findById(req.user._id).populate({
      path: "bookmarks",
      match: { isDeleted: false },
      populate: [
        { path: "author", select: "full_name username" },
        { path: "categoryIds", select: "name" },
      ],
    });

    res.status(200).json({
      success: true,
      message,
      data: updatedUser.bookmarks,
    });
  } catch (error) {
    console.error("Toggle Bookmark Error:", error);
    res.status(500).json({
      success: false,
      error: "فشل في تحديث المفضلة: " + error.message,
    });
  }
};

module.exports = {
  getBookmarks,
  toggleBookmark,
};