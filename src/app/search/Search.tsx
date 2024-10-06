"use client";

import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "@/styles/pages/Search.scss";
import { type Movie } from "@/types/movieDataAPI.types";
import fetchSearchData from "@/lib/api/genAI";
import Spinner from "@/components/ui/Spinner";

    // Start of Selection
    const MovieCard = dynamic(() => import("@/components/card/moviecard/MovieCard"), {
      loading: () => <Spinner>{null}</Spinner>,
    });

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
      <div className="search-movies">
        <h2>
          Search Results for &quot;
          <span className="text-purple-400">{query}</span>&quot;
        </h2>
        <div className="movie-list">
          {Array.from({ length: 20 }).map((_, index) => (
            <MovieCard
              key={movieData[index]?.id ?? `loading-${index}`}
              movie={movieData[index]!}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
  );
};

export default Search;
