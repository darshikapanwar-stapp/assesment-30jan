import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { setSearchTerm } from "../store/slices/filtersSlice";
import { fetchMovies, clearSearch, setCurrentPage } from "../store/slices/moviesSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (debouncedValue.trim() === "") {
      dispatch(clearSearch());
      return;
    }

    dispatch(setSearchTerm(debouncedValue));
    dispatch(setCurrentPage(1));

    dispatch(
      fetchMovies({
        searchTerm: debouncedValue,
        page: 1,
        type: "all",
        year: "all",
      }),
    );

    navigate("/search");
  }, [debouncedValue, dispatch, navigate]);

  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="search-input"
    />
  );
}
