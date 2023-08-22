import React from 'react';
import './MovieCard.css'; // Import the CSS file for the component
import CircularProgressBar from './canvas/CircularProgressBar';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const MovieCard = ({ movie }) => {
  const { title, poster_path, vote_average ,id} = movie;
  let valid = "block";// If the image path is null then we will not display that card
  if (poster_path == null || vote_average === 0) {
    valid = "none";
  }

  return (
    <div className="movie-card" style={{display: valid}} movie_id={id} movie_name={title}>
      <img src={IMG_PATH + poster_path} alt={title} />
      <CircularProgressBar className="bar" percentage={vote_average*10} color={`${getClassByRate(vote_average)}`} widthAndHeight={36}/>
      <div className="movie-info">
        <h3>{title}</h3>
        {/* <span className={getClassByRate(vote_average)}>{vote_average}</span> */}
      </div>
    </div>
  );
};

function getClassByRate(vote) {
  if (vote >= 7) {
    return 'rgb(33,208,122)';
  } else if (vote >= 4) {
    return '#C9CB2E';
  } else {
    return 'crimson';
  }
}

export default MovieCard;
