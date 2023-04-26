import { createContext, useCallback, useState, useEffect } from 'react';

type DisplayModeContextState = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
};

type DisplayModeProviderProps = {
    children: React.ReactNode;
};
export const DisplayModeContext = createContext<DisplayModeContextState>({
    isDarkMode: false,
    toggleDarkMode: () => {}
});

const htmlDocument = document.getElementsByTagName('html')[0];
const toggleDisplayModeClass = (displayMode: boolean): void => {
    if (displayMode) {
        htmlDocument.classList.add('dark');
    } else {
        htmlDocument.classList.remove('dark');
    }
    localStorage.setItem('isDarkMode', displayMode.toString());
};
export const DisplayModeProvider = ({ children }: DisplayModeProviderProps) => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('isDarkMode') === 'true') {
            setIsDarkMode(true);
            toggleDisplayModeClass(true);
        } else if (localStorage.getItem('isDarkMode') === 'false') {
            setIsDarkMode(false);
            toggleDisplayModeClass(false);
        } else {
            toggleDisplayModeClass(isDarkMode);
        }
    }, []);

    const toggleDarkMode = useCallback(() => {
        setIsDarkMode((prevDisplayMode) => {
            toggleDisplayModeClass(!prevDisplayMode);
            return !prevDisplayMode;
        });
    }, [isDarkMode]);

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <DisplayModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DisplayModeContext.Provider>
    );
};
