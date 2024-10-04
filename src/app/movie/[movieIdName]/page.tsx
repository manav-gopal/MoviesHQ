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

const MovieData = async ({ movieId, movieName }: { movieId: number, movieName: string }) => {
  console.log("MovieName:", movieName);
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
    ] = await Promise.allSettled([
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

    return (
      <MovieDetail
        movieDetails={details.status === "fulfilled" ? details.value : null}
        movieReleaseDates={release_dates.status === "fulfilled" ? release_dates.value : null}
        movieCredits={credits.status === "fulfilled" ? credits.value : null}
        movieKeywords={keywords.status === "fulfilled" ? keywords.value : null}
        movieVideo={video.status === "fulfilled" ? video.value : null}
        movieRecommendations={recommendations.status === "fulfilled" ? recommendations.value : null}
        movieReviews={reviews.status === "fulfilled" ? reviews.value : null}
        movieExternalIds={external_ids.status === "fulfilled" ? external_ids.value : null}
        movieImages={images.status === "fulfilled" ? images.value : null}
      />
    );
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};

const Page = ({ params }: { params: { movieIdName: string } }) => {
  const { movieIdName } = params;
  const [movieId, ...movieNameParts] = movieIdName.split("-");
  const movieName = movieNameParts.join(" ");

  if (!movieId || isNaN(Number(movieId))) {
    console.error('Invalid movieId:', movieId);
    return <div>Invalid movie ID</div>;
  }

  return (
    <Suspense fallback={<Spinner>{null}</Spinner>}>
      <MovieData movieId={Number(movieId)} movieName={movieName} />
    </Suspense>
  );
};

export default Page;
