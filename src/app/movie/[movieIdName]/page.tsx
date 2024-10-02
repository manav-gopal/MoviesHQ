import React, { Suspense } from "react";
import MovieDetail from "./MovieDetails";
import {
  fetchMovieDetails,
  fetchMovieReleaseDate,
  fetchMovieCredits,
  fetchMovieVideo,
  fetchMovieKeywords,
  fetchMovieRecommendations,
  fetchMovieReviews,
  fetchMovieExternalIds,
  fetchMovieImages,
} from "@/lib/api/movieDataAPI";
import Spinner from "@/components/ui/Spinner";
import { notFound } from "next/navigation";

const MovieData = async ({ movieId }: { movieId: number }) => {
  const startTime = performance.now();
  try {
    const [
      details,
      credits,
      keywords,
      recommendations,
      release_dates,
      video,
      reviews,
      external_ids,
      images,
    ] = await Promise.all([
      fetchMovieDetails(movieId),
      fetchMovieCredits(movieId),
      fetchMovieKeywords(movieId),
      fetchMovieRecommendations(movieId),
      fetchMovieReleaseDate(movieId),
      fetchMovieVideo(movieId),
      fetchMovieReviews(movieId),
      fetchMovieExternalIds(movieId),
      fetchMovieImages(movieId),
    ]);

    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    console.log(`[MovieData] Fetched data for movie ${movieId} in ${timeTaken.toFixed(2)}ms`);

    // Check if any of the fetched data is null or undefined
    if (
      !details ||
      !credits ||
      !keywords ||
      !recommendations ||
      !release_dates ||
      !video ||
      !reviews ||
      !external_ids ||
      !images
    ) {
      console.error("One or more fetch requests returned null or undefined");
      notFound();
    }

    return (
      <MovieDetail
        movieDetails={details}
        movieReleaseDates={release_dates}
        movieCredits={credits}
        movieKeywords={keywords}
        movieVideo={video}
        movieRecommendations={recommendations}
        movieReviews={reviews}
        movieExternalIds={external_ids}
        movieImages={images}
      />
    );
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};

const MovieDetailContainer = ({
  params,
}: {
  params: { movieIdName: string };
}) => {
  const { movieIdName } = params;
  const movieId = Number(movieIdName.split("-")[0]);

  return (
    <Suspense fallback={<Spinner>{null}</Spinner>}>
      <MovieData movieId={movieId} />
    </Suspense>
  );
};

export default MovieDetailContainer;
