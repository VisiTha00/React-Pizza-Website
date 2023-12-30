/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        abril: 'Abril Fatface',
        quicksand: 'Quicksand',
      },
      height: {
        screen: '100dvh',
      },
      width: {
        screen: '100dvw',
      },
      backgroundImage: {
        pizzaRest:
          "url('https://popmenucloud.com/cdn-cgi/image/width=1920,height=1920,format=auto,fit=scale-down/acopktgy/ae0bbbfd-5344-4410-94a0-0cc55a9595ac')",
      },
      blur: {
        border: '8px', // You can adjust the blur amount here
      },
    },
  },
  plugins: [require('tailwindcss-filters')],
};
