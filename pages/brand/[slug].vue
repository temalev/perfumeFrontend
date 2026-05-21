<template>
  <main class="catalog-page">
    <BreadCrumb :data="breadcrumbs" />
    <h1 class="catalog-page-title">
      Парфюмерия {{ brandName }} — купить в ПарфБюро
    </h1>
    <p class="catalog-page-desc">
      Оригинальная парфюмерия {{ brandName }} в интернет-магазине ПарфБюро.
      Полный каталог ароматов с быстрой доставкой по Москве, Рязани и СДЭК
      по всей России.
    </p>
    <div v-if="products.length" class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :data="product"
      />
    </div>
    <p v-else class="empty">Товары этого бренда временно недоступны.</p>
  </main>
</template>

<script setup>
import BreadCrumb from '~/components/ui/BreadCrumb.vue';
import ProductCard from '~/components/ProductCard.vue';
import { slugify } from '~/utils/slugify.js';

const route = useRoute();
const config = useRuntimeConfig();
const apiUrl = config.public.URL;
const slug = route.params.slug;

const { data: brands } = await useAsyncData('all-brands', () =>
  $fetch(`${apiUrl}/products/brands`).catch(() => []),
);

const brandName = (brands.value || []).find(b => slugify(b) === slug);

if (!brandName) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Бренд не найден',
    fatal: true,
  });
}

const { data: productsData } = await useAsyncData(
  `brand-${slug}-products`,
  () =>
    $fetch(`${apiUrl}/products`, { params: { brand: brandName } }).catch(
      () => [],
    ),
  { default: () => [] },
);

const products = computed(() => productsData.value || []);

const pageUrl = `https://parfburo.com/brand/${slug}`;

const breadcrumbs = [
  { name: 'Главная', path: '/' },
  { name: 'Каталог', path: '/products/list' },
  { name: brandName },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://parfburo.com' },
    { '@type': 'ListItem', position: 2, name: 'Каталог', item: 'https://parfburo.com/products/list' },
    { '@type': 'ListItem', position: 3, name: brandName, item: pageUrl },
  ],
};

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${pageUrl}#collection`,
  url: pageUrl,
  name: `${brandName} — каталог парфюмерии`,
  isPartOf: { '@id': 'https://parfburo.com/#website' },
  about: { '@type': 'Brand', name: brandName },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: products.value.length,
    itemListElement: products.value.slice(0, 30).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://parfburo.com/products/${p.slug}`,
      name: [p.brand, p.name].filter(Boolean).join(' '),
    })),
  },
};

useSiteSeo({
  title: `${brandName} — купить парфюмерию в ПарфБюро`,
  description: `Оригинальная парфюмерия ${brandName} в интернет-магазине ПарфБюро. Каталог ароматов ${brandName} с быстрой доставкой по Москве, Рязани и СДЭК по всей России.`,
  keywords: `${brandName}, ${brandName} купить, ${brandName} оригинал, парфюмерия ${brandName}, духи ${brandName}, цена ${brandName}, интернет-магазин`,
  url: pageUrl,
});

injectJsonLd([breadcrumbJsonLd, collectionJsonLd]);
</script>

<style scoped lang="scss">
.catalog-page {
  padding: 24px 40px 60px;
  min-height: 100vh;

  @media (max-width: 500px) {
    padding: 20px;
  }
}

.catalog-page-title {
  margin: 16px 0 8px;
  font-size: 28px;
  @media (max-width: 600px) {
    font-size: 22px;
  }
}

.catalog-page-desc {
  margin: 0 0 24px;
  color: #555;
  max-width: 820px;
  line-height: 1.5;
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 22px;
  margin-top: 24px;
}

.empty {
  color: #888;
  margin-top: 24px;
}
</style>
