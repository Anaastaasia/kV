/* src/Pages/Main/MovieCardContainer.js */
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './css/MovieCardContainer.css';





const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'X-API-KEY': '0CHHNW5-GRGM9RF-J3PQ3XD-AZXZWP9' }
};

const MovieCardContainer = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const totalPages = 10;  // Фиксированное количество страниц

    // Новые состояния для фильтров
    const [genreFilter, setGenreFilter] = useState([]);
    const [ratingFilter, setRatingFilter] = useState({ min: 0, max: 10 });
    const [yearFilter, setYearFilter] = useState({ start: 1990, end: new Date().getFullYear() });


  useEffect(() => {
    const fetchMovies = async () => {
      let loadedMovies = [];
      let currentPage = page;
      let attempts = 0;  // Счетчик попыток загрузки, чтобы избежать бесконечного цикла

      while (loadedMovies.length < 10 && attempts < 10) {
        try {
          const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie?page=${currentPage}&limit=50`, options);
          const data = await response.json();
          
          const filteredMovies = data.docs.filter(movie => 
            movie.poster?.url && movie.name && movie.description
          );

          loadedMovies = [...loadedMovies, ...filteredMovies];
          currentPage++;
          attempts++;

          if (data.docs.length < 10) break; // Если меньше 50 фильмов на странице, то выходим из цикла
        } catch (error) {
          console.error('Error fetching movies:', error);
          break;
        }
      }

      setMovies(loadedMovies.slice(0, 50)); // Оставляем только первые 50 фильмов
    };

    fetchMovies();
  }, [page, genreFilter, ratingFilter, yearFilter]); // Добавляем зависимости фильтров


  const handleNextPage = () => setPage(prevPage => Math.min(prevPage + 1, totalPages));
  const handlePreviousPage = () => setPage(prevPage => Math.max(prevPage - 1, 1));

  const getPageNumbers = () => {
    let startPage = Math.max(page - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className='container'>
    <div className="movie-card-container">
      {movies.map((movie, index) => <MovieCard key={index} movie={movie} />)}
    </div>
    <div className="pagination">
        <button className='arrow' onClick={handlePreviousPage} disabled={page === 1}>&laquo;</button>
        {getPageNumbers().map(num => (
          <button key={num}
                  className={page === num ? 'active' : ''}
                  onClick={() => setPage(num)}>
            {num}
          </button>
        ))}
        <button className='arrow' onClick={handleNextPage} disabled={page === totalPages}>&raquo;</button>
      </div>
    </div>
    
  );
};

export default MovieCardContainer;
