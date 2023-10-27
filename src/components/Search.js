import React, { useEffect, useState} from 'react';
import axios from 'axios';
import './style/MoviesNow.scss';
import MovieCard from '../components/card/moviecard/MovieCard';
import { useSelector } from 'react-redux';

const Search = () => {
    const [movieData, setMovieData] = useState([]);
    const data = useSelector((state) => state.searchSliceReducer.searchItem);
    console.log(data);
    
    useEffect(() => {
        const apiKey = '75e4d71b41e04f2676aac7bb4d77872b';

        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/movie',
            params: {
                api_key: apiKey,
                query: data,
                language: 'en-US',
                page: 1,
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
    }, [data]);
    
    if (movieData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className='trending-movies'>
            <h1 style={{paddingLeft:"20px"}}>Search results for '<span style={{color:'#7752FE', textTransform:"capitalize"}}>{data}</span>'</h1>
            <div className="movie-list">
                {movieData.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Search;