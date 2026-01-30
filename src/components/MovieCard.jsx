import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addToWatchlist,
  removeFromWatchlist,
  toggleFavorite,
} from "../store/slices/userSlice";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { watchlist, favorites } = useSelector((state) => state.user);

  const isInWatchlist = watchlist.includes(movie.imdbID);
  const isFavorite = favorites.includes(movie.imdbID);

  const handleWatchlistClick = (e) => {
    e.stopPropagation();

    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.imdbID));
    } else {
      dispatch(addToWatchlist(movie.imdbID));
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(movie.imdbID));
  };

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
    >
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/250x350?text=No+Image"
        }
        alt={movie.Title}
        className="movie-poster"
      />

      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-meta">
          {movie.Year} • {movie.Type}
        </p>

        <div className="movie-actions">
          <button
            className={`favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
            aria-label="Toggle favorite"
          >
            ♥
          </button>

          <button
            className="watchlist-btn"
            onClick={handleWatchlistClick}
            aria-label="Toggle watchlist"
          >
            {isInWatchlist ? "−" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
}
