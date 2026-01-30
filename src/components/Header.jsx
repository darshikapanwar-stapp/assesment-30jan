import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import {
  selectWatchlistCount,
  selectFavoritesCount,
} from "../store/selectors";

export default function Header() {
  const watchlistCount = useSelector(selectWatchlistCount);
  const favoritesCount = useSelector(selectFavoritesCount);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          🎬 MovieDB
        </Link>

        {/* Navigation */}
        <nav className="nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/watchlist">
            Watchlist ({watchlistCount})
          </NavLink>
          <NavLink to="/favorites">
            Favorites ({favoritesCount})
          </NavLink>
        </nav>

        {/* Search */}
        <SearchBar />
      </div>
    </header>
  );
}
