import React from 'react';
import { Link } from 'react-router-dom';

function Genres({ genres }) {
  return (
    <div className="genres section">
      {genres.map(genre => (
        <Link key={genre.id} to={`/movies/genre/${genre.id}`}>
          <button>{genre.genre}</button>
        </Link>
      ))}
    </div>
  );
}

export default Genres;
