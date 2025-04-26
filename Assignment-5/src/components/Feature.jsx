import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

function Feature() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getNowPlaying() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=8f6b66151382fcec26ea698d54fb6870`);
        const randomMovies = response.data.results.sort(() => 0.5 - Math.random()).slice(0, 3);
        setMovies(randomMovies);
      } catch (error) {
        console.error('Error fetching now playing movies:', error);
      }
    }

    getNowPlaying();
  }, []);

  return (
    <section>
      <h2>Featured Movies</h2>
      <div style={{ display: "flex", gap: "10px" }}>
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
    </section>
  );
}

export default Feature;