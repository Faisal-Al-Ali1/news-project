// const Article = require('../models/Article'); // نموذج المقالات
// const User = require('../models/User'); // نموذج المستخدمين
// const Video = require('../models/Video'); // نموذج الفيديوهات أو الوثائقيات (إذا كان لديك نموذج فيديوهات)

// exports.getStatistics = async (req, res) => {
//   try {
//     // جلب عدد المقالات المنشورة
//     const articleCount = await Article.countDocuments({ status: 'published', isDeleted: false });

//     // جلب عدد الثقافات (إذا كان لديك نموذج خاص بالثقافات، هنا تضعه)
//     // لنفترض أن لديك نموذجًا يسمى Culture (إذا لم يكن لديك، يمكنك تخطي هذا الجزء)
//     const cultureCount = await Article.countDocuments({ tags: 'culture' }); // على سبيل المثال، إذا كان لديك "ثقافة" في التاج

//     // جلب عدد الوثائقيات المميزة (إذا كنت تستخدم "isFeatured" في المقالات أو الفيديوهات)
//     const documentaryCount = await Article.countDocuments({ isDeleted: false, videoId: { $ne: null } }); // عدد المقالات التي تحتوي على videoId مرتبط بفيديو

//     // جلب عدد المتابعين الجدد شهريًا (يتم احتساب المستخدمين الجدد خلال آخر شهر)
//     const lastMonth = new Date();
//     lastMonth.setMonth(lastMonth.getMonth() - 1);
    
//     const newUsers = await User.countDocuments({ createdAt: { $gte: lastMonth } });
//   // جلب عدد الفيديوهات
//   const videoCount = await Video.countDocuments({ isDeleted: false });

//   // حساب إجمالي المشاهدات لجميع الفيديوهات
//   const totalVideoViews = await Video.aggregate([
//     { $match: { isDeleted: false } },
//     { $group: { _id: null, totalViews: { $sum: '$views' } } }
//   ]);

//   // حساب إجمالي الإعجابات لجميع الفيديوهات
//   const totalVideoLikes = await Video.aggregate([
//     { $match: { isDeleted: false } },
//     { $unwind: '$likes' },
//     { $group: { _id: null, totalLikes: { $sum: 1 } } }
//   ]);


//     res.json({
//       articleCount,
//       cultureCount,
//       documentaryCount,
//       newUsers,
//     });
//   } catch (error) {
//     console.error('Error fetching statistics:', error);
//     res.status(500).json({ message: 'Error fetching statistics', error });
//   }
// };
const Article = require('../models/Article'); // نموذج المقالات
// const User = require('../models/User'); // نموذج المستخدمين
const Video = require('../models/Video'); // نموذج الفيديوهات

exports.getStatistics = async (req, res) => {
  try {
    const articleCount = await Article.countDocuments({ status: 'published', isDeleted: false });


    const documentaryCount = await Video.countDocuments({ isPremium: true, isDeleted: false });

    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    // const newUsers = await User.countDocuments({ createdAt: { $gte: lastMonth } });

    // جلب عدد المستخدمين بشكل عام
    // const userCount = await User.countDocuments({});

    // جلب عدد الفيديوهات
    const videoCount = await Video.countDocuments({ isDeleted: false });

    const totalVideoViews = await Video.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);

    const totalVideoLikes = await Video.aggregate([
      { $match: { isDeleted: false } },
      { $unwind: '$likes' },
      { $group: { _id: null, totalLikes: { $sum: 1 } } }
    ]);

    res.json({
      articleCount,
      // cultureCount,
      documentaryCount,
      // newUsers,
      // userCount,
      videoCount,
      totalVideoViews: totalVideoViews.length ? totalVideoViews[0].totalViews : 0,
      // totalVideoLikes: totalVideoLikes.length ? totalVideoLikes[0].totalLikes : 0,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error); // إضافة سجل تفصيلي للخطأ
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
};
