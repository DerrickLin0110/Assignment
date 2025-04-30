import { ROUTES } from '../constants/path';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; 

const Genres = ({ genres }) => {
  const navigate = useNavigate();

  return (
    <div>
      {genres.map((genre) => (
        <button
          key={genre.id}
          className="genre-button"
          onClick={() => navigate(ROUTES.MOVIE_GENRE(genre.id))}
        >
          {genre.genre}
        </button>
      ))}
    </div>
  );
};
export default Genres;
