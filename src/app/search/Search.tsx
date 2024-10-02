"use client";

import React, { Suspense, useEffect, useState } from "react";
import "@/styles/pages/Search.scss";
import MovieCard from "@/components/card/moviecard/MovieCard";
import { type Movie } from "@/types/movieDataAPI.types";
import fetchSearchData from "@/lib/api/genAI";
import Spinner from "@/components/ui/Spinner";

const Search = ({ query }: { query: string }) => {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchSearchData(query);
      setMovieData(data);
      setIsLoading(false);
    };

    void fetchData();
  }, [query]);

  return (
    <Suspense fallback={<Spinner>{null}</Spinner>}>
      {isLoading ? (
        <Spinner>{null}</Spinner>
      ) : (
        <div className="search-movies">
          <h2>
            Search Results for &quot;
            <span className="text-purple-400">{query}</span>&quot;
          </h2>
          <div className="movie-list">
            {movieData.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Search;
