// tailwind.config.js
export default {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          monokai: {
            background: '#272822',
            foreground: '#F8F8F2',
            foregroundLight: '#E6E6E6',
            sidebar: '#3E3D32',
            input: '#49483E',
            button: '#66D9EF',
            hover: '#A6E22E',
          },
        },
      },
    },
    plugins: [],
  };
      