require("dotenv").config();
require('./models');
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const journalistRoutes = require("./routes/journalistRoutes");
const articleRoutes = require("./routes/articleRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const connectDB = require("./config/db");


//heba
// const newsRoutes = require("./routes/newsRoutes");
const mostLikeRoutes = require('./routes/mostLikeRoutes');
const mostViewedRoutes = require('./routes/mostViewedRoutes');
const radioRoutes = require("./routes/radioRoutes");
const lastRoute= require("./routes/lastRoute");
const newsletterRoutes = require('./routes/newsletterRoutes');


///////////////////////////////////

const videoRoutes = require('./routes/videoRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactMessage = require("./routes/contactMessageRoutes");
const paymentRoutes = require('./routes/PaymentRoutes'); // ربط الـ API بـ paymentRoutes
const bookmarkRoutes = require("./routes/bookMarkRoute");///////////////////////
const statisticsRoutes = require('./routes/statisticsRoutes');


const path = require("path");
const { isAuthenticated } = require("./middleware/journalistMiddleware");
const app = express();



app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (_, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);
connectDB();

app.use("/user", bookmarkRoutes);////////////////
app.use('/api', paymentRoutes); /////////////////

app.use("/api/auth/check", isAuthenticated);

app.use("/auth", authRoutes);
app.use("/api", contactMessage);
app.use("/api/articles", articleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/journalist", journalistRoutes);
app.use("/api/videos", videoRoutes); // تمت إضافة Video Routes
app.use('/admin', adminRoutes);
app.use("/api/radios", radioRoutes);
app.use('/uploads', express.static('uploads'));

//heba 
// app.use("/api/news", newsRoutes);
app.use("/api",lastRoute);
app.use("/api/radios", radioRoutes);
app.use('/api/', mostLikeRoutes);
app.use('/api', mostViewedRoutes);
app.use('/api', statisticsRoutes);
app.use('/api', newsletterRoutes);



///////////////////////////////////////


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 
