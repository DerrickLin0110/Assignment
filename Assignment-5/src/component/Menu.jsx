import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Header = () => {
    return (
        <div className="logo">
            <h1>StreamFix</h1>
            <div className="button">
                <button className="LoginBtm">Log in</button>
                <button className="Register">Register</button>
            </div>
        </div>
    );
};

const Hero = () => {
    return (
        <div className="hero section">
            <img src="bg.avif" alt="background" />
            <h2>Unlimited Free movies, TV shows, and more.</h2>
            <p>Starts at $2.99. Cancel anytime (Cheaper Than Netflix haha).</p>
        </div>
    );
};

const Feature = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
                    params: {
                        api_key: 'YOUR_API_KEY',
                        language: 'en-US',
                        page: 1
                    }
                });
                const randomMovies = response.data.results.slice(0, 3);
                setMovies(randomMovies);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
       
        fetchMovies();
    }, []);

    return (
        <div className="feature section">
            <div className="movie-list">
                {movies.map((movie) => (
                    <div className="movie" key={movie.id}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <p>{movie.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <div className="footer section">
            <p>&copy;2025 StreamFix. All rights reserved</p>
        </div>
    );
};

const App = () => {
    return (
        <div>
            <Header />
            <Hero />
            <Feature />
            <Footer />
        </div>
    );
};

export default App;