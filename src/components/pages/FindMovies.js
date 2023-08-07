import React from 'react';
import '../style/FindMovies.scss';
import Search from '../Search';
import Navbar from '../Navbar';
import Thumbnail from '../Thumbnail';

const FindMovies = () => {
    return(
        <div className='movie-container'>
        <Navbar />
        <Thumbnail />
        <Search />
        </div>
    )
}

export default FindMovies;