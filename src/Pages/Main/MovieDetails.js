import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'X-API-KEY': 'YOUR_API_KEY' } // Убедитесь, что ваш ключ API указан здесь
};

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, options);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{movie.name}</h1>
            <img src={movie.poster?.url} alt={movie.name} />
            <p>{movie.description}</p>
            <p>Год: {movie.year}</p>
            <p>Рейтинг IMDb: {movie.rating.kp}</p>
            <p>Жанры: {movie.genres.map(genre => genre.name).join(', ')}</p>
            {/* Добавьте здесь любую другую информацию, которую хотите отображать */}
        </div>
    );
};

export default MovieDetails;
