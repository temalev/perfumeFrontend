// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss', '~/assets/styles/common.scss'],
  modules: ['@nuxt/eslint', 'nuxt-icon', '@nuxt/fonts'],
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
