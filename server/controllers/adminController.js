const Article = require('../models/Article');
const Comment = require('../models/Comment');
const Report = require('../models/Report');
const User = require('../models/User');
const Video = require('../models/Video');
const Category = require('../models/Category');



exports.getArticles = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    
   
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    
    const query = {
      isDeleted: false,
    };
    if (search) {
      query.title = { $regex: new RegExp(search, 'i') }; 
    }

   
    const articles = await Article.find(query)
      .populate('author', 'username full_name')
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .exec();

    
    const totalArticles = await Article.countDocuments(query);

    res.json({
      articles,
      totalArticles,
      currentPage: pageNum,
      totalPages: Math.ceil(totalArticles / limitNum),
    });
  } catch (err) {
    console.error('Error in getArticles:', err);
    res.status(500).json({ message: 'خطأ في جلب المقالات', error: err.message });
  }
};

exports.updateArticleStatus = async (req, res) => {
  console.log('Received ID:', req.params.id);
  try {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'published', 'rejected'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'الحالة غير صالحة' });
    }
    const article = await Article.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { status },
      { new: true }
    ).populate('author', 'username full_name');
    if (!article) return res.status(404).json({ message: 'المقال غير موجود' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: 'خطأ في تحديث الحالة', error: err });
  }
};

exports.updateArticle = async (req, res) => {
  console.log('Received ID for update:', req.params.id);
  try {
    const { title, content, featuredImage, media, categoryIds, tags, publishDate } = req.body;
    const article = await Article.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      {
        title,
        content,
        featuredImage,
        media,
        categoryIds,
        tags,
        publishDate,
      },
      { new: true }
    ).populate('author', 'username full_name');
    if (!article) return res.status(404).json({ message: 'المقال غير موجود' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: 'خطأ في تعديل المقال', error: err });
  }
};


exports.deleteArticle = async (req, res) => {
  console.log('Received ID for delete:', req.params.id);
  try {
    const article = await Article.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    ).populate('author', 'username full_name');
    if (!article) return res.status(404).json({ message: 'المقال غير موجود' });
    res.json({ message: 'تم حذف المقال بنجاح', article });
  } catch (err) {
    res.status(500).json({ message: 'خطأ في حذف المقال', error: err });
  }
};


exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('author article video');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCommentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const comment = await Comment.findByIdAndUpdate(id, { status }, { new: true });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('article reportedBy');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReportStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const report = await Report.findByIdAndUpdate(id, { status }, { new: true });
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.toggleUserStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.isDeleted = !user.isDeleted;
    await user.save();
    res.status(200).json({ isDeleted: user.isDeleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('_id');
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findByIdAndUpdate(id, req.body, { new: true });
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// عرض التحليلات
// exports.getAnalytics = async (req, res) => {
//   try {
//     const articles = await Article.find();
//     const users = await User.find();
//     const videos = await Video.find();
//     res.status(200).json({
//       totalArticles: articles.length,
//       totalUsers: users.length,
//       totalVideos: videos.length,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getAnalytics = async (req, res) => {
//   try {
//     const articles = await Article.countDocuments({ isDeleted: false });
//     const users = await User.countDocuments({ isDeleted: false });
//     const videos = await Video.countDocuments({ isDeleted: false });
//     const journalists = await User.countDocuments({ role: 'journalist', isDeleted: false });
//     const comments = await Comment.countDocuments();
    
//     res.status(200).json({
//       totalArticles: articles,
//       totalUsers: users,
//       totalVideos: videos,
//       totalJournalists: journalists,
//       totalComments: comments,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getAnalytics = async (req, res) => {
  try {
    const articles = await Article.find();
    const users = await User.find();
    const videos = await Video.find();

    res.status(200).json({
      totalArticles: articles.length,
      totalUsers: users.length,
      totalVideos: videos.length,
      totalViews: articles.reduce((sum, a) => sum + (a.views || 0), 0),
      avgTimeOnSite: 180, // قيمة افتراضية بالثواني
      topCategories: ['سياحة', 'سياسة', 'تكنولوجيا'],
      userDemographics: {
        age: { '18-24': 25, '25-34': 35, '35-44': 20, '45+': 20 },
        location: { 'عمان': 40, 'الزرقاء': 25, 'اربد': 20, 'أخرى': 15 },
      },
      topArticles: articles
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 4)
        .map(a => ({
          title: a.title,
          views: a.views || 0,
          comments: 0, 
          avgTime: '3:00', 
          category: 'غير محدد',
        })),
    });
  } catch (error) {
    console.error('Error in getAnalytics:', error);
    res.status(500).json({ error: error.message });
  }
};

// جلب بيانات المستخدم
exports.getAdminProfile = (req, res) => {
  const user = req.user; // من isAuthenticated
  res.json({
    name: user.name || 'مدير النظام', // قيم افتراضية إذا لم تكن موجودة
    email: user.email,
    avatar: user.avatar || '',
    role: user.role,
    twoFactorEnabled: user.twoFactorEnabled || false,
    notificationsEnabled: user.notificationsEnabled || false,
  });
};

// تحديث بيانات المستخدم
exports.updateProfile = async (req, res) => {
  const { name, email, twoFactorEnabled, notificationsEnabled, emailNotifications, systemAlerts } = req.body;
  const avatar = req.file ? `/uploads/${req.file.filename}` : req.user.avatar;

  try {
    const updatedUser = {
      name,
      email,
      avatar,
      twoFactorEnabled: twoFactorEnabled === 'true',
      notificationsEnabled: notificationsEnabled === 'true',
      emailNotifications: emailNotifications === 'true',
      systemAlerts: systemAlerts === 'true',
    };
    // هنا يمكنك إضافة منطق لتحديث قاعدة البيانات، مثال:
    // await User.findByIdAndUpdate(req.user.id, updatedUser);
    console.log('تم تحديث المستخدم:', updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'فشل في تحديث الملف الشخصي' });
  }
};