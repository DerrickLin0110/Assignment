import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DetailView() {
    const param = useParams();
    const [movie, setMovie] = useState({});
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const movieData = (await axios.get(`https://api.themoviedb.org/3/movie/${param.id}?api_key=${import.meta.env.VITE_TMDB_KEY}`)).data;
                setMovie(movieData);

                const videoData = (await axios.get(`https://api.themoviedb.org/3/movie/${param.id}/videos?language=en-US&api_key=${import.meta.env.VITE_TMDB_KEY}`)).data.results;
                setVideos(videoData);
            } catch (error) {
                console.log("Error fetching movie or video data", error);
            }
        }

        getData();
    }, [param.id]);

    return (
        <div>
            <h2>Title: {movie.title}</h2>
            <h3>Tagline: {movie.tagline}</h3>
            {movie.poster_path && (
                <img key={movie.id} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            )}

            <h2>Trailers</h2>
            {videos && videos.filter(video => video.type.toLowerCase() === "trailer").map(video => (
                <iframe 
                    key={video.key} 
                    width="420" 
                    height="315" 
                    src={`https://www.youtube.com/embed/${video.key}`} 
                    title={video.name} 
                    allowFullScreen 
                />
            ))}

            <h2>Release Date: {movie.release_date}</h2>
            <h2>Runtime: {movie.runtime} minutes</h2>
            <h2>Original Language: {movie.original_language}</h2>
            
            <h2>Spoken Languages:</h2>
            {movie.spoken_languages && movie.spoken_languages.map((lang) => (
                <li key={lang.name}>{lang.name}</li>
            ))}
            
            <h2>Genres:</h2>
            {movie.genres && movie.genres.map((genre) => (
                <li key={genre.name}>{genre.name}</li>
            ))}
            
            <h2>Production Companies:</h2>
            {movie.production_companies && movie.production_companies.map((company) => (
                <li key={company.name}>{company.name}</li>
            ))}
            
            <h2>Production Countries:</h2>
            {movie.production_countries && movie.production_countries.map((country) => (
                <li key={country.name}>{country.name}</li>
            ))}
        </div>
    );
}

export default DetailView;
