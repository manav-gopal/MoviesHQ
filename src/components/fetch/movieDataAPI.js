import axios from 'axios';

const apiKey = '75e4d71b41e04f2676aac7bb4d77872b';

// const apiKey = '75e4d71b41e04f2676aac7bb4d77872b';
const apiUrl = 'https://api.themoviedb.org/3/';
const fetchData = async (endpoint, params = {}) => {
    try {
        const response = await axios.get(`${apiUrl}${endpoint}`, { params: { api_key: apiKey, ...params } });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error.message);
        throw error;
    }
};

// const fetchMovieDetails = async (movieId) => await fetchData(`movie/${movieId}`);
const fetchMovieDetails = async (movieId) => {
    const data = await fetchData(`movie/${movieId}`)
    return data;
};
const fetchMovieCredits = async (movieId) => await fetchData(`movie/${movieId}/credits`);
const fetchMovieKeywords = async (movieId) => {
    const data = await fetchData(`movie/${movieId}/keywords`);
    return data.keywords;
};
const fetchMovieRecommendations = async (movieId) => {
    const data = await fetchData(`movie/${movieId}/recommendations`, { page: 1, language: 'en-US' });
    return data.results;
};
const fetchMovieReleaseDate = async (movieId) => {
    const data = await fetchData(`movie/${movieId}/release_dates`);
    const searchValues = ['US', 'IN'];
    for (const value of searchValues) {
        const index = data.results.findIndex(item => item.iso_3166_1 === value);
        if (index !== -1) {
            const filteredReleaseDates = data.results[index].release_dates.filter(release => release.certification !== "");
            if (filteredReleaseDates.length > 0) {
                data.results[index].release_dates = filteredReleaseDates;
                return data.results[index];
            }
        }
    }
};

const fetchMovieVideo = async (movieId) => {
    const data = await fetchData(`movie/${movieId}/videos`);
    const trailer = data.results.find(item => item.type === 'Trailer');
    return trailer ? trailer.key : null;
};
const fetchMovieNowPlaying = async () => await fetchData('movie/now_playing');
const fetchMovieTrending = async () => {
    const data = await fetchData('trending/movie/week', { language: 'en-US' });
    return (data.results)
};
const fetchMovieReviews = async (movieId) => {
    const data = await fetchData(`movie/${movieId}/reviews`)
    return (data.results)
};
const fetchMovieExternalIds = async (movieId) => {
    const data = await fetchData(`movie/${movieId}/external_ids`)
    return data;
};
const fetchMovieImages = async (movieId) => {
    const data = await fetchData(`movie/${movieId}/images`)
    return data;
};

export {
    fetchMovieDetails,
    fetchMovieCredits,
    fetchMovieKeywords,
    fetchMovieRecommendations,
    fetchMovieReleaseDate,
    fetchMovieVideo,
    fetchMovieNowPlaying,
    fetchMovieTrending,
    fetchMovieReviews,
    fetchMovieExternalIds,
    fetchMovieImages
}