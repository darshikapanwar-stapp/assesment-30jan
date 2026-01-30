import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <h1>🎬 Welcome to MovieDB</h1>

      <p className="home-subtitle">
        Search movies, explore details, and manage your watchlist & favorites.
      </p>

      <div className="home-instructions">
        <h3>How to use:</h3>
        <ul>
          <li>🔍 Use the search bar above to find movies or series</li>
          <li>📄 Click on a movie card to see full details</li>
          <li>❤️ Add movies to Favorites</li>
          <li>➕ Save movies to your Watchlist</li>
          <li>📱 Works on mobile, tablet, and desktop</li>
        </ul>
      </div>

      <Link to="/search" className="start-search-btn">
        Start Searching
      </Link>
    </div>
  );
}
