/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        colors: {
            ...colors,
            red: '#ff4a57',
            white: '#fff'
        }
    },
    plugins: []
};
