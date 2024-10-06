import React, { useState, useEffect } from "react";
import Image from "next/image";
import CircularProgressBar from "../../ui/canvas/CircularProgressBar";
import "@/styles/components/cards/MovieCard.scss";

const IMG_PATH = "https://image.tmdb.org/t/p/w185";

interface Movie {
  title: string;
  poster_path: string | null;
  vote_average: number;
  id: number;
}

interface MovieCardProps {
  movie: Movie;
  isLoading: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isLoading }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading && movie?.poster_path) {
      const img: HTMLImageElement = new window.Image();
      img.src = `${IMG_PATH}${movie.poster_path}`;
      img.onload = () => setIsImageLoaded(true);
    }
  }, [isLoading, movie]);
  const renderContent = () => {
    if (
      isLoading ||
      !movie
    ) {
      return (
        <>
          <div className="card-img" />
          <div className="movie-info">
            <h3 />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="card-img">
          <Image
            src={`${IMG_PATH}${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={300}
            style={{opacity: isImageLoaded ? 1 : 0 }}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        {isImageLoaded && (
          <CircularProgressBar
            className="bar"
            percentage={movie.vote_average * 10}
            color={getColorByRating(movie.vote_average)}
            widthAndHeight={36}
          />
        )}
        <div className="movie-info" style={{ opacity: isImageLoaded ? 1 : 0 }}>
          <h3>{movie.title}</h3>
        </div>
      </>
    );
  };

  if (movie) {
    const { title, poster_path, vote_average, id } = movie;

    if (!id || !title || !poster_path || vote_average === 0) {
      return null;
    }
  }

  return (
    <div
      className={`movie-card ${isImageLoaded ? "loaded" : "is-loading"}`}
      data-movie_id={movie?.id}
      data-movie_name={movie?.title}
    >
      {renderContent()}
    </div>
  );
};

function getColorByRating(vote: number): string {
  if (vote >= 7) return "rgb(33,208,122)";
  if (vote >= 4) return "#C9CB2E";
  return "crimson";
}

export default MovieCard;
