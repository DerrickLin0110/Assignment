import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = '8f6b66151382fcec26ea698d54fb6870';

function GenreView() {
  const { genre_id } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre_id}`)
      .then(response => {
        setMovies(response.data.results.slice(0, 20));
      })
      .catch(error => {
        console.error('Error fetching genre movies:', error);
      });
  }, [genre_id]);

  return (
    <div className="genre-view">
      <h2>Movies</h2>
      <div className="movie-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie">
            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenreView;
