import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['**/*.vue'],
    rules: {
      'no-console': 'off' // allow console.log in TypeScript files
    }
  }
)