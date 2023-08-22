import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../MovieDetails';
import {
    fetchMovieDetails,
    fetchMovieReleaseDate,
    fetchMovieCredits,
    fetchMovieVideo,
    fetchMovieKeywords,
    fetchMovieRecommendations
} from '../fetch/movieDataAPI';
import Spinner from '../Spinner';

function MovieDetailContainer() {
    const { movieId, movieName } = useParams();

    const [dataFetched, setDataFetched] = useState(false);
    const [movieDetails, setMovieDetails] = useState(null);
    const [movieCredits, setMovieCredits] = useState(null);
    const [movieKeywords, setMovieKeywords] = useState(null);
    const [movieRecommendations, setMovieRecommendations] = useState(null);
    const [movieReleaseDates, setMovieReleaseDate] = useState(null);
    const [movieVideo, setMovieVideo] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [details, credits, keywords, recommendations, release_dates, video] = await Promise.all([
                    fetchMovieDetails(movieId),
                    fetchMovieCredits(movieId),
                    fetchMovieKeywords(movieId),
                    fetchMovieRecommendations(movieId),
                    fetchMovieReleaseDate(movieId),
                    fetchMovieVideo(movieId),
                ]);
                setDataFetched(false)
                setMovieDetails(details);
                setMovieCredits(credits);
                setMovieKeywords(keywords);
                setMovieRecommendations(recommendations);
                setMovieReleaseDate(release_dates);
                setMovieVideo(video);
                setDataFetched(true);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [movieId, movieName]);

    return (
        dataFetched ? (
            <MovieDetail
                movieDetails={movieDetails}
                movieReleaseDates={movieReleaseDates}
                movieCredits={movieCredits}
                movieKeywords={movieKeywords}
                movieVideo={movieVideo}
                movieRecommendations={movieRecommendations}
            />
        ) : (
            <Spinner />
        )
    );
}

export default MovieDetailContainer;
