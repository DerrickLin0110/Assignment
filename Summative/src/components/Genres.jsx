// Genres.jsx
import { Link, useParams } from "react-router-dom";


const Genres = ({ genres }) => {
  const { genre_id } = useParams();

  return (
    <div className="genre-list">
      <h3>Genres</h3>
      {genres.map(({ genre, id }) => (
        <Link
          key={id}
          to={`/movies/genres/${id}`}
          className={`genre-button ${parseInt(genre_id) === id ? 'active' : ''}`}
        >
          {genre}
        </Link>
      ))}
    </div>
  );
};

export default Genres;
