import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Home from './components/pages/Home';
import Errors from './components/pages/Errors';
import FindMovies from './components/pages/FindMovies';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/MoviesHQ" element={<Home />} />
        <Route path="/findmovies" element={<FindMovies />} />
        <Route exact path='*' element={<Errors />} />
      </Routes>
    </div>
  );
}

export default App;
