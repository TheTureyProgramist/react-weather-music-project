/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Обов'язково для GitHub Pages
  basePath: '/react-weather-music-project',
  assetPrefix: '/react-weather-music-project',
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true, // GitHub Pages не підтримує стандартну оптимізацію зображень Next.js
  },
};

module.exports = nextConfig;