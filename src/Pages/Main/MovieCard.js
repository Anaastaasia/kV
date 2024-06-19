/* src/Pages/Main/MovieCard.js */
import React, { useEffect, useState } from 'react';
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

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.some(fav => fav.id === movie.id);

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
                <>
                <LazyLoadImage
                    alt={movie.name}
                    effect="blur"
                    src={movie.poster.url}
                    className={`movie-poster ${isHovered ? 'show' : ''}`}
                />
                <button className={`favorite-button ${isFavorite ? 'favorite' : ''}`} onClick={handleFavoriteClick}>
                    <svg width="clamp(1.563rem, -0.461rem + 4.26vw, 3rem)" height="clamp(1.563rem, -0.461rem + 4.26vw, 3rem)" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.018 14L3.022 8.46c-1.338-1.482-1.338-3.887 0-5.37 1.438-1.595 3.623-1.354 4.996.167 1.373-1.521 3.559-1.762 4.997-.167 1.338 1.483 1.338 3.888 0 5.37L8.018 14z"
                            className="heart-icon"
                        ></path>
                    </svg>
                </button>
                </>
            )}
            {hasPoster && (
                <div className={`movie-title ${isHovered ? 'show' : ''}`}>
                    <h3>{movie.name}</h3>
                    <p>{roundedRating !== '-' ? roundedRating : <span>-</span>}</p>
                    <p>{year}</p>
                </div>
            )}
        </div>
    );
};

export default MovieCard;
