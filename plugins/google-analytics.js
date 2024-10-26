// plugins/google-analytics.js
export default defineNuxtPlugin(nuxtApp => {
  // Инициализация Google Analytics
  if (process.env.NODE_ENV === 'production') {
    // Добавление тега для gtag.js
    const scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=G-P53X3TN8G0`;
    document.head.appendChild(scriptTag);

    // Инициализация dataLayer и gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', 'G-P53X3TN8G0');

    // Добавление функции gtag в nuxtApp для глобального использования
    nuxtApp.provide('gtag', gtag);
  }
});
