
import React from 'react';

const GenresFilter = ({ selectedGenres, setSelectedGenres }) => {
  const genres = ['комедия', 'аниме']; // Пример списка жанров

  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(item => item !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div>
      <h3>Filter by Genre:</h3>
      {genres.map(genre => (
        <label key={genre}>
          <input
            type="checkbox"
            checked={selectedGenres.includes(genre)}
            onChange={() => handleGenreChange(genre)}
          />
          {genre}
        </label>
      ))}
    </div>
  );
};

export default GenresFilter;