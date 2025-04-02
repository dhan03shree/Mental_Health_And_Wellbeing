import React, { useState} from "react";
import axios from "axios";
import './styles/VideoRecommendation.css';


const categories = [
    "Self help",
    "Reducing stress",
    "Anxiety",
    "Panic attacks",
    "Breathing exercises",
    "Stretching",
    "Calm music",
    "Meditation",
  ];

const VideoRecommendation = () => {
    const [query, setQuery] = useState("");
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");

    const fetchVideos = async () => {
        try {
          setError(null); // Clear old errors
          const response = await axios.get(`http://localhost:8080/api/videos/${encodeURIComponent(query)}`);
          console.log("Backend Response:", response.data);
          setVideos(response.data.items || []);
        } catch (error) {
          console.error("Error fetching videos:", error);
          setError(error.response?.data?.error || "Failed to load videos.");
        }
    };
      
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setQuery(category);
        fetchVideos(category);
      };


    return (
    <div className="video-container">
    
      <h2>Video Recommendations</h2>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={() => fetchVideos(query)}>Search</button>
      </div>

      {/* Category Buttons */}
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Video Results */}
      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-card">
            <h3>{video.snippet.title}</h3>
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoRecommendation;