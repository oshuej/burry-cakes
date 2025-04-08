/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html'
    ],
    safelist: [
        'p-button',
        'p-button-danger',
        'p-button-success',
        'p-button-outlined',
        'text-center',
        'text-left',
        'text-right',
        'bg-red-500',
        'bg-green-500',
        'text-sm',
        'text-md',
        'text-lg',
        'text-xl',
        'flex',
        'align-items-center',
        'gap-3',
        'p-2',
        'p-3',
        'p-5',
        'mt-3',
        'ml-auto',
        'hidden',
        'rounded',
        'special-items',
        'special-item',
        'special-item_light'
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
