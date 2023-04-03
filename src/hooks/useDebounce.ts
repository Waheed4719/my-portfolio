import { useEffect, useRef, useCallback } from 'react';

const useDebounce = <T extends unknown[]>(
    func: (...args: T) => void,
    delay: number
): ((...args: T) => void) => {
    const timeoutRef = useRef<NodeJS.Timeout>();

    const debouncedFunc = useCallback(
        (...args: T) => {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                func(...args);
            }, delay);
        },
        [func, delay]
    );

    useEffect(
        () => () => {
            clearTimeout(timeoutRef.current);
        },
        []
    );

    return debouncedFunc;
};

export default useDebounce;
