import { API_BASE_URL, API_KEY } from "../utils/constants";

export const searchMovies = async (
  searchTerm,
  page = 1,
  type = "",
  year = "",
) => {
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: searchTerm,
    page: page.toString(),
  });

  if (type && type !== "all") {
    params.append("type", type);
  }

  if (year && year !== "all") {
    params.append("y", year);
  }

  const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
};

export const getMovieDetails = async (imdbID) => {
  const params = new URLSearchParams({
    apikey: API_KEY,
    i: imdbID,
    plot: "full",
  });

  const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
};
