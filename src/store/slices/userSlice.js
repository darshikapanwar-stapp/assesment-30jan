import { createSlice } from "@reduxjs/toolkit";
import { loadFromStorage, saveToStorage } from "../../services/localstorage";

const userSlice = createSlice({
  name: "user",
  initialState: {
    watchlist: loadFromStorage("watchlist", []),
    favorites: loadFromStorage("favorites", []),
  },
  reducers: {
    addToWatchlist: (state, action) => {
      if (!state.watchlist.includes(action.payload)) {
        state.watchlist.push(action.payload);
        saveToStorage("watchlist", state.watchlist);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (id) => id !== action.payload,
      );
      saveToStorage("watchlist", state.watchlist);
    },
    toggleFavorite: (state, action) => {
      const movieId = action.payload;

      if (state.favorites.includes(movieId)) {
        state.favorites = state.favorites.filter((id) => id !== movieId);
      } else {
        state.favorites.push(movieId);
      }

      saveToStorage("favorites", state.favorites);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, toggleFavorite } =
  userSlice.actions;
export default userSlice.reducer;
