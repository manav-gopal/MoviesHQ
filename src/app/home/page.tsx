"use client";

import React, { Suspense, lazy } from "react";
import { MovieSectionType } from "@/components/layout/MovieSection";
import "@/styles/pages/Home.scss";

const LazySlider = lazy(() => import("@/components/layout/Slider"));
const LazyMovieSection = lazy(() => import("@/components/layout/MovieSection"));

const movieSections = [
  { title: "Trending Movies", type: MovieSectionType.TRENDING },
  { title: "Now Playing", type: MovieSectionType.NOW_PLAYING },
];

const Home = () => {
  return (
    <div className="home">
      <Suspense fallback={<div>Loading Slider...</div>}>
        <LazySlider />
      </Suspense>
      <Suspense fallback={<div>Loading movies...</div>}>
        <div className="movie-container">
          {movieSections.map((section, index) => (
            <LazyMovieSection key={index} title={section.title} type={section.type} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
