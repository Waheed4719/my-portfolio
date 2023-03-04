/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            screens: {
                lg: '920px'
            }
        },
        colors: {
            ...colors,
            red: '#ff4a57',
            white: '#fff'
        }
    },
    plugins: []
};
