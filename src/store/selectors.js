import { createSelector } from "@reduxjs/toolkit";

// Filtered movies selector
export const selectFilteredMovies = createSelector(
  [(state) => state.movies.searchResults, (state) => state.filters],
  (movies, filters) => {
    const { type, year } = filters;

    return movies.filter((movie) => {
      const typeMatch =
        type === "all" || !type ? true : movie.Type === type;

      const yearMatch =
        year === "all" || !year ? true : movie.Year === year;

      return typeMatch && yearMatch;
    });
  }
);

// Watchlist count
export const selectWatchlistCount = (state) => {
  return state.user.watchlist.length;
};

// Favorites count
export const selectFavoritesCount = (state) => {
  return state.user.favorites.length;
};
