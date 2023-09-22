import React, { useEffect, useState} from 'react';
import axios from 'axios';
import './style/Trending.scss';
import MovieCard from './card/moviecard/MovieCard';

const Trending = () => {
    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        const apiKey = '75e4d71b41e04f2676aac7bb4d77872b';

        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
            params: {
                api_key: apiKey,
            },
        };

        const fetchMovies = async () => {
            try {
                const response = await axios.request(options);
                setMovieData(response.data.results);
            } catch (error) {
                console.error('Failed to fetch data:', error.message);
            }
        };

        fetchMovies();
    }, []);
    
    if (movieData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className='trending-movies'>
            <h2>Trending Movies</h2>
            <div className="movie-list">
                {movieData.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Trending;
