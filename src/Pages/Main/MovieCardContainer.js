/* src/Pages/Main/MovieCardContainer.js */
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './css/MovieCardContainer.css';

const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'X-API-KEY': 'R1FCW2T-PB6MF8D-QZHZAVR-EZ2K5BP' }
};

const MovieCardContainer = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
          try {
            let allMovies = [];
            let currentPage = page;
    
            while (allMovies.length < 50) {
              const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie?page=${currentPage}&limit=50`, options);
              const data = await response.json();
              
              const filteredMovies = data.docs.filter(movie => 
                movie.poster?.url && movie.name && movie.description
              );
    
              allMovies = allMovies.concat(filteredMovies);
              currentPage++;
    
              if (data.docs.length < 50) break; // Если меньше 50 фильмов на странице, то выходим из цикла
            }
    
            setMovies(allMovies.slice(0, 50)); // Оставляем только первые 50 фильмов
          } catch (error) {
            console.error('Error fetching movies:', error);
          }
        };
    
        fetchMovies();
      }, [page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="movie-card-container">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};


export default MovieCardContainer;
