import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";

import { fetchMovies } from "../store/slices/moviesSlice";
import { selectFilteredMovies } from "../store/selectors";

export default function SearchResults() {
  const dispatch = useDispatch();

  const movies = useSelector(selectFilteredMovies);
  const { loading, error, totalResults, currentPage } = useSelector(
    (state) => state.movies,
  );
  const { searchTerm, type, year } = useSelector(
    (state) => state.filters,
  );

  useEffect(() => {
    if (!searchTerm) return;

    dispatch(
      fetchMovies({
        searchTerm,
        page: currentPage,
        type,
        year,
      }),
    );
  }, [dispatch, searchTerm, currentPage, type, year]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!movies.length) {
    return <p className="empty-state">No results found.</p>;
  }

  return (
    <div className="search-results">
      <MovieGrid movies={movies} />
      <Pagination totalResults={totalResults} />
    </div>
  );
}
