import React from "react";
import Trending from "../Trending";
import MoviesNow from "../MoviesNow";
import '../style/Home.scss';
import Navbar from "../Navbar";
import Thumbnail from "../Thumbnail";

const Home = () =>{
    return(
        <div className="home">
            <Navbar />
            <Thumbnail />
            <Trending />
            <MoviesNow />
        </div>
    );
}

export default Home;