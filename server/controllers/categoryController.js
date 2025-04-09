const Category = require("../models/Category");

// ✅ Create category
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get all categories (excluding soft-deleted ones)
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    });
    if (categories.length === 0) {
      return res.status(200).json({ success: true, data: [], message: 'لا توجد فئات متاحة' });
    }
    res.status(200).json({ success: true, data: categories, message: 'تم جلب الفئات بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في جلب الفئات', error: error.message });
  }
};

// ✅ Update category
exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(category);
};

