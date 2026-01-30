import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchMovies, getMovieDetails } from "../../services/api";

/**
 * Fetch movies based on search + filters + page
 */
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ searchTerm, page, type, year }) => {
    const data = await searchMovies(searchTerm, page, type, year);
    return data;
  },
);

/**
 * Fetch single movie details by imdbID
 */
export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (imdbID) => {
    const data = await getMovieDetails(imdbID);
    return data;
  },
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    searchResults: [],
    movieDetails: {},
    loading: false,
    error: null,
    totalResults: 0,
    currentPage: 1,
  },
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
      state.totalResults = 0;
      state.currentPage = 1;
      state.error = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔄 Fetch movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.Search || [];
        state.totalResults = Number(action.payload.totalResults) || 0;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🎬 Fetch movie details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetails[action.payload.imdbID] = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSearch, setCurrentPage } = moviesSlice.actions;
export default moviesSlice.reducer;
