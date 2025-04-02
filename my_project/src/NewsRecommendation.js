import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/News.css"; // Ensure the correct path

const NewsRecommendation = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("mental health");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to Fetch News
  const fetchNews = async (searchQuery) => {
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_NEWS_API_KEY; // Correct format for Create React App
      if (!apiKey) throw new Error("API key is missing. Check your .env file.");

      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`
      );

      setNews(response.data.articles);
      setError(null);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to load news. Please try again later.");
    }
    setLoading(false);
  };

  // Fetch news only on initial load
  useEffect(() => {
    fetchNews("mental health"); // Default topic on load
  }, []);

  // Handle Search Submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(query); // Fetch news when search button is clicked
  };

  return (
    <div className="news-page">
      <div className="news-header">
        <h2 className="news-title">📰 Recommended News</h2>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="news-grid">
        {news.length > 0 ? (
          news.slice(0, 12).map((article, index) => (
            <div key={index} className="news-card">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={article.urlToImage || "https://via.placeholder.com/250"}
                  alt={article.title}
                  className="news-thumbnail"
                />
                <div className="news-info">
                  <h3 className="news-headline">{article.title}</h3>
                  <p className="news-description">{article.description}</p>
                </div>
              </a>
            </div>
          ))
        ) : (
          <p className="no-news">No news available. Try a different search.</p>
        )}
      </div>
    </div>
  );
};

export default NewsRecommendation;
