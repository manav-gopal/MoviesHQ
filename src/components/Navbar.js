import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { searchByNL } from "../redux/slice/SearchSlice";
// import { searchByName } from "../redux/slice/SearchSlice";
import { useNavigate } from 'react-router-dom';
import './style/Navbar.scss';
import logo from '../assets/image/MoviesHQLogo.png'

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [searchVal, setSearchVal] = useState();

    // function onSubmit(e) {
    //     e.preventDefault();
    //     // console.log(e.target.value);
    //     dispatch(searchByName(searchVal));

    //     navigate('/findmovies');
    // }
    // const handleChange = (e) => {
    //     setSearchVal(e.target.value);
    //     // console.log(e.target.value);
    // }

    //new Search bar with AI search
    const [searchValAi, setSearchValAi] = useState();

    function onSubmitAi(e) {
        e.preventDefault();
        // console.log(e.target.value);
        dispatch(searchByNL(searchValAi));

        navigate('/findmovies');
    }
    const handleChangeAI = (e) => {
        setSearchValAi(e.target.value);
        // console.log(e.target.value);
    }

    return (
        <div className="navbar">
            <div className="navbar_container">
                <div className="title" onClick={() => { navigate('/') }}><img src={logo} alt="logo Not Found" /></div>
                <div className="searchBar">
                    {/* <form onSubmit={onSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" style={{ fill: "rgba(128, 128, 128, 0.5)" }}><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                        <input type="text" placeholder="Search here" onChange={handleChange} />
                    </form> */}
                    <form onSubmit={onSubmitAi}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" style={{ fill: "rgba(128, 128, 128, 0.5)" }}><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                        <input type="text" placeholder="Search here with AI" onChange={handleChangeAI} />
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Navbar;