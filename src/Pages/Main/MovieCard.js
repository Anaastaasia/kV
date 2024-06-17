/* src/Pages/Main/MovieCard.js */
import React, { useState } from 'react';
import './css/MovieCardContainer.css';

const MovieCard = ({ movie }) => {
    const [isHovered, setIsHovered] = useState(false);

    const hasPoster = movie.poster && movie.poster.url;

    return (
    <div
        className={`movie-card ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ backgroundImage: hasPoster ? `url(${movie.poster.url})` : 'none' }}
    >
        {hasPoster && (
        <div className={`movie-title ${isHovered ? 'show' : ''}`}>
            <h3>{movie.name}</h3>
        </div>
        )}
    </div>
    );
};

export default MovieCard;
