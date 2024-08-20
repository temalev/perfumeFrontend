// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss', '~/assets/styles/common.scss'],
  modules: ['@nuxt/eslint', 'nuxt-icon', '@nuxt/fonts'],
  ssr: true,
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NODE_ENV === 'production'
        ? process.env.PUBLIC_API_BASE_URL
        : process.env.DEV_API_BASE_URL,
    },
    devApiBaseUrl: process.env.DEV_API_BASE_URL, // доступно только на сервере
  },
  fonts: {
    providers: {
      custom: '~/providers/custom',
    },
    families: [
      { name: 'anselmSans', src: '/fonts/anselmsans.woff2' },
    ],
    defaults: {
      fallbacks: {
        monospace: ['Tahoma'],
      },
    },
  },
  eslint: {
    config: {
      stylistic: {
        // indent: 'tab',
        semi: true,
      },
    },
  },
});
