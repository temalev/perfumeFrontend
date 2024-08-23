import type { FontProvider } from '@nuxt/fonts';

const resolvableFonts = new Set<string>();
export default {
  async setup() {
    // Do some stuff
    resolvableFonts.add('SomeFontFromCustomProvider');
  },
  async resolveFontFaces(fontFamily) {
    if (!resolvableFonts.has(fontFamily)) {
      return;
    }
    return {
      fonts: {
        src: '/fonts/anselmsans.woff2',
      },
    };
  },
} satisfies FontProvider;
