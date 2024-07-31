// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	css: ['~/assets/styles/main.css', '~/assets/styles/common.scss'],
	modules: ['@nuxt/eslint'],
	eslint: {
		config: {
			stylistic: {
				// indent: 'tab',
				semi: true,
			},
		},
	},
});
