import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

function GenreView() {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMoviesByGenre() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY_HERE&with_genres=8f6b66151382fcec26ea698d54fb6870`);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
      }
    }

    getMoviesByGenre();
  }, [genreId]);

  return (
    <div>
      <h2>Genre Movies</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {movies.map(movie => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenreView;