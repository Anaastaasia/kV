/* src/Pages/Main/MovieCard.js */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/MovieCardContainer.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MovieCard = ({ movie, toggleFavorite }) => {
    const [isHovered, setIsHovered] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Чтобы не срабатывал переход на страницу фильма
        toggleFavorite(movie);
    };


    const isFavorite = localStorage.getItem('favorites')?.includes(movie.id);

    const hasPoster = movie.poster && movie.poster.url;
    const year = movie.year ? movie.year : 'N/A';
    const firstGenre = movie.genres ? movie.genres[0].name : 'N/A';
    const roundedRating = movie.rating.kp ? movie.rating.kp.toFixed(1) : '-';

    return (
        <div
            className={`movie-card ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            {hasPoster && (
                <LazyLoadImage
                    alt={movie.name}
                    effect="blur"
                    src={movie.poster.url}
                    className={`movie-poster ${isHovered ? 'show' : ''}`}
                />
            )}
            {hasPoster && (
                <div className={`movie-title ${isHovered ? 'show' : ''}`}>
                    <h3>{movie.name}</h3>
                    <p>{roundedRating !== '-' ? roundedRating : <span>-</span>}</p>
                    <p>{year}</p>
                    <button className={`favorite-button ${isFavorite ? 'favorite' : ''}`} onClick={handleFavoriteClick}>
                        ♥
                    </button>
                </div>
            )}
        </div>
    );
};

export default MovieCard;
