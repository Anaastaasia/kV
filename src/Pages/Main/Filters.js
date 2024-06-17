// src/Pages/Main/Filters.js
import React, { useState } from 'react';

const Filters = ({ genres, onFilterChange }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const [yearRange, setYearRange] = useState([1990, new Date().getFullYear()]);

  const handleGenreChange = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const handleRatingChange = (e) => {
    const [min, max] = e.target.value.split('-').map(Number);
    setRatingRange([min, max]);
  };

  const handleYearChange = (e) => {
    const [min, max] = e.target.value.split('-').map(Number);
    setYearRange([min, max]);
  };

  const applyFilters = () => {
    onFilterChange({ genres: selectedGenres, ratingRange, yearRange });
  };

  return (
    <div className="filters">
      <h3>Filter Movies</h3>
      <div>
        <h4>Genres</h4>
        {genres.map(genre => (
          <label key={genre}>
            <input
              type="checkbox"
              value={genre}
              onChange={() => handleGenreChange(genre)}
            />
            {genre}
          </label>
        ))}
      </div>
      <div>
        <h4>Rating</h4>
        <input type="text" placeholder="e.g. 5-8" onChange={handleRatingChange} />
      </div>
      <div>
        <h4>Year</h4>
        <input type="text" placeholder="e.g. 2000-2020" onChange={handleYearChange} />
      </div>
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filters;
