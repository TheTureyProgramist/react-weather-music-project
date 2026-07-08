export function register() {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      // Вказуємо точний шлях до файлу воркера з урахуванням назви репозиторію на GitHub Pages
      const swUrl = '/react-weather-music-project/sw.js';

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('Stykhiya PWA: Service Worker успішно зареєстровано! ', registration.scope);
        })
        .catch((error) => {
          console.error('Stykhiya PWA: Помилка реєстрації Service Worker:', error);
        });
    });
  }
}