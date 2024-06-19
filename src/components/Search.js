import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/MoviesNow.scss';
import MovieCard from '../components/card/moviecard/MovieCard';
import { useSelector } from 'react-redux';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.API_KEY_GENAI || "AIzaSyA2-UbLcwAeCYbStedbY9oK40bKe4srCOQ");

const Search = () => {
    const [movieData, setMovieData] = useState([]);
    const data = useSelector((state) => state.searchSliceReducer.searchItem);
    const data2 = useSelector((state) => state.searchSliceReducer.searchItem2);
    console.log(data2);

    useEffect(() => {
        const apiKey = '75e4d71b41e04f2676aac7bb4d77872b';

        // const options = {
        //     method: 'GET',
        //     url: 'https://api.themoviedb.org/3/search/movie',
        //     params: {
        //         api_key: apiKey,
        //         query: data,
        //         language: 'en-US',
        //         page: 1,
        //     },
        // };

        // const fetchMovies = async () => {
        //     try {
        //         const response = await axios.request(options);
        //         setMovieData(response.data.results);
        //     } catch (error) {
        //         console.error('Failed to fetch data:', error.message);
        //     }
        // };

        // fetchMovies();

        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `"User Input: ${data2}.

        Gemini AI, please provide the TMDB API to:
        
        - Retrieve information about a movie

        API link examples:

        1. Discover Movies:
        - Full Link: https://api.themoviedb.org/3/discover/movie
        2. Get Movie Details:
        - Full Link: https://api.themoviedb.org/3/movie/{movie_id}
        3. Search for Movies:
        - Full Link: https://api.themoviedb.org/3/search/movie
        4. Discover TV Shows:
        - Full Link: https://api.themoviedb.org/3/discover/tv
        5. Get TV Show Details:
        - Full Link: https://api.themoviedb.org/3/tv/{tv_id}
        6. Search for TV Shows:
        - Full Link: https://api.themoviedb.org/3/search/tv
        7. Get Person Details:
        - Full Link: https://api.themoviedb.org/3/person/{person_id}
        8. Search for People (Actors, Crew):
        - Full Link: https://api.themoviedb.org/3/search/person
        
        list of movie genres with their corresponding IDs:(importent)
        1. Action (ID: 28)
        2. Adventure (ID: 12)
        3. Animation (ID: 16)
        4. Comedy (ID: 35)
        5. Crime (ID: 80)
        6. Documentary (ID: 99)
        7. Drama (ID: 18)
        8. Family (ID: 10751)
        9. Fantasy (ID: 14)
        10. History (ID: 36)
        11. Horror (ID: 27)
        12. Music (ID: 10402)
        13. Mystery (ID: 9648)
        14. Romance (ID: 10749)
        15. Science Fiction (ID: 878)
        16. TV Movie (ID: 10770)
        17. Thriller (ID: 53)
        18. War (ID: 10752)
        19. Western (ID: 37)
        use the above with queries like this:
        (https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_genres=35&include_adult=false&include_video=false&page=1)

        if user asks for the regional data use region queries:(important)
        1. United States (US)
        2. United Kingdom (GB)
        3. India (IN)
        4. China (CN)
        5. Japan (JP)
        6. France (FR)
        7. Germany (DE)
        8. South Korea (KR)
        9. Canada (CA)
        10. Australia (AU)
        and more like this.
        also add the query for their regional languages like hi,en and more.

        always give compleat and single link.
        dont add the api key params.
        This should be in Text formate.
        dont add api key in its query parameter.
        if he trying to find movie by genre then find api that fulfills the users demand.
      
        return should be api link only.
        
        "`;

        const fetchMoviesAI = async () => {
            try {
                const result = await model.generateContent(prompt);
                const geminiRes = await result.response;
                const text = geminiRes.text();
                console.log(text);

                const options2 = {
                    method: 'GET',
                    url: `${text}`,
                    params: {
                        api_key: apiKey,
                        language: 'en-US',
                        page: 1,
                    },
                };
                const response = await axios.request(options2);
                console.log("gemini res", response);
                setMovieData(response.data.results);
            } catch (error) {
                console.error('Failed to fetch data:', error.message);
            }
        };
        fetchMoviesAI();
        window.scroll(0, 0);
    }, [data, data2]);

    if (movieData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className='trending-movies'>
            <div className="movie-list">
                {movieData.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Search;