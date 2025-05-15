import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const GenreView = () => {
    const [movieData, setMovieData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [done, setDone] = useState(false);
    const params = useParams();
    const navigate = useNavigate(); 


    const getMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${params.genre_id}&api_key=8f6b66151382fcec26ea698d54fb6870`);
            setMovieData(response.data.results);
            setTotalPages(response.data.total_pages);
            if (totalPages >= 500) {
                setTotalPages(500);
            }
            setDone(true);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        getMovies(); 
    }, [params.genre_id, page]); 

    const movePage = (x) => {
        setDone(false);
        if (page + x >= totalPages) {
            setPage(totalPages);
        } else if (page + x <= 1) {
            setPage(1);
        } else {
            setPage(page + x);
        }
    };

    const setCurrentPage = (x) => {
        setDone(false);
        if (x >= totalPages) {
            setPage(totalPages);
        } else {
            setPage(x);
        }
    };

    const handleGenreClick = (genreId) => {
        navigate(`/genres/${genreId}`);
    };

    return (
        <div className="genre-view">
            
            <div className="movie-container">
                {movieData.map((movie) => (
                    <a key={movie.id} href={`/movies/details/${movie.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    </a>
                ))}
            </div>

            <div>
                <button onClick={() => setCurrentPage(1)}>1</button>
                <button onClick={() => movePage(-1)}>{"<"}</button>
                <span>{page}</span>
                <button onClick={() => movePage(1)}>{">"}</button>
                <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
            </div>
        </div>
    );
};

export default GenreView;
