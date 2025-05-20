import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStoreContext } from "../Context";
import "./GenreView.css";

const GenreView = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { genre_id } = useParams();
  const navigate = useNavigate();
  const { cart, setCart } = useStoreContext();

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre_id}&api_key=${import.meta.env.VITE_TMDB_KEY}`
        );
        setMovies(res.data.results);
        setTotalPages(Math.min(res.data.total_pages, 500));
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [genre_id, page]);

  const handleBuy = (movie) => {
    setCart((prev) => new Map(prev.set(movie.id, movie)));
  };

  return (
    <div className="genre-view">
      {loading && <p>Loading...</p>}

      <div className="movie-container">
        {movies.map((movie) => (
          <div className="movieBox" key={movie.id}>
            <div
              className="movieCard"
              onClick={() => navigate(`/movies/details/${movie.id}`)}
            >
              <h3>{movie.title}</h3>
              <img
                className="moviePoster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <button
              className="buyButtons"
              onClick={() => handleBuy(movie)}
            >
              {cart.has(movie.id) ? "Added" : "Buy"}
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(1)}
        >
          First
        </button>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>{`Page ${page} of ${totalPages}`}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(totalPages)}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default GenreView;
