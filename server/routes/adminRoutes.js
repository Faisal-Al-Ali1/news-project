const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middleware/adminMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
// إدارة المقالات
router.get('/articles',isAuthenticated, isAdmin,adminController.getArticles);
router.put('/articles/:id/status', isAuthenticated, isAdmin,adminController.updateArticleStatus);
router.put('/articles/:id',isAuthenticated, isAdmin, adminController.updateArticle); 
router.delete('/articles/:id',isAuthenticated, isAdmin, adminController.deleteArticle); 


// إدارة التعليقات
router.get('/comments', isAuthenticated, isAdmin,adminController.getComments);
router.put('/comments/:id/status', isAuthenticated, isAdmin ,adminController.updateCommentStatus);


// معالجة التقارير
router.get('/reports', isAuthenticated, isAdmin ,adminController.getReports);
router.put('/reports/:id/status',isAuthenticated, isAdmin, adminController.updateReportStatus);


// إدارة المستخدمين
router.get('/users', isAuthenticated, isAdmin, adminController.getUsers);
router.put('/users/:id/role',isAuthenticated, isAdmin, adminController.updateUserRole);
router.put('/users/:id/status',isAuthenticated, isAdmin, adminController.toggleUserStatus);


// إدارة الفيديوهات
router.get('/videos',isAuthenticated, isAdmin, adminController.getVideos);
router.post('/videos',isAuthenticated, isAdmin , adminController.addVideo);
router.put('/videos/:id',isAuthenticated, isAdmin, adminController.updateVideo);
router.delete('/videos/:id',isAuthenticated, isAdmin, adminController.deleteVideo);

// إدارة التصنيفات
router.get('/categories',isAuthenticated, isAdmin, adminController.getCategories);
router.post('/categories',isAuthenticated, isAdmin, adminController.addCategory);
router.put('/categories/:id',isAuthenticated, isAdmin, adminController.updateCategory);
router.delete('/categories/:id',isAuthenticated, isAdmin , adminController.deleteCategory);

// عرض التحليلات
router.get('/analytics',isAuthenticated, isAdmin , adminController.getAnalytics);

router.get('/profile', isAuthenticated, isAdmin, adminController.getAdminProfile);
router.put('/profile', isAuthenticated, isAdmin, upload.single('avatar'), adminController.updateProfile);


module.exports = router;


