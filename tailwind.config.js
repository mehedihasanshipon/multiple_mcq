const defaultTheme = require('tailwindcss/defaultTheme');
const colors  = require('tailwindcss/colors')


module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors:{
                primary: '#35C0F4',
                secondary: '#F0F9FF',
                tertiary: '#10B981',
                'tertiary-dark': '#047857',
                danger: '#EF4444',
                dangerDark: '#DC2626',
                dark: '#0E7490',
                light: '#E0F2FE',
                cyan: colors.cyan
            },
        },
    },

    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
