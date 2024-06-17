/* src/Pages/Main/MovieCard.js */
import React, { useState } from 'react';
import './css/MovieCardContainer.css';

const MovieCard = ({ movie }) => {
    const [isHovered, setIsHovered] = useState(false);

    const hasPoster = movie.poster && movie.poster.url;
    const year = movie.year ? movie.year : 'N/A';
    const firstGenre = movie.genres ? movie.genres[0].name : 'N/A';  

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
            <p>
                {movie.rating.imdb !== 0 ? movie.rating.imdb : <span>-</span>}
            </p>
            <p>{year}</p>
            <p>{firstGenre}</p>
        </div>
        )}
    </div>
    );
};

export default MovieCard;
