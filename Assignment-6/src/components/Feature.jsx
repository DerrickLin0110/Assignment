import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
const API_KEY = '8f6b66151382fcec26ea698d54fb6870';

function Feature() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
      .then(response => {
        setMovies(response.data.results.slice(0, 3)); 
      })
      .catch(error => {
        console.error('Error fetching now playing movies:', error);
      });
  }, []);

  return (
    <div className="feature section">
      <div className="movie-list">
        {movies.map(movie => (
          <div className="movie" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feature;
