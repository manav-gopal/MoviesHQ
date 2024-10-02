import React from 'react';
import '@/styles/components/cards/ImageCard.scss';
import Image from 'next/image';

const IMG_PATH = 'https://image.tmdb.org/t/p/w780';

const ImageCard = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className="image-card" style={{display: 'block'}}>
      <Image src={IMG_PATH + imageUrl} alt={"not found"} width={100} height={100}/>
    </div>
  );
};

export default ImageCard;
