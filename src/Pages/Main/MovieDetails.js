import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/MovieDetails.css'
import IsLoading from './Loading';
import useIntersectionObserver from './hooks/useIntersectionObserver';

const MovieDetail = () => {

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
    

    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
        try {
            const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-API-KEY': 'R1FCW2T-PB6MF8D-QZHZAVR-EZ2K5BP',
            },
            });
            const data = await response.json();
            setMovie(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching movie:', error);
            setIsLoading(false);
        }
        };

    fetchMovie();
    }, [id]);

    if (isLoading) {
        return <div className='container_componentMovieDetails_isLoading'>
                    <IsLoading/>;
                </div>
    }

    if (!movie) {
        return <div>Movie not found</div>;
    }


    return (
        <div className='container_details'>
            <button className='button_back' onClick={() => navigate(-1)}>
            <svg width="48" height="48" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11 8l1.415-1.414 4.95-4.95 1.414 1.414L6.94 8l4.95 4.95-1.414 1.414-4.95-4.95L4.111 8z" fill="#dfd9d0"></path>
</svg>
            </button>
            <div className='details_descriptions animate-on-scroll'>
                <h1 className='header'>{movie.name}</h1>
                <div className='details_description'>
                    <p>{movie.description}</p>
                    {movie.rating.kp === 0 ? 'Рейтинг:  Недостаточно оценок, рейтинг формируется' : <p>Рейтинг: {movie.rating.kp}</p>}
                    <p>Год выпуска: {movie.year}</p>
                    <p>Жанры: {movie.genres.map((genre) => genre.name).join(', ')}</p>
                </div>
            </div>
            <div className='container_img'>
            <img className='poster_details animate-on-scroll' src={movie.poster?.url} alt={movie.name} />
            </div>
        </div>
    );
    };

    export default MovieDetail;
