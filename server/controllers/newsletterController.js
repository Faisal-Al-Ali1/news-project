const Subscriber = require('../models/subscriberModel');
const nodemailer = require('nodemailer');

exports.subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'أنت مشترك بالفعل في النشرة الإخبارية' });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dyaaabualrub12@gmail.com', 
        pass: 'zpnc uigd zipi xgqe',    
      },
      

    });

    const mailOptions = {
      from: 'dyaaabualrub12@gmail.com',
      to: email,
      subject: 'تم الاشتراك في نشرتنا الإخبارية',
      text: 'شكرًا للاشتراك في نشرتنا الإخبارية! سنوافيك بأحدث الأخبار قريبًا.',
    };

    // إرسال البريد الإلكتروني
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'تم الاشتراك بنجاح!' });

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ message: 'حدث خطأ أثناء الاشتراك' });
  }
};
