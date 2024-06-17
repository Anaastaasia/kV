import React, { useState, useEffect } from 'react';
import top from './TopFilms';
import './css/Poster.css';

const Poster = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [resetTimer, setResetTimer] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % top.length);
        }, 3000);

        return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }, [resetTimer, currentIndex]);

    const handleClick = (index) => {
        setCurrentIndex(index);
        setResetTimer(!resetTimer); // Сброс таймера
    };

    const currentFilm = top[currentIndex].docs[0];
    const backdropUrl = currentFilm.backdrop.url;

    return (
    <div className='poster_container'>
        <div className="poster" style={{
            backgroundImage: `linear-gradient(to right, black 20%, transparent 80%), url(${backdropUrl})`,

            backgroundSize: 'cover',
        }}>
            <div className='description'>
                <h1>{currentFilm.name}</h1>
                <p className='text'>
                    {currentFilm.shortDescription}
                </p>
            </div>

            <div className="dots-container">
                {top.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>
        </div>
    </div>
        
    );
};

export default Poster;
