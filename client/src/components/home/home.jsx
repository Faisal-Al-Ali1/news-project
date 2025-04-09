import React from "react";

import HeroSection from "../HeroSection/HeroSection";
import NewsCard from "../NewsCard/NewsCard";
import NewsSubscriptionBanner from "../NewsSubscriptionBanner/NewsSubscriptionBanner";
import GamesSection from "../GamesSection/GamesSection";
import BreakingNews from "../BreakingNews/BreakingNews";
import ArabicNewsLayout from "../ArabicNewsLayout/ArabicNewsLayout";
import NewsSection from "../NewsSection/NewsSection";
import NewsTicker from "../NewsTicker/NewsTicker";
import NewsDashboard from "../NewsDashboard/NewsDashboard";
import StatisticsSection from '../StatisticsSection/StatisticsSection';
import Categories from "../catageroies/catageries"
import  NewsletterSubscription from "../NewsletterSubscription/NewsletterSubscription"
function Home() {
  return (
    <>
      <HeroSection />
      <NewsTicker />
      <StatisticsSection />

      <div className="container mx-auto px-4 space-y-6">
      {/* <NewsDashboard /> */}
      <Categories />
      {/* <StatisticsSection /> */}

      {/* <ArabicNewsLayout /> */}
      <ArabicNewsLayout />
      {/* <NewsCard /> */}
      <NewsSubscriptionBanner />
      < NewsletterSubscription/>
      <GamesSection />
    </div>
    </>

  );
}

  
  

export default Home;