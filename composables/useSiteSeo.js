const SITE_NAME = 'ПарфБюро';
const SITE_URL = 'https://parfburo.com';
const FALLBACK_IMAGE = `${SITE_URL}/img/logo.webp`;

export function useSiteSeo({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  locale = 'ru_RU',
  twitterCard = 'summary_large_image',
  canonical,
  robots,
} = {}) {
  const ogImage = image || FALLBACK_IMAGE;

  useSeoMeta({
    title,
    description,
    keywords,
    ogSiteName: SITE_NAME,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogUrl: url,
    ogType: type,
    ogLocale: locale,
    twitterCard,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    robots,
  });

  const canonicalHref = canonical || url;
  if (canonicalHref) {
    useHead({
      link: [{ rel: 'canonical', href: canonicalHref }],
    });
  }
}

export function injectJsonLd(jsonLdOrArray) {
  const items = Array.isArray(jsonLdOrArray) ? jsonLdOrArray : [jsonLdOrArray];
  useHead({
    script: items.map(data => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(data),
    })),
  });
}
