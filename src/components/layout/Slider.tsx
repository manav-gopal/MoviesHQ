"use client";

import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { fetchMovieTrending } from "@/lib/api/movieDataAPI";
import "@/styles/components/layout/Slider.scss";
import type { Movie } from "@/types/movieDataAPI.types";
// import Image from 'next/image';

const Slider = () => {
  const [data, setData] = useState<Movie[] | null>(null);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const trendingData = await fetchMovieTrending();
        if (trendingData) setData(trendingData.results);
      } catch (error) {
        console.error(error);
      }
    }

    void fetchData();
  }, []);

  const items: React.ReactNode[] = [];
  if (data) {
    const chunkedArray = data.slice(0, 6);
    const imgUrl = "https://image.tmdb.org/t/p/w1280/";
    // const lowImgUrl = 'https://image.tmdb.org/t/p/w300/';

    chunkedArray.forEach((item, index) => {
      const slideContent = (
        <div className="slider-item" key={index}>
          <div
            className="slider-content"
            // style={{ backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,8,20,.5),rgba(0,8,20,.8),rgba(0,8,20,1)),url(${imgUrl}${item.backdrop_path})` }}
            style={{
              backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.5),rgba(0,0,0,.8),rgba(0,0,0,1)),url(${imgUrl}${item.backdrop_path})`,
            }}
          >
            {/* <Image
              src={`${imgUrl}${item.backdrop_path}`} 
              blurDataURL={`${lowImgUrl}${item.backdrop_path}`}
              alt={item.title}
              layout="fill"
              quality={75}
              priority={index === 0}  // First image has loading priority
            /> */}
            <h2>
              {item.title}
              <br />
              <span data-movie_id={item.id} data-movie_name={item.title}>
                Details
                <i />
              </span>
            </h2>
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
        animationType="fadeout"
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
