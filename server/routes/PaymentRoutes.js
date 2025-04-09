
// const express = require('express');
// const router = express.Router();
// const paymentController = require('../controllers/paymentController');

// // حماية route باستخدام middleware
// router.post('/payment', paymentController.processPayment);

// module.exports = router;
// routes/paymentRoutes.js
// const PaymentAuthMiddleware = require('../middleware/PaymentAuthMiddleware'); // استدعاء الميدل وير للحماية

// const authMiddleware = require('../middleware/PaymentAuthMiddleware'); // الميدل وير للتحقق من التوكن
const { isAuthenticated , isUser} = require('../middleware/PaymentAuthMiddleware');
const express = require('express');
const router = express.Router();
// const {paymentController} = require('../controllers/paymentController');
const { processPayment } = require('../controllers/paymentController');

// حماية مسار الدفع عبر ميدل وير التحقق من التوكن
// router.post('/payment',authMiddleware, paymentController.processPayment);
// router.post('/payment', authMiddleware, processPayment);
// router.post('/payment', isAuthenticated, processPayment);
router.post('/payment', isAuthenticated, isUser, processPayment);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const paymentController = require('../controllers/paymentController');

// // route بدون حماية
// router.post('/payment', paymentController.processPayment);

// module.exports = router;
