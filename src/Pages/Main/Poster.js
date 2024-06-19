import React, { useState, useEffect } from 'react';
import top from './TopFilms';
import './css/Poster.css';
import useIntersectionObserver from './hooks/useIntersectionObserver';

const Poster = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [resetTimer, setResetTimer] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % top.length);
        }, 5000);

        return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }, [resetTimer, currentIndex]);

    const handleClick = (index) => {
        setCurrentIndex(index);
        setResetTimer(!resetTimer); // Сброс таймера
    };

    const currentFilm = top[currentIndex].docs[0];
    const backdropUrl = currentFilm.backdrop.url;

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
    <div className='poster_container'>
        <div className="poster animate-on-scroll" style={{
            backgroundImage: `url(${backdropUrl})`,

            backgroundSize: 'cover',
        }}>
            <div className='description animate-on-scroll'>
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
