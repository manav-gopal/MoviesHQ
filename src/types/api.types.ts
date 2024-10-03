import type { Movie, MovieDetailsResponse, MovieCreditsResponse, MoviesTrendingResponse, NowPlayingMoviesResponse } from "@/types/movieDataAPI.types";

export type ApiResponse<T> = {
  data: T;
  error?: string;
};

export type MainApiActions = 'details' | 'credits' | 'trending' | 'nowPlaying';

export type MainApiResponse = ApiResponse<
  | MovieDetailsResponse
  | MovieCreditsResponse
  | MoviesTrendingResponse
  | NowPlayingMoviesResponse
  | Movie
>;