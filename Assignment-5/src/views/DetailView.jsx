import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./DetailView.css";

const DetailView = () => {
    const [movieData, setMovieData] = useState({});
    const [trailers, setTrailers] = useState([]);
    const [done, setDone] = useState(false);
    const params = useParams();

    // Fetch the movie details and trailers
    const getMovieData = async () => {
        try {
            // Fetch movie details
            const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?language=en-US&api_key=8f6b66151382fcec26ea698d54fb6870`);

            // Fetch the trailers of the movie
            const trailerData = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}/videos?language=en-US&api_key=8f6b66151382fcec26ea698d54fb6870`);

            // Set the movie data and trailers
            setMovieData(movieDetails.data);
            setTrailers(trailerData.data.results);
            setDone(true);
        } catch (error) {
            console.log("Error fetching movie or video data", error);
        }
    };

    useEffect(() => {
        getMovieData();
    }, [params.id]); // Fetch data when the movie ID changes

    // Filter trailers to only include "Trailer" type
    const trailerList = trailers.filter(video => video.type === "Trailer");

    return (
        <div className="detail-view">
            <h2>{movieData.title}</h2>
            <div>
                <h3>Original Title:</h3>
                <p>{movieData.original_title}</p>
            </div>
            <div>
                <h3>Release Date:</h3>
                <p>{movieData.release_date}</p>
            </div>
            <div>
                <h3>Overview:</h3>
                <p>{movieData.overview}</p>
            </div>
            <div>
                <h3>Popularity:</h3>
                <p>{movieData.popularity}</p>
            </div>
            <div>
                <h3>Vote Average:</h3>
                <p>{movieData.vote_average}</p>
            </div>
            <div>
                <h3>Vote Count:</h3>
                <p>{movieData.vote_count}</p>
            </div>
            <div>
                <h3>Spoken Languages:</h3>
                {movieData.spoken_languages?.map((lang) => (
                    <p key={lang.name}>{lang.name}</p>
                ))}
            </div>

            {/* Display Trailers */}
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


