
// const Payment = require('../models/Payment'); // موديل Payment
// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // موديل User

// // دالة لإتمام عملية الدفع
// exports.processPayment = async (req, res) => {
//   const { cardNumber, cardHolder, expiryDate, cvv } = req.body;

//   try {
//     // التحقق من التوكن
//     // const token = req.headers.authorization.split(' ')[1]; // استخراج التوكن من الـ headers
//     // const decoded = jwt.verify(token, process.env.JWT_SECRET); // فك التوكن

//     // التحقق من المستخدم في الـ database
//     // const user = await User.findById(decoded.userId);

//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // تخزين بيانات الدفع في MongoDB
//     const payment = new Payment({
//       user: user._id,
//       cardNumber,
//       cardHolder,
//       expiryDate,
//       cvv,
//     });

//     await payment.save();

//     res.status(200).json({ success: true, message: 'Payment processed successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Error processing payment' });
//   }
// };






// paymentController.js

// const jwt = require('jsonwebtoken');
// const Payment = require('../models/Payment'); // موديل Payment
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// // دالة لإتمام عملية الدفع
// exports.processPayment = async (req, res) => {
//   const { cardNumber, cardHolder, expiryDate, cvv } = req.body;

//   try {

//        // ✅ طباعة الكوكيز
//        console.log("Cookies Received:", req.cookies);
//     // استخراج التوكن من الهيدر
//     const token = req.cookies.authToken;
//     if (!token) {
//       return res.status(401).json({ success: false, message: 'Unauthorized' });
//     }

//     // فك تشفير التوكن للحصول على userId
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token Data:", decoded);


//     const userId = decoded.id; // يفترض أن التوكن يحتوي على userId

    
// console.log("Extracted User ID:", userId);


//     // تخزين بيانات الدفع في MongoDB مع ربطها بالمستخدم
//     const payment = new Payment({
//       userId,
//       cardNumber,
//       cardHolder,
//       expiryDate,
//       cvv,
//     });

//     await payment.save();

//     res.status(200).json({ success: true, message: 'Payment processed successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Error processing payment' });
//   }
// };




// const jwt = require("jsonwebtoken");
// require("dotenv").config();


const Payment = require("../models/Payment");
const User = require("../models/User"); // Import the User model

const processPayment = async (req, res) => {
  const { cardNumber, cardHolder, expiryDate, cvv } = req.body;

  try {
    // Get the user ID from the request object (attached by the middleware)
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is missing" });
    }

    // Create a new payment record with the user ID
    const payment = new Payment({
      userId,
      cardNumber,
      cardHolder,
      expiryDate,
      cvv,
    });

    // Save the payment record to the database
    await payment.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.isSubscribed = true;
    await user.save(); 

    res.status(200).json({ success: true, message: "Payment processed successfully and subscription updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error processing payment" });
  }
};

module.exports = { processPayment };