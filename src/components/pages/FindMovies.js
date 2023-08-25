import React from 'react';
import '../style/FindMovies.scss';
import Search from '../Search';
import Navbar from '../Navbar';
import Slider from '../Slider';

const FindMovies = () => {
    return(
        <div className='movie-container'>
        <Navbar />
        <Slider />
        <Search />
        </div>
    )
}

export default FindMovies;