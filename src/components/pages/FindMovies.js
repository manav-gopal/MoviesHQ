import React from 'react';
import '../style/FindMovies.scss';
import Search from '../Search';
import Navbar from '../Navbar';
import { useSelector } from 'react-redux';

const FindMovies = () => {
    const searchItem = useSelector((state) => state.searchSliceReducer.searchItem2);

    return (
        <div className='movie-container'>
            <Navbar />
            <div className='nav_cover'></div>
            <h1 style={{ paddingLeft: "18px" }}>Search results for '<span style={{ color: '#7752FE', textTransform: "capitalize" }}>{searchItem}</span>'</h1>
            {/* <Slider /> */}
            <Search />
        </div>
    )
}

export default FindMovies;