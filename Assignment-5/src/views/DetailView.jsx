import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DetailView() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=8f6b66151382fcec26ea698d54fb6870&append_to_response=videos`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    getMovieDetails();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const trailer = movie.videos.results.find(video => video.type === "Trailer");

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      <p>Runtime: {movie.runtime} min</p>
      <p>Language: {movie.original_language}</p>

      {trailer && (
        <div>
          <h3>Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            frameBorder="0"
            allowFullScreen
            title="Movie Trailer"
          />
        </div>
      )}
    </div>
  );
}

export default DetailView;