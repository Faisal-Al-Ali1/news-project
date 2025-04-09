const Report = require("../models/Report");
const Article = require("../models/Article");

exports.addReport = async (req, res) => {
  try {
    const { reason } = req.body;
    const { id } = req.params; 
    const reportedBy = req.user._id; 

    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ success: false, error: "Article not found" });
    }

    const report = new Report({
      article: id,
      reportedBy,
      reason,
    });

    await report.save();

    res.status(201).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};