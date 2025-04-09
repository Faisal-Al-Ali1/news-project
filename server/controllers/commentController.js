const Comment = require("../models/Comment");
const Article = require("../models/Article");

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params; 
    const author = req.user._id; 

    const comment = new Comment({
      article: id,
      author,
      content,
    });

    await comment.save();

    await Article.findByIdAndUpdate(id, { $push: { comments: comment._id } });

    const populatedComment = await Comment.findById(comment._id).populate('author', 'full_name');

    res.status(201).json({ success: true, data: populatedComment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, error: "Comment not found" });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    await Comment.findByIdAndDelete(commentId);

    await Article.findByIdAndUpdate(comment.article, { $pull: { comments: commentId } });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};