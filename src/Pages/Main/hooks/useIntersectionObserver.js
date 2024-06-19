    import { useEffect, useRef } from 'react';

    const useIntersectionObserver = (callback, options) => {
    const elementsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(callback, options);
        const elements = elementsRef.current;

        elements.forEach(element => {
        if (element) observer.observe(element);
        });

        return () => {
        elements.forEach(element => {
            if (element) observer.unobserve(element);
        });
        };
    }, [callback, options]);

    return elementsRef;
    };

    export default useIntersectionObserver;
