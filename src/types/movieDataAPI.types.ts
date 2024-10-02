//? Common Movie Data
export interface Movie {
  backdrop_path?: string;
  id: number;
  title: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type?: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

//! The Movie Api Response ----------------------------------------------------------------
export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type MoviesTrendingResponse = MovieListResponse;
export type MoviesPopularResponse = MovieListResponse;
export type MoviesTopRatedResponse = MovieListResponse;
export type MoviesRecommendationsResponse = MovieListResponse;

export interface NowPlayingMoviesResponse extends MovieListResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
}

export type UpcomingMoviesResponse = NowPlayingMoviesResponse;

//! The Movie Details Response ----------------------------------------------------------------
// Additional Data for Detailed Movie Information
interface BelongsToCollection {
  id: number;
  name: string;
  poster_path?: string;
  backdrop_path?: string;
}
interface Genre {
  id: number;
  name: string;
}
interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}
interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}
interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
//? Detailed Movie Data extends Common Movie Data
export interface MovieDetailsResponse extends Movie {
  belongs_to_collection?: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage?: string;
  imdb_id?: string;
  origin_country: string[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline?: string;
}

//! Cast and Crew Data ----------------------------------------------------------------
export interface MovieCredits {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id?: number;
  character?: string;
  credit_id?: string;
  order?: number;
  department?: string;
  job?: string;
}

// The interface for movie cast and crew
export interface MovieCreditsResponse {
  id: number;
  cast: MovieCredits[];
  crew: MovieCredits[];
}

//! Define the type for a single keyword ----------------------------------------------------------------
export interface Keyword {
  id: number;
  name: string;
}
// Define the type for the keywords response
export interface MovieKeywordsResponse {
  id: number;
  keywords: Keyword[];
}

//! Interface for Release Date Details ----------------------------------------------------------------
interface ReleaseDateDetail {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

interface CountryReleaseDates {
  iso_3166_1: string;
  release_dates: ReleaseDateDetail[];
}

export interface ReleaseDatesResponse {
  id: number;
  results: CountryReleaseDates[];
}

//! Interface for individual video details ----------------------------------------------------------------
export interface MovieVideo {
  iso_639_1: string; // Language code
  iso_3166_1: string; // Country code
  name: string;
  key: string; // (e.g., YouTube video ID)
  site: string; // (e.g., "YouTube")
  size?: number; // Resolution size
  type: string; // Type of video (e.g., "Featurette", "Trailer")
  official?: boolean;
  published_at: string; // Publication date
  id: string;
}

//? Interface for the response containing multiple videos
export interface MovieVideosResponse {
  id: number;
  results: MovieVideo[];
}

//! Interface for Review Response ----------------------------------------------------------------
interface AuthorDetails {
  name: string | null;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

interface Review {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface MovieReviewResponse {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

//! Interface for Movie Images ----------------------------------------------------------------
interface BackdropImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MovieImageResponse {
  backdrops: BackdropImage[];
}

//! Interface for Movie External IDs---------------------------------------------------------------- 
export interface MovieExternalIdsResponse {
  id: number;
  imdb_id: string | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
}
