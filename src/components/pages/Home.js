import React from "react";
import Trending from "../Trending";
import MoviesNow from "../MoviesNow";
import '../style/Home.scss';
import Navbar from "../Navbar";
import Slider from "../Slider";

const Home = () =>{
    return(
        <div className="home">
            <div className='navbar_space'></div>
            <Navbar />
            <Slider />
            <Trending />
            <MoviesNow />
        </div>
    );
}

export default Home;