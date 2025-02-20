import React, { useState, useEffect } from "react";
import "../styles/newsCopm.css";

const NewsComp = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://gnews.io/api/v4/top-headlines?country=il&category=general&apikey=9a280ae61e04a117cbf6f12df17e9c02"
        );
        const data = await response.json();
        setNewsItems(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 60000 * 60);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="news-ticker">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {[...newsItems, ...newsItems].map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ticker-item">
              {formatTime(item.publishedAt)}: <b>{item.source.name}</b>: {item.title}.
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsComp;
