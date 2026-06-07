import { useState, useLayoutEffect } from 'react';

const useWindowScroll = () => {
    const [scrollPosition, setScrollPosition] = useState(window.scrollY);

    useLayoutEffect(() => {
        const updateScrollPosition = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', updateScrollPosition);
        return () => window.removeEventListener('scroll', updateScrollPosition);
    }, []);

    return scrollPosition;
};

export default useWindowScroll;
