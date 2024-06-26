/* src/Pages/Main/MovieCardContainer.js */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import './css/MovieCardContainer.css';
import ButtonFavorites from './ButtonFavorites';
import IsLoading from './Loading';
import useIntersectionObserver from './hooks/useIntersectionObserver';

const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY }
};

const MovieCardContainer = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = 10;  
  const navigate = useNavigate();

  // Состояния для фильтров
  const [genreFilter, setGenreFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState({ min: 0, max: 10 });
  const [yearFilter, setYearFilter] = useState({ start: 1990, end: new Date().getFullYear() });
  const [filters, setFilters] = useState({ genreFilter: [], ratingFilter: { min: 0, max: 10 }, yearFilter: { start: 1990, end: new Date().getFullYear() }});
  const [nextPageData, setNextPageData] = useState(null);

  // Набор для уникальных фильмов
  const movieSet = useRef(new Set());

  // Состояния для управления видимостью выпадающих меню
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  // Состояние для избранных фильмов
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const fetchMovies = useCallback(async (currentPage, updateNextPageData = false) => {
    setIsLoading(true);
    let genreQuery = filters.genreFilter.length ? `genres.name=${filters.genreFilter.join('&genres.name=')}` : '';
    let ratingQuery = `rating.kp=${filters.ratingFilter.min}-${filters.ratingFilter.max}`;
    let yearQuery = `year=${filters.yearFilter.start}-${filters.yearFilter.end}`;
    let filterQuery = [genreQuery, ratingQuery, yearQuery, 'poster.url=!null', 'name=!null', 'description=!null']
      .filter(Boolean)
      .join('&');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/v1.4/movie?page=${currentPage}&limit=50&${filterQuery}`, options);
      const data = await response.json();
      const filteredMovies = data.docs.filter(movie => 
        movie.poster?.url && movie.name && movie.description
      );

      const uniqueMovies = filteredMovies.filter(movie => {
        if (!movieSet.current.has(movie.id)) {
          movieSet.current.add(movie.id);
          return true;
        }
        return false;
      });

      if (updateNextPageData) {
        setNextPageData(uniqueMovies);
      } else {
        setMovies(prevMovies => {
          const allMovies = [...prevMovies, ...uniqueMovies];
          if (allMovies.length < 50 && currentPage < totalPages) {
            fetchMovies(currentPage + 1);
          }
          return allMovies.slice(0, 50);
        });
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setIsLoading(false);
    }
  }, [filters, totalPages]);

  useEffect(() => {
    setMovies([]); 
    fetchMovies(page);
    if (page < totalPages) {
      fetchMovies(page + 1, true);
    }
  }, [page, fetchMovies]);

  const applyFilters = () => {
    setFilters({
      genreFilter,
      ratingFilter,
      yearFilter
    });
    setPage(1);
    setIsGenreDropdownOpen(false);
    setIsRatingDropdownOpen(false);
    setIsYearDropdownOpen(false);
    movieSet.current.clear();
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
      if (nextPageData) {
        setMovies(nextPageData);
        setNextPageData(null);
      }
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

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

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    setGenreFilter(prevGenres => 
      checked ? [...prevGenres, value] : prevGenres.filter(genre => genre !== value)
    );
  };

  const handleRatingChange = (event) => {
    const { name, value } = event.target;
    setRatingFilter(prevRating => ({ ...prevRating, [name]: value }));
  };

  const handleYearChange = (event) => {
    const { name, value } = event.target;
    setYearFilter(prevYear => ({ ...prevYear, [name]: value }));
  };


// Обработчики для переключения состояния видимости
const toggleGenreDropdown = () => {
  setIsGenreDropdownOpen(!isGenreDropdownOpen);
  if (!isGenreDropdownOpen) {
    setIsRatingDropdownOpen(false);
    setIsYearDropdownOpen(false);
  }
};

const toggleRatingDropdown = () => {
  setIsRatingDropdownOpen(!isRatingDropdownOpen);
  if (!isRatingDropdownOpen) {
    setIsGenreDropdownOpen(false);
    setIsYearDropdownOpen(false);
  }
};

const toggleYearDropdown = () => {
  setIsYearDropdownOpen(!isYearDropdownOpen);
  if (!isYearDropdownOpen) {
    setIsGenreDropdownOpen(false);
    setIsRatingDropdownOpen(false);
  }
};

const toggleFavorite = (movie) => {
  let updatedFavorites;
  const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  if (currentFavorites.some(fav => fav.id === movie.id)) {
    updatedFavorites = currentFavorites.filter(fav => fav.id !== movie.id);
  } else {
    updatedFavorites = [...currentFavorites, movie];
  }
  setFavorites(updatedFavorites);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};





const elementsRef = useIntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
      }
  });
}, { root: null, rootMargin: '0px', threshold: 0 });

useEffect(() => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  elementsRef.current = elements;
}, [elementsRef]);




  return (
    <div className='container'>
      <div className='container_filter animate-on-scroll'>
      <ButtonFavorites/>
      <div className="filters">
        <div className='filterOne'>
          <button onClick={toggleGenreDropdown}>
            Жанры <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" id="chevron-down"><path fill="#ccc" d="M3.95041,6.48966 C4.23226,6.18613 4.70681,6.16856 5.01034,6.45041 L8,9.22652 L10.9897,6.45041 C11.2932,6.16856 11.7677,6.18613 12.0496,6.48966 C12.3315,6.7932 12.3139,7.26775 12.0103,7.5496 L8.51034,10.7996 C8.22258,11.0668 7.77743,11.0668 7.48966,10.7996 L3.98966,7.5496 C3.68613,7.26775 3.66856,6.7932 3.95041,6.48966 Z"></path></svg>
          </button>
        <div className={`dropdown ${isGenreDropdownOpen ? 'show' : ''}`}>
          <label class="cyberpunk-checkbox-label">
          <input type="checkbox" class="cyberpunk-checkbox" value="детектив" onChange={handleGenreChange} />
            Детектив
          </label>
          <label class="cyberpunk-checkbox-label">
          <input type="checkbox" class="cyberpunk-checkbox" value="драма" onChange={handleGenreChange} />
            Драма
          </label>
          <label class="cyberpunk-checkbox-label">
          <input type="checkbox" class="cyberpunk-checkbox" value="триллер" onChange={handleGenreChange} />
            Триллер
          </label>
        </div>
      </div>

        <div className='filterOne'>
        <button onClick={toggleRatingDropdown}>
        Рейтинг <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" id="chevron-down"><path fill="#ccc" d="M3.95041,6.48966 C4.23226,6.18613 4.70681,6.16856 5.01034,6.45041 L8,9.22652 L10.9897,6.45041 C11.2932,6.16856 11.7677,6.18613 12.0496,6.48966 C12.3315,6.7932 12.3139,7.26775 12.0103,7.5496 L8.51034,10.7996 C8.22258,11.0668 7.77743,11.0668 7.48966,10.7996 L3.98966,7.5496 C3.68613,7.26775 3.66856,6.7932 3.95041,6.48966 Z"></path></svg>
      </button>
      <div className={`dropdown ${isRatingDropdownOpen ? 'show' : ''}`}>
        <label>
          от&nbsp;&nbsp;
          <input type="number" className='input' name="min" min="0" max="10" value={ratingFilter.min} onChange={handleRatingChange} />
        </label>
        <label>
          до&nbsp;&nbsp;
          <input type="number" className='input' name="max" min="0" max="10" value={ratingFilter.max} onChange={handleRatingChange} />
        </label>
      </div>
      </div>

        <div className='filterOne'>
        <button onClick={toggleYearDropdown}>
        Год <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" id="chevron-down"><path fill="#ccc" d="M3.95041,6.48966 C4.23226,6.18613 4.70681,6.16856 5.01034,6.45041 L8,9.22652 L10.9897,6.45041 C11.2932,6.16856 11.7677,6.18613 12.0496,6.48966 C12.3315,6.7932 12.3139,7.26775 12.0103,7.5496 L8.51034,10.7996 C8.22258,11.0668 7.77743,11.0668 7.48966,10.7996 L3.98966,7.5496 C3.68613,7.26775 3.66856,6.7932 3.95041,6.48966 Z"></path></svg>
      </button>
      <div className={`dropdown ${isYearDropdownOpen ? 'show' : ''}`}>
        <label>
        от&nbsp;&nbsp;
          <input type="number" className='input inputYear' name="start" min="1990" value={yearFilter.start} onChange={handleYearChange} />
        </label>
        <label>
        до&nbsp;&nbsp;
          <input type="number" className='input inputYear' name="end" min="1990" value={yearFilter.end} onChange={handleYearChange} />
        </label>
      </div>
        </div>

        <button onClick={applyFilters}>Применить фильтры</button>
      </div>
      
      </div>
      
      {isLoading ? (
        <div className='container_componentMovieCard_isLoading'>
          <IsLoading/>
        </div>
      ) : (
        <div className='container_movie_pagination'>
        <div className="movie-card-container">
          {movies.map((movie, index) => <MovieCard key={index} movie={movie} toggleFavorite={toggleFavorite} />)}
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
      )}
    </div>
  );
};

export default MovieCardContainer;
