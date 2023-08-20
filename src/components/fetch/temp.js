import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from './card/MovieCard';
import axios from 'axios';
import Navbar from './Navbar';
import './style/MovieDetails.scss';

function MovieDetail() {
    const { movieId, movieName } = useParams();

    const [movieDetails, setMovieDetails] = useState(null);
    const [movieCredits, setMovieCredits] = useState(null);
    const [movieKeywords, setMovieKeywords] = useState(null);
    const [movieRecommendations, setMovieRecommendations] = useState(null);

    useEffect(() => {
        const apiKey = '75e4d71b41e04f2676aac7bb4d77872b';

        // Fetching Details of Movie
        const details = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movieId}`,
            params: {
                api_key: apiKey,
            },
        };
        const fetchDetails = async () => {
            try {
                const response = await axios.request(details);
                const data = response.data;
                setMovieDetails(data);
                console.log('Details : ', data);
            } catch (error) {
                console.error('Failed to fetch data:', error.message);
            }
        };

        // Fetching Credits of Movie
        const credits = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
            params: {
                api_key: apiKey,
            },
        };
        const fetchCredits = async () => {
            try {
                const response = await axios.request(credits);
                const data = response.data;
                const slicedData = data.cast.slice(0, 9);
                setMovieCredits(data);
                console.log('Credits : ', slicedData);
            } catch (error) {
                console.error('Failed to fetch data:', error.message);
            }
        };

        // Fetching Keywords of Movie
        const keywords = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movieId}/keywords`,
            params: {
                api_key: apiKey,
            },
        };
        const fetchKeywords = async () => {
            try {
                const response = await axios.request(keywords);
                const data = response.data.keywords;
                setMovieKeywords(data);
                console.log('Keywords : ', data);
            } catch (error) {
                console.error('Failed to fetch data:', error.message);
            }
        };

        // Fetching Recommendation of Movie
        const recommendations = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movieId}/recommendations`,
            params: {
                api_key: apiKey,
                page: 1,
                languege: 'en-US',
            },
        };
        const fetchRecommendations = async () => {
            try {
                const response = await axios.request(recommendations);
                const data = response.data.results;
                setMovieRecommendations(data);
                console.log('Recommendations : ', data);
            } catch (error) {
                console.error('Failed to fetch data:', error.message);
            }
        };



        fetchDetails();
        // fetchCredits();
        // fetchKeywords();
        // fetchRecommendations();
    }, [movieName, movieId]);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className='nav-cover'></div>
            <div className='movies-detail'>
                <div className='bg-wrapper'>
                    <h1>MovieDetail</h1>
                    <div className='poster-wrapper'>
                        <img alt="Not found" />
                    </div>
                    <MovieCard movie={movieDetails} />
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
