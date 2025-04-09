import { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";

const BreakingNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/breaking-news")
      .then(response => setNews(response.data))
      .catch(error => console.error("Error fetching news:", error));
  }, []);

  return (
    <div className="bg-red-600 text-white py-2">
      <Marquee speed={50} gradient={false} pauseOnHover>
        {news.map((item, index) => (
          <span key={index} className="mx-4 font-bold">
            📰 {item.title}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default BreakingNews;
