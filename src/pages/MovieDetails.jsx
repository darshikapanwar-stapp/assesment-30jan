import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { fetchMovieDetails } from "../store/slices/moviesSlice";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";

export default function MovieDetails() {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { movieDetails, loading, error } = useSelector(
    (state) => state.movies,
  );

  const movie = movieDetails[imdbID];

  useEffect(() => {
    // Fetch only if not already cached
    if (!movie) {
      dispatch(fetchMovieDetails(imdbID));
    }
  }, [dispatch, imdbID, movie]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="movie-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to results
      </button>

      <div className="movie-details-content">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          className="movie-details-poster"
        />

        <div className="movie-details-info">
          <h1>{movie.Title}</h1>

          <p className="meta">
            {movie.Year} • {movie.Rated} • {movie.Runtime}
          </p>

          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>

          <p className="plot">{movie.Plot}</p>

          <p>
            <strong>IMDb Rating:</strong> {movie.imdbRating}
          </p>

          {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
            <p>
              <strong>Box Office:</strong> {movie.BoxOffice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
