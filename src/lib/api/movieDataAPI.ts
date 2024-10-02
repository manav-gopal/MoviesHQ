import type {
  MovieImageResponse,
  MovieReviewResponse,
  NowPlayingMoviesResponse,
  Movie,
  MoviesTrendingResponse,
  MovieVideosResponse,
  ReleaseDatesResponse,
  MoviesRecommendationsResponse,
  MovieDetailsResponse,
  MovieCreditsResponse,
  MovieKeywordsResponse,
  Keyword,
  MovieExternalIdsResponse,
} from "@/types/movieDataAPI.types";
import axios, { AxiosError } from "axios";
import { fetchWithCache } from "./fetchWithCache";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;

const fetchData = async <T>(endpoint: string, params = {}, retries = 3): Promise<T> => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`, {
      params: { api_key: API_KEY, ...params },
      timeout: 10000,
    });
    return response.data as T;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (retries > 0) {
        console.log(`Retrying ${endpoint}. Attempts left: ${retries - 1}`);
        return fetchData(endpoint, params, retries - 1);
      }
      console.error(`Axios error in fetching ${endpoint}:`, error.message);
    } else {
      console.error(`Unexpected error in fetching ${endpoint}:`, error);
    }
    throw error;
  }
};

const fetchMovieDetails = async (movieId: number): Promise<MovieDetailsResponse> => {
    const endpoint = `movie/${movieId}`;
    return await fetchWithCache<MovieDetailsResponse>(
        API_URL + endpoint,
        async () => await fetchData<MovieDetailsResponse>(endpoint)
    );
};

const fetchMovieCredits = async (movieId: number): Promise<MovieCreditsResponse> => {
    const endpoint = `movie/${movieId}/credits`;
    return await fetchWithCache<MovieCreditsResponse>(
        API_URL + endpoint,
        async () => await fetchData<MovieCreditsResponse>(endpoint)
    );
};

const fetchMovieKeywords = async (movieId: number): Promise<Keyword[]> => {
    const endpoint = `movie/${movieId}/keywords`;
    const response = await fetchWithCache<MovieKeywordsResponse>(
        API_URL + endpoint,
        async () => await fetchData<MovieKeywordsResponse>(endpoint)
    );
    return response.keywords;
};
const fetchMovieRecommendations = async (movieId: number): Promise<Movie[]> => {
    const endpoint = `movie/${movieId}/recommendations`;
    const response = await fetchWithCache<MoviesRecommendationsResponse>(
        API_URL + endpoint,
        async () => {
            const data = await fetchData<MoviesRecommendationsResponse>(endpoint, { page: 1, language: 'en-US' });
            return data;
        }
    );
    return response.results;
};
const fetchMovieReleaseDate = async (movieId: number) => {
    const endpoint = `movie/${movieId}/release_dates`;
    const response = await fetchWithCache<ReleaseDatesResponse>(
        API_URL + endpoint,
        async () => {
            const data = await fetchData<ReleaseDatesResponse>(endpoint);
            return data;
        }
    );

    const searchValues = ['US', 'IN'];
    for (const value of searchValues) {
        const result = response.results.find(item => item.iso_3166_1 === value);
        if (result) {
            const filteredReleaseDates = result.release_dates.filter(release => release.certification !== "");
            if (filteredReleaseDates.length > 0) {
                return {
                    ...result,
                    release_dates: filteredReleaseDates
                };
            }
        }
    }
    return null;
};

const fetchMovieVideo = async (movieId: number) => {
  const endpoint = `movie/${movieId}/videos`;
  const response = await fetchWithCache<MovieVideosResponse>(
    API_URL + endpoint,
    async () => {
      const data = await fetchData<MovieVideosResponse>(endpoint);
      return data;
    }
  );
  const trailer = response.results.find(item => item.type === 'Trailer');
  return trailer ? trailer.key : null;
};
const fetchMovieNowPlaying = async () => {
const endpoint = "movie/now_playing";
const response = await fetchWithCache<NowPlayingMoviesResponse>(
    API_URL+endpoint,
    async () => {
        const data: NowPlayingMoviesResponse = await fetchData(endpoint);
        return data;
    }
);
  return response;
};
const fetchMovieTrending = async (): Promise<MoviesTrendingResponse> => {
  const endpoint = "trending/movie/week";
  const response = await fetchWithCache<MoviesTrendingResponse>(
    API_URL + endpoint,
    async () => {
      const data = await fetchData<MoviesTrendingResponse>(endpoint, {
        language: "en-US",
      });
      return data;
    },
  );
  return response;
};
const fetchMovieReviews = async (movieId: number) => {
  const endpoint = `movie/${movieId}/reviews`;
  const response = await fetchWithCache<MovieReviewResponse>(
    API_URL + endpoint,
    async () => {
      const data = await fetchData<MovieReviewResponse>(endpoint, {
        language: "en-US",
      });
      return data;
    },
  );
  return response.results;
};
const fetchMovieExternalIds = async (movieId: number): Promise<MovieExternalIdsResponse> => {
  const endpoint = `movie/${movieId}/external_ids`;
  const response = await fetchWithCache<MovieExternalIdsResponse>(
    API_URL + endpoint,
    async () => {
      const data = await fetchData<MovieExternalIdsResponse>(endpoint);
      return data;
    }
  );
  return response;
};
const fetchMovieImages = async (movieId: number) => {
  const endpoint = `movie/${movieId}/images`;
  const response = await fetchWithCache<MovieImageResponse>(
    API_URL + endpoint,
    async () => {
      const data = await fetchData<MovieImageResponse>(endpoint);
      return data;
    }
  );
  return response;
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
  fetchMovieImages,
};
