export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  MOVIES: "/movies",
  MOVIE_GENRE: (genreId = ":genre_id") => `/movies/genre/${genreId}`,
  MOVIE_DETAILS: (movieId = ":id") => `/movies/details/${movieId}`,
  NOT_FOUND: "*",
};
