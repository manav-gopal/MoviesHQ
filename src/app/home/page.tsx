"use client";

import React from "react";
import { Slider } from "@/components/layout";
import MovieSection, { MovieSectionType } from "@/components/layout/MovieSection";
import '@/styles/pages/Home.scss';

const Home = () =>{
    return(
        <div className="home">
            <Slider />
            <MovieSection title="Trending Movies" type={MovieSectionType.TRENDING} />
            <MovieSection title="Now Playing" type={MovieSectionType.NOW_PLAYING} />
        </div>
    );
}

export default Home;