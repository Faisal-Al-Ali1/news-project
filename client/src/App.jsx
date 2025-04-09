import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home/home";
import AboutUs from "./components/AboutUs/aboutUs";
import ContactUs from "./components/contactUs/contactUs";
import Catageries from "./components/catageroies/catageries";
import Articles from "./components/articles/articles";
import ArticleDetails from "./components/articleDetails/articledetails";
import Login from "./components/login/login";
import Register from "./components/register/register";
import UserProfile from "./components/userProfile/userProfile";
import Bookmark from "./components/bookmark/bookmark";
import Admin from "./components/AdminDash/Admin";
import Navbar from "./components/navbar/navbar";
import Payment from "./components/payment/payment";
import DigiboostLandingPage from "./components/DigiboostLandingPage/DigiboostLandingPage";
import HeroSection from "./components/HeroSection/HeroSection";
import Newscard from "./components/NewsCard/NewsCard";
import Footer from "./components/footer/footer";
import GamesSection from "./components/GamesSection/GamesSection";
import SudokuGame from "./components/SudokuGame/SudokuGame";
import CutWordGame from "./components/CutWordGame/CutWordGame";
import MainFeature from './components/MainFeature/MainFeature';
import Sidebar from './components/sidebar/saidbar';
import CartoonSection from './components/CartoonSection/CartoonSection';
import Dashboard from "./components/JournlistDash/Dashboard";
import VideoList from './components/Video/VideoList';
import VideoDetail from './components/Video/VideoDetail';
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Main />
      </Router>
    </AuthProvider>
  );
}

function Main() {
  const location = useLocation();

  // Define the routes where Navbar and Footer should be hidden
  const hideNavbarAndFooter = [
    "/login",
    "/register",
    "/admin",
    "/journalist"
  ];

  const shouldHideNavbarAndFooter = hideNavbarAndFooter.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideNavbarAndFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/categories" element={<Catageries />} />
        <Route path="/articles/:categoryId" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/bookmarks" element={<Bookmark />} />
        <Route path="/DigiboostLandingPage" element={<DigiboostLandingPage />} />
        <Route path="/HeroSection" element={<HeroSection />} />
        <Route path="/Newscard" element={<Newscard />} />
        <Route path="/GamesSection" element={<GamesSection />} />
        <Route path="/sudoku" element={<SudokuGame />} />
        <Route path="/cutwordgame" element={<CutWordGame />} />
        <Route path="/journalist/*" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/videos" element={<VideoList />} />
        <Route path="/video/:id" element={<VideoDetail />} />
      </Routes>

      {!shouldHideNavbarAndFooter && <Footer />}
    </>
  );
}

export default App;
