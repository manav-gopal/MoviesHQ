"use client";

import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { fetchMovieTrending } from "@/lib/api/movieDataAPI";
import "@/styles/components/layout/Slider.scss";
import type { Movie } from "@/types/movieDataAPI.types";
import Image from "next/image";

const Slider = () => {
  const [data, setData] = useState<Movie[]>([]); // Initialize with an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingData = await fetchMovieTrending();
        if (trendingData) setData(trendingData.results);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchData();
  }, []);

  const imgUrl = "https://image.tmdb.org/t/p/w1280/";
  const lowImgUrl = "https://image.tmdb.org/t/p/w300/";

   // Function to render carousel items
   const renderItems = () => {
    return data.slice(0, 6).map((item,index) => (
      <div className="slider-item" key={item.id}>
        <div className="slider-content">
          <Image
            src={`${imgUrl}${item.backdrop_path}`}
            blurDataURL={`${lowImgUrl}${item.backdrop_path}`}
            alt={item.title}
            layout="fill"
            objectFit="cover"
            quality={75}
            priority={true}
          />
          <h2>
            {item.title}
            <br />
            <span data-movie_id={item.id} data-movie_name={item.title}>
              Details
              <i />
            </span>
          </h2>
          <div className="shadow" />
        </div>
      </div>
    ));
  };

  return (
    <div className="slider-container">
      <AliceCarousel
        items={renderItems()}
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
