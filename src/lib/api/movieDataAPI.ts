import axios from "axios";
import { fetchWithCache } from "./fetchWithCache";
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

const API_BASE_URL = "/api/main";

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_PROD_URL ?? 'http://localhost:3000';
  }
  return process.env.NEXT_PUBLIC_DEV_URL ?? 'http://localhost:3000';
};

const fetchFromAPI = async <T>(action: string, id?: number, params = {}): Promise<T> => {
  const baseUrl = getBaseUrl();
  const url = new URL(API_BASE_URL, baseUrl);
  url.searchParams.append("action", action);
  if (id) url.searchParams.append("id", id.toString());

  const response = await axios.get(url.toString(), { params });
  return response.data as T;
};

const fetchMovieDetails = async (movieId: number): Promise<MovieDetailsResponse> => {
  return fetchWithCache<MovieDetailsResponse>(
    `movieDetails_${movieId}`,
    () => fetchFromAPI<MovieDetailsResponse>("details", movieId)
  );
};

const fetchMovieCredits = async (movieId: number): Promise<MovieCreditsResponse> => {
  return fetchWithCache<MovieCreditsResponse>(
    `movieCredits_${movieId}`,
    () => fetchFromAPI<MovieCreditsResponse>("credits", movieId)
  );
};

const fetchMovieKeywords = async (movieId: number): Promise<Keyword[]> => {
  const response = await fetchWithCache<MovieKeywordsResponse>(
    `movieKeywords_${movieId}`,
    () => fetchFromAPI<MovieKeywordsResponse>("keywords", movieId)
  );
  return response.keywords;
};

const fetchMovieRecommendations = async (movieId: number): Promise<Movie[]> => {
  const response = await fetchWithCache<MoviesRecommendationsResponse>(
    `movieRecommendations_${movieId}`,
    () => fetchFromAPI<MoviesRecommendationsResponse>("recommendations", movieId)
  );
  return response.results;
};

const fetchMovieReleaseDate = async (movieId: number) => {
  const response = await fetchWithCache<ReleaseDatesResponse>(
    `movieReleaseDate_${movieId}`,
    () => fetchFromAPI<ReleaseDatesResponse>("releaseDate", movieId)
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
  const response = await fetchWithCache<MovieVideosResponse>(
    `movieVideo_${movieId}`,
    () => fetchFromAPI<MovieVideosResponse>("video", movieId)
  );
  const trailer = response.results.find(item => item.type === 'Trailer');
  return trailer ? trailer.key : null;
};

const fetchMovieNowPlaying = async () => {
  return fetchWithCache<NowPlayingMoviesResponse>(
    'movieNowPlaying',
    () => fetchFromAPI<NowPlayingMoviesResponse>("nowPlaying")
  );
};

const fetchMovieTrending = async (): Promise<MoviesTrendingResponse> => {
  return fetchWithCache<MoviesTrendingResponse>(
    'movieTrending',
    () => fetchFromAPI<MoviesTrendingResponse>("trending")
  );
};

const fetchMovieReviews = async (movieId: number) => {
  const response = await fetchWithCache<MovieReviewResponse>(
    `movieReviews_${movieId}`,
    () => fetchFromAPI<MovieReviewResponse>("reviews", movieId)
  );
  return response.results;
};

const fetchMovieExternalIds = async (movieId: number): Promise<MovieExternalIdsResponse> => {
  return fetchWithCache<MovieExternalIdsResponse>(
    `movieExternalIds_${movieId}`,
    () => fetchFromAPI<MovieExternalIdsResponse>("externalIds", movieId)
  );
};

const fetchMovieImages = async (movieId: number) => {
  return fetchWithCache<MovieImageResponse>(
    `movieImages_${movieId}`,
    () => fetchFromAPI<MovieImageResponse>("images", movieId)
  );
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
