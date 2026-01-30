import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../store/slices/moviesSlice";

export default function Pagination({ totalResults }) {
  const dispatch = useDispatch();

  const { currentPage } = useSelector((state) => state.movies);

  const totalPages = Math.ceil(totalResults / 10);

  if (currentPage >= totalPages) {
    return null;
  }

  const handleLoadMore = () => {
    dispatch(setCurrentPage(currentPage + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pagination">
      <button className="load-more-btn" onClick={handleLoadMore}>
        Load More
      </button>

      <p className="page-info">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}
