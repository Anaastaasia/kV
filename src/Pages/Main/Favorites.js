    import React, { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import MovieCard from './MovieCard';
    import './css/Favorites.css';
    import useIntersectionObserver from './hooks/useIntersectionObserver';


    const Favorites = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
        console.log('Избранные фильмы:', savedFavorites); 
    }, []);

    const toggleFavorite = (movie) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
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
        <div className='container_favorites'>
            <button className='button_back' onClick={() => navigate(-1)}>
                <svg width="48" height="48" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11 8l1.415-1.414 4.95-4.95 1.414 1.414L6.94 8l4.95 4.95-1.414 1.414-4.95-4.95L4.111 8z" fill="#dfd9d0"></path>
                </svg>
            </button>
            <div className='container_favoritesCards animate-on-scroll'>
        <h1 className='header_favorites'>Избранные фильмы</h1>
        <div className="movie-card-container">
            {favorites.length === 0 ? (
            <p>Нет избранных фильмов</p>
            ) : (
            favorites.map((movie, index) => (
                <MovieCard
                key={index}
                movie={movie}
                toggleFavorite={toggleFavorite}
                />
            ))
            )}
        </div>
        </div>
        </div>
    );
    };

    export default Favorites;
