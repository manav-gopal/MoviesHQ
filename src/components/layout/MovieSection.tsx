"use client";

import React, { useEffect, useState } from "react";
import "@/styles/components/layout/MovieSection.scss";
import MovieCard from "@/components/card/moviecard/MovieCard";
import {
  fetchMovieTrending,
  fetchMovieNowPlaying,
} from "@/lib/api/movieDataAPI";
import type { Movie } from "@/types/movieDataAPI.types";

export enum MovieSectionType {
  TRENDING = "trending",
  NOW_PLAYING = "now_playing",
}

type MovieSectionProps = {
  title: string;
  type: MovieSectionType;
};

const MovieSection: React.FC<MovieSectionProps> = ({ title, type }) => {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const fetchFunction =
          type === MovieSectionType.TRENDING
            ? fetchMovieTrending
            : fetchMovieNowPlaying;
        const response = await fetchFunction();
        if (response) setMovieData(response.results);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to fetch data:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    void fetchMovies();
  }, [type]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-section">
      <h2>{title}</h2>
      <div className="movie-list">
        {movieData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieSection;
