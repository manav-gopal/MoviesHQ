import React from "react";
import "@/styles/components/cards/MovieCard.scss";
import CircularProgressBar from "../../ui/canvas/CircularProgressBar";
import Image from "next/image";

const IMG_PATH = "https://image.tmdb.org/t/p/w185";
interface Movie {
  title: string;
  poster_path: string | null;
  vote_average: number;
  id: number;
}

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { title, poster_path, vote_average, id } = movie;

  if (!id || !title) {
    console.error('Invalid movie data:', movie);
    return null;
  }

  const valid = poster_path != null && vote_average !== 0;

  return (
    <div
      className="movie-card"
      style={{ display: valid ? 'block' : 'none' }}
      data-movie_id={id}
      data-movie_name={title}
    >
      {valid && (
        <>
          <div className="card-img">
            <Image
              src={IMG_PATH + poster_path}
              alt={title}
              width={100}
              height={100}
              style={{ borderRadius: "10px" }}
              loading="lazy"
            />
          </div>
          <CircularProgressBar
            className="bar"
            percentage={vote_average * 10}
            color={getClassByRate(vote_average)}
            widthAndHeight={36}
          />
          <div className="movie-info">
            <h3>{title}</h3>
          </div>
        </>
      )}
    </div>
  );
};

function getClassByRate(vote: number) {
  if (vote >= 7) {
    return "rgb(33,208,122)";
  } else if (vote >= 4) {
    return "#C9CB2E";
  } else {
    return "crimson";
  }
}

export default MovieCard;
