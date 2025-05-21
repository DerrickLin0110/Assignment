import { useNavigate } from 'react-router-dom';

const Genres = ({ genres }) => {
  const navigate = useNavigate();

  return (
    <div className="genreList">
      {genres.map(({ genre, id }) => (
        <button key={id} className="genreButton" onClick={() => navigate(`/movies/genre/${id}`)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Genres;
