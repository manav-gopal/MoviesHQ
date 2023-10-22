import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from './MovieDetails';
import {
    fetchMovieDetails,
    fetchMovieReleaseDate,
    fetchMovieCredits,
    fetchMovieVideo,
    fetchMovieKeywords,
    fetchMovieRecommendations,
    fetchMovieReviews,
    fetchMovieExternalIds
} from '../../fetch/movieDataAPI';
import Spinner from '../../Spinner';

function MovieDetailContainer() {
    const { movieId, movieName } = useParams();

    const [dataFetched, setDataFetched] = useState(false);
    const [movieDetails, setMovieDetails] = useState(null);
    const [movieCredits, setMovieCredits] = useState(null);
    const [movieKeywords, setMovieKeywords] = useState(null);
    const [movieRecommendations, setMovieRecommendations] = useState(null);
    const [movieReleaseDates, setMovieReleaseDate] = useState(null);
    const [movieVideo, setMovieVideo] = useState(null);
    const [movieReviews, setMovieReviews] = useState(null);
    const [movieExternalIds, setMovieExternalIds] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [details, credits, keywords, recommendations, release_dates, video, reviews, external_ids] = await Promise.all([
                    fetchMovieDetails(movieId),
                    fetchMovieCredits(movieId),
                    fetchMovieKeywords(movieId),
                    fetchMovieRecommendations(movieId),
                    fetchMovieReleaseDate(movieId),
                    fetchMovieVideo(movieId),
                    fetchMovieReviews(movieId),
                    fetchMovieExternalIds(movieId),
                ]);
                setDataFetched(false)
                setMovieDetails(details);
                setMovieCredits(credits);
                setMovieKeywords(keywords);
                setMovieRecommendations(recommendations);
                setMovieReleaseDate(release_dates);
                setMovieVideo(video);
                setMovieReviews(reviews);
                setMovieExternalIds(external_ids);
                setDataFetched(true);

                 // Scroll to the top of the page
                 window.scrollTo(0, 0);
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
                movieReviews={movieReviews}
                movieExternalIds={movieExternalIds}
            />
        ) : (
            <Spinner />
        )
    );
}

export default MovieDetailContainer;
