import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { fetchMovieTrending } from './fetch/movieDataAPI';
import './style/Slider.scss';

const Slider = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const trendingData = await fetchMovieTrending();
        setData(trendingData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const items = [];
  if (data) {
    const chunkedArray = data.slice(0, 6);
    console.log(chunkedArray);
    const imgUrl = 'https://image.tmdb.org/t/p/w1280/';

    chunkedArray.forEach((item, index) => {
      const slideContent = (
        <div className="slider-item" key={index}>
          <div
            className="slider-content"
            style={{ backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,8,20,.5),rgba(0,8,20,.8),rgba(0,8,20,1)),url(${imgUrl}${item.backdrop_path})` }}
          >
            <h2>{item.title}<br/><span movie_id={item.id} movie_name={item.title}>Details<i /></span></h2>
          </div>
        </div>
      );
      items.push(slideContent);
    });
  }

  return (
    <div className="slider-container">
      <AliceCarousel
        items={items}
        autoPlay
        autoPlayInterval={3000}
        animationType="slide"
        infinite
        controlsStrategy="responsive"
        responsive={{
          0: { items: 1 },
        }}
      />
    </div>
  );
};

export default Slider;
