import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./DetailView.css";

const DetailView = () => {
  const [movieData, setMovieData] = useState({});
  const [trailers, setTrailers] = useState([]);
  const params = useParams();

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const movieDetails = await axios.get(
          `https://api.themoviedb.org/3/movie/${params.id}?language=en-US&api_key=8f6b66151382fcec26ea698d54fb6870`
        );

        const trailerData = await axios.get(
          `https://api.themoviedb.org/3/movie/${params.id}/videos?language=en-US&api_key=8f6b66151382fcec26ea698d54fb6870`
        );

        setMovieData(movieDetails.data);
        setTrailers(trailerData.data.results);
      } catch (error) {
        console.error("Error fetching movie or video data", error);
      }
    };

    getMovieData();
  }, [params.id]);

  const trailerList = trailers.filter((video) => video.type === "Trailer");

  return (
    <div className="detail-view">
      <h2>{movieData.title}</h2>
      <div>
        <h3>Original Title:</h3>
        <p>{movieData.original_title}</p>
      </div>
      {/* Additional movie data goes here */}
      <div>
        <h3>Trailers:</h3>
        {trailerList.length > 0 ? (
          trailerList.map((video) => (
            <iframe
              key={video.id}
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              allowFullScreen
            />
          ))
        ) : (
          <p>No trailers available for this movie.</p>
        )}
      </div>
    </div>
  );
};

export default DetailView;
