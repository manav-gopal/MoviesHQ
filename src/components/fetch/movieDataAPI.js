import axios from 'axios';

const apiKey = '75e4d71b41e04f2676aac7bb4d77872b';

// Fetch Movie Details
async function fetchMovieDetails(movieId) {
    const url_link = `https://api.themoviedb.org/3/movie/${movieId}`;
    const options = {
        method: 'GET',
        url: url_link,
        params: {
            api_key: apiKey,
        },
    }
    try {
        const response = await axios(options);
        const data = response.data;
        console.log('Movie Details:', data); // Log the data
        return data;
    } catch (error) {
        console.error('Failed to fetch movie details:', error.message);
        throw error;
    }
}

// Fetch Movie Credits
async function fetchMovieCredits(movieId) {
    const url_link = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
    const options = {
        method: 'GET',
        url: url_link,
        params: {
            api_key: apiKey
        },
    }
    try {
        const response = await axios(options);
        const data = response.data;
        // console.log('Movie Credits:', data); // Log the data
        return data;
    } catch (error) {
        console.error('Failed to fetch movie credits:', error.message);
        throw error;
    }
}

// Fetch Movie Keywords
async function fetchMovieKeywords(movieId) {
    const url_link = `https://api.themoviedb.org/3/movie/${movieId}/keywords`;
    const options = {
        method: 'GET',
        url: url_link,
        params: {
            api_key: apiKey
        },
    }
    try {
        const response = await axios(options);
        const data = response.data.keywords;
        // console.log('Movie Keywords:', data); // Log the data
        return data;
    } catch (error) {
        console.error('Failed to fetch movie keywords:', error.message);
        throw error;
    }
}

// Fetch Movie Recommendation
async function fetchMovieRecommendations(movieId) {
    const url_link = `https://api.themoviedb.org/3/movie/${movieId}/recommendations`;
    const options = {
        method: 'GET',
        url: url_link,
        params: {
            api_key: apiKey,
            page: 1,
            language: 'en-US',
        },
    }
    try {
        const response = await axios(options);
        const data = response.data.results;
        // console.log('Movie Recommendations:', data); // Log the data
        return data;
    } catch (error) {
        console.error('Failed to fetch movie recommendations:', error.message);
        throw error;
    }
}

// Fetch Movie Release Date
async function fetchMovieReleaseDate(movieId) {
    const url_link = `https://api.themoviedb.org/3/movie/${movieId}/release_dates`;
    const options = {
        method: 'GET',
        url: url_link,
        params: {
            api_key: apiKey,
        },
    }
    try {
        const response = await axios(options);
        const data = response.data.results;

        const searchValues = ['US', 'IN']; // Search values in the desired order - From Left to Right
        let index = 0;

        for (const searchValue of searchValues) {
            let temp = -1;
            temp = data.findIndex(item => item.iso_3166_1 === searchValue);
            if (temp !== -1) {
                //! To Remove the Empty certification Elements
                const releaseDates = data[temp].release_dates;
                if (releaseDates.length > 0) { //* Check cause some time the array is empty
                    const filteredReleaseDates = releaseDates.filter(release => release.certification !== "");
                    if (filteredReleaseDates.length > 0) { //* Check cause some times no element has certification
                        data[temp].release_dates = filteredReleaseDates; //* Update the array without empty certifications
                        index = temp; // Now Assigne the valid index to index
                        // console.log(`Search value: ${searchValue}, temp: ${temp}`, index);
                    }
                }
            }
        }
        const finalData = data[index];
        // console.log('Movie Release data:', finalData); // Log the data
        return finalData;
    } catch (error) {
        console.error('Failed to fetch movie release date:', error.message);
        throw error;
    }
}
async function fetchMovieVideo(movieId) {
    const url_link = `https://api.themoviedb.org/3/movie/${movieId}/videos`;
    const options = {
        method: 'GET',
        url: url_link,
        params: {
            api_key: apiKey,
        },
    }
    try {
        const response = await axios(options);
        const data = response.data.results;
        const filter = data.filter(item => item.type === 'Trailer')
        // console.log('Movie videos:', filter); // Log the data
        return filter[0].key;
    } catch (error) {
        console.error('Failed to fetch movie videos:', error.message);
        throw error;
    }
}


export { 
    fetchMovieDetails,
    fetchMovieCredits,
    fetchMovieKeywords,
    fetchMovieRecommendations,
    fetchMovieReleaseDate,
    fetchMovieVideo
}