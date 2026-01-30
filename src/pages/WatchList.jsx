import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieGrid from "../components/MovieGrid";
import { fetchMovieDetails } from "../store/slices/moviesSlice";

export default function Watchlist() {
  const dispatch = useDispatch();

  const watchlist = useSelector((state) => state.user.watchlist);
  const movieDetails = useSelector((state) => state.movies.movieDetails);

  // 🔑 FETCH MISSING MOVIE DETAILS
  useEffect(() => {
    watchlist.forEach((id) => {
      if (!movieDetails[id]) {
        dispatch(fetchMovieDetails(id));
      }
    });
  }, [watchlist, movieDetails, dispatch]);

  const movies = watchlist
    .map((id) => movieDetails[id])
    .filter(Boolean);

  if (!movies.length) {
    return <p className="empty-state">Your watchlist is empty.</p>;
  }

  return (
    <div className="container">
      <h2>My Watchlist</h2>
      <MovieGrid movies={movies} />
    </div>
  );
}
