import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Errors from './components/pages/Errors';
import FindMovies from './components/pages/FindMovies';
import HandleClick from './components/util/HandleClick';
import MovieDetailContainer from './components/pages/moviedetails/MovieDetailContainer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/findmovies" element={<FindMovies />} />
        <Route path="/movie/:movieId/:movieName" element={<MovieDetailContainer />} />
        <Route exact path='*' element={<Errors />} />
      </Routes>
      <HandleClick /> {/* To set OnClick Event in Movies */}
    </div>
  );
}

export default App;
