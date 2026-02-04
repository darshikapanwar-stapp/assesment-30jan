export const API_BASE_URL = "https://www.omdbapi.com";
export const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const MOVIE_TYPES = {
  ALL: "all",
  MOVIE: "movie",
  SERIES: "series",
  EPISODE: "episode",
};

export const YEARS = [
  "all",
  ...Array.from({ length: 35 }, (_, i) => (2024 - i).toString()),
];

export const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/300x450?text=No+Poster";
