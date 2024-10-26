export default defineNuxtPlugin(nuxtApp => {
  if (process.client) {
    // Подключаем скрипт Google Tag Manager асинхронно
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-P53X3TN8G0';
    document.head.appendChild(script);

    // Настраиваем функцию gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'G-P53X3TN8G0');
  }
});
