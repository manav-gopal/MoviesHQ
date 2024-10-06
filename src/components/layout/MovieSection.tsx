"use client";

import React, { useEffect, useState, Suspense } from "react";
import "@/styles/components/layout/MovieSection.scss";
import {
  fetchMovieTrending,
  fetchMovieNowPlaying,
} from "@/lib/api/movieDataAPI";
import type { Movie } from "@/types/movieDataAPI.types";
import Spinner from "@/components/ui/Spinner";

const MovieCard = React.lazy(() => import("@/components/card/moviecard/MovieCard"));

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

  return (
    <div className="movie-section">
      <h2 style={{ opacity: isLoading ? 0 : 1 }}>{title}</h2>
      <Suspense fallback={<Spinner>{null}</Spinner>}>
        <div className="movie-list">
          {Array.from({ length: 20 }).map((_, index) => (
            <MovieCard
              key={movieData[index]?.id ?? `loading-${index}`}
              movie={movieData[index]!}
              isLoading={isLoading}
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default MovieSection;
