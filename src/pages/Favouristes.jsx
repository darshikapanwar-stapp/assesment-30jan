import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieGrid from "../components/MovieGrid";
import { fetchMovieDetails } from "../store/slices/moviesSlice";

export default function Favorites() {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.user.favorites);
  const movieDetails = useSelector((state) => state.movies.movieDetails);

  useEffect(() => {
    favorites.forEach((id) => {
      if (!movieDetails[id]) {
        dispatch(fetchMovieDetails(id));
      }
    });
  }, [favorites, movieDetails, dispatch]);

  const movies = favorites
    .map((id) => movieDetails[id])
    .filter(Boolean);

  if (!movies.length) {
    return <p className="empty-state">No favorites yet.</p>;
  }

  return (
    <div className="container">
      <h2>My Favorites</h2>
      <MovieGrid movies={movies} />
    </div>
  );
}
