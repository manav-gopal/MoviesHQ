import React from 'react';
import './ImageCard.css'; // Import the CSS file for the component

const IMG_PATH = 'https://image.tmdb.org/t/p/w780';

const ImageCard = ({ imageUrl }) => {
  return (
    <div className="image-card" style={{display: 'block'}}>
      <img src={IMG_PATH + imageUrl} alt={"not found"} />
    </div>
  );
};

export default ImageCard;
