<template>
  <main class="catalog-page">
    <BreadCrumb :data="breadcrumbs" />
    <h1 class="catalog-page-title">
      {{ category.name }} — купить в ПарфБюро
    </h1>
    <p class="catalog-page-desc">
      Категория «{{ category.name }}» в интернет-магазине ПарфБюро. Только
      оригинальная парфюмерия с быстрой доставкой по Москве, Рязани и СДЭК
      по всей России.
    </p>
    <div v-if="products.length" class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :data="product"
      />
    </div>
    <p v-else class="empty">Товары этой категории временно недоступны.</p>
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

const { data: categories } = await useAsyncData('all-categories', () =>
  $fetch(`${apiUrl}/categories`).catch(() => []),
);

const category = (categories.value || []).find(c => slugify(c.name) === slug);

if (!category) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Категория не найдена',
    fatal: true,
  });
}

const { data: productsData } = await useAsyncData(
  `category-${slug}-products`,
  () =>
    $fetch(`${apiUrl}/products`, { params: { categoryId: category.id } }).catch(
      () => [],
    ),
  { default: () => [] },
);

const products = computed(() => productsData.value || []);

const pageUrl = `https://parfburo.com/category/${slug}`;

const breadcrumbs = [
  { name: 'Главная', path: '/' },
  { name: 'Каталог', path: '/products/list' },
  { name: category.name },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://parfburo.com' },
    { '@type': 'ListItem', position: 2, name: 'Каталог', item: 'https://parfburo.com/products/list' },
    { '@type': 'ListItem', position: 3, name: category.name, item: pageUrl },
  ],
};

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${pageUrl}#collection`,
  url: pageUrl,
  name: `${category.name} — каталог парфюмерии`,
  isPartOf: { '@id': 'https://parfburo.com/#website' },
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
  title: `${category.name} — купить в ПарфБюро`,
  description: `${category.name} в интернет-магазине ПарфБюро. Оригинальная парфюмерия с быстрой доставкой по Москве, Рязани и СДЭК по всей России.`,
  keywords: `${category.name}, ${category.name.toLowerCase()} купить, парфюмерия ${category.name.toLowerCase()}, интернет-магазин, Москва, Рязань, оригинал`,
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
