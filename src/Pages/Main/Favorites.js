    import React, { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import MovieCard from './MovieCard';
    import './css/Favorites.css'

    const Favorites = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
        console.log('Избранные фильмы:', savedFavorites); // Добавим лог для отладки
    }, []);

    return (
        <div className='container_favorites'>
        <button onClick={() => navigate(-1)}>Назад</button>
        <h1>Избранные фильмы</h1>
        <div className="movie-card-container">
            {favorites.length === 0 ? (
            <p>Нет избранных фильмов</p>
            ) : (
            favorites.map((movie, index) => (
                <MovieCard
                key={index}
                movie={movie}
                toggleFavorite={() => {}}
                />
            ))
            )}
        </div>
        </div>
    );
    };

    export default Favorites;
