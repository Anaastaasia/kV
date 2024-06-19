/* publick/app.js */

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FirstComponent from "./Pages/Main/FirstComponent";
import MovieDetail from './Pages/Main/MovieDetails'; // Новый компонент для отображения информации о фильме
import Favorites from './Pages/Main/Favorites';


function App() {
  return (
    <Routes>
      <Route path="/"  element={<FirstComponent/>} />
      <Route path="/movie/:id"  element={<MovieDetail/>} />
      <Route path="/favorites" element={<Favorites/>} />
      </Routes>
  );
}

export default App;


