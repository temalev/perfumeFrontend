// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'ПарфБюро',
      meta: [
        { name: 'description', content: 'Оригиналы мировых брендов' },
        { property: 'og:site_name', content: 'ПарфБюро' },
      ],
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  css: ['~/assets/styles/main.scss', '~/assets/styles/common.scss', '~/assets/styles/element-ui.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/styles/variables.scss";`,
        },
      },
    },
  },
  plugins: [
    '~/plugins/yandex-metrika.client.js', '~/plugins/maska.js',
  ],
  modules: ['@nuxt/eslint', 'nuxt-icon', '@nuxt/fonts', '@nuxt/icon'],
  ssr: true,
  runtimeConfig: {
    public: {
      URL: process.env.URL || process.env.PUBLIC_API_BASE_URL,
      NODE_ENV: process.env.NODE_ENV || 'production',
    },
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