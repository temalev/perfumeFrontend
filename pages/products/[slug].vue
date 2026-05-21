<template>
  <div v-loading="getProductProcess" class="product-card">
    <Head>
      <Title
        >Купить
        {{
          [
            product?.brand,
            product?.type,
            product.name,
            [`${product?.capacityValue} мл`],
          ]
            .filter(Boolean)
            .join(' ')
        }}</Title
      >
    </Head>

    <bread-crumb :data="breadcrumbs" />
    <div
      v-if="product"
      class="product-card-content gap-4 mt-4"
      itemscope
      itemtype="https://schema.org/Product"
    >
      <img
        :src="image(product?.images[0])"
        :alt="product?.name"
        itemprop="image"
      />
      <div class="d-flex-column">
        <NuxtLink
          v-if="product?.brand"
          :to="`/brand/${slugify(product.brand)}`"
          class="brand-link pointer"
          itemprop="brand"
          itemscope
          itemtype="https://schema.org/Brand"
        >
          <span itemprop="name">{{ product?.brand }}</span>
        </NuxtLink>
        <h1 v-if="product?.name" itemprop="name" class="product-title">
          {{ fullProductTitle }}
        </h1>
        <span class="text-secondary"
          >Артикул:
          <span itemprop="sku">{{ product?.article }}</span></span
        >

        <div class="options mt-4">
          <div class="options-label">Объем/мл</div>
          <div class="options-item-list">
            <div
              v-for="option in options"
              :key="option.id"
              class="options-item"
              :class="{ active: option.id === product.id }"
              @click="
                $router.replace({
                  name: 'products-slug',
                  params: { slug: option.slug },
                })
              "
            >
              {{ option.capacity }}
            </div>
          </div>
        </div>
        <div
          itemprop="offers"
          itemscope
          itemtype="https://schema.org/Offer"
          class="offer-block"
        >
          <meta itemprop="priceCurrency" content="RUB" />
          <link itemprop="availability" href="https://schema.org/InStock" />
          <link
            itemprop="itemCondition"
            href="https://schema.org/NewCondition"
          />
          <link itemprop="url" :href="productUrl" />
          <div class="price mb-4" itemprop="price" :content="product?.price">
            {{ new Intl.NumberFormat('ru').format(product?.price) }} ₽
          </div>
          <div class="d-flex">
            <el-button
              @click="addToShopBag(product.slug)"
              size="large"
              type="primary"
              >Добавить в корзину</el-button
            >
            <el-button
              v-if="!isFavorite"
              style="width: 42px"
              size="large"
              :loading="favoriteLoading"
              @click="addProductToFavorites(product.slug)"
            >
              <Icon
                v-if="!favoriteLoading"
                name="ph:tag-bold"
                style="font-size: 20px"
              />
            </el-button>
            <el-button
              v-else
              style="width: 42px"
              size="large"
              :loading="favoriteLoading"
              @click="deleteFavoriteProduct(product.id)"
            >
              <Icon
                v-if="!favoriteLoading"
                name="ph:tag-fill"
                style="font-size: 20px; color: black"
              />
            </el-button>
          </div>
        </div>
        <div class="product-card-info">
          <div class="product-card-info-header">Подробные характеристики</div>
          <ul class="product-card-info-list">
            <li class="product-card-info-item">
              <div class="product-card-info-item-label">
                <div class="product-card-info-item-label-text">
                  Тип продукта
                </div>
                <div class="filled-container" />
              </div>
              <span>{{ product?.type }}</span>
            </li>
            <li class="product-card-info-item">
              <div class="product-card-info-item-label">
                <div class="product-card-info-item-label-text">Для кого</div>
                <div class="filled-container" />
              </div>

              <span>{{ product?.data.gender }}</span>
            </li>
            <li class="product-card-info-item">
              <div class="product-card-info-item-label">
                <div class="product-card-info-item-label-text">Страна</div>
                <div class="filled-container" />
              </div>

              <span>{{ product?.data.country }}</span>
            </li>
            <li
              v-for="note in product?.data?.notes"
              :key="note.name"
              class="product-card-info-item"
            >
              <div class="product-card-info-item-label">
                <div class="product-card-info-item-label-text">
                  {{ note.name }}
                </div>
                <div class="filled-container" />
              </div>

              <span>{{ note.value }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p>{{ product?.description }}</p>
    <log-in
      v-if="isLoginModal"
      @close="isLoginModal = false"
      @success="addProductToFavorites()"
    />

    <div v-if="products.length" class="d-flex-column brands-products">
      <h2>Продукты этого бренда</h2>
      <div class="scroll mt-5 mb-4">
        <product-card
          v-for="product in products"
          :key="product.id"
          :data="product"
          class="card"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const config = useRuntimeConfig();
const apiUrl = config.public.URL;
const route = useRoute();
const slug = route.params.slug;

const [{ data: product }, { data: categories }] = await Promise.all([
  useAsyncData('product', () => $fetch(`${apiUrl}/products/${slug}`)),
  useAsyncData('categories', () => $fetch(`${apiUrl}/categories`).catch(() => [])),
]);

const productUrl = computed(() => {
  const p = product.value;
  return p?.slug ? `https://parfburo.com/products/${p.slug}` : 'https://parfburo.com';
});

const fullProductTitle = computed(() => {
  const p = product.value;
  if (!p) return '';
  return [p.brand, p.name, p.capacityValue && `${p.capacityValue} мл`]
    .filter(Boolean)
    .join(' ');
});

const productCategory = computed(() => {
  const p = product.value;
  const list = categories.value;
  if (!p?.categoryIds?.length || !Array.isArray(list)) return null;
  return list.find(c => c.id === p.categoryIds[0]) || null;
});

import { slugify } from '~/utils/slugify.js';

const breadcrumbs = computed(() => {
  const p = product.value;
  const items = [{ name: 'Главная', path: '/' }];
  const cat = productCategory.value;
  if (cat?.name) {
    items.push({
      name: cat.name,
      path: `/category/${slugify(cat.name)}`,
    });
  }
  if (p?.brand) {
    items.push({
      name: p.brand,
      path: `/brand/${slugify(p.brand)}`,
    });
  }
  items.push({ name: fullProductTitle.value || p?.name || 'Товар' });
  return items;
});

if (product.value) {
  const p = product.value;
  const fullName = [p.brand, p.name].filter(Boolean).join(' ');
  const descParts = [p.type, p.brand, p.name, p.capacityValue && `${p.capacityValue} мл`]
    .filter(Boolean)
    .join(' ');
  const ogImage = p.images?.length ? p.images[0] : 'https://parfburo.com/img/logo.webp';
  const productUrlStr = productUrl.value;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: fullName || p.name,
    description: `Купить ${descParts} в интернет-магазине ПарфБюро.`,
    image: p.images?.length ? p.images : [ogImage],
    sku: p.article,
    url: productUrlStr,
    brand: p.brand ? { '@type': 'Brand', name: p.brand } : undefined,
    offers: {
      '@type': 'Offer',
      url: productUrlStr,
      priceCurrency: 'RUB',
      price: p.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': 'https://parfburo.com/#organization' },
    },
  };

  const cat = productCategory.value;
  const crumbItems = [
    { name: 'Главная', item: 'https://parfburo.com' },
    ...(cat?.name ? [{
      name: cat.name,
      item: `https://parfburo.com/category/${slugify(cat.name)}`,
    }] : []),
    ...(p.brand ? [{
      name: p.brand,
      item: `https://parfburo.com/brand/${slugify(p.brand)}`,
    }] : []),
    { name: fullName || p.name, item: productUrlStr },
  ];
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbItems.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  };

  useSiteSeo({
    title: `Купить ${fullName || 'товар'} — ПарфБюро`,
    description: `Купить ${descParts} в Москве по низкой цене в интернет-магазине ПарфБюро. Подробное описание, состав, фото. Быстрая доставка по всей России.`,
    keywords: `${fullName || 'товар'} купить, цена, интернет-магазин, каталог, бесплатная доставка, Москва, Рязань, оригинал`,
    image: ogImage,
    url: productUrlStr,
    type: 'product',
  });

  injectJsonLd([productJsonLd, breadcrumbJsonLd]);
}

defineExpose({
  product,
});
</script>

<script>
import {
  getProduct,
  getGroupProduct,
  getProducts,
  deleteFavorite,
  addToFavorites,
  getFavorites,
} from '@/api/productApi.js';
import BreadCrumb from '~/components/ui/BreadCrumb.vue';
import LogIn from '~/components/LogIn.vue';
import ProductCard from '~/components/ProductCard.vue';

export default {
  components: { BreadCrumb, LogIn, ProductCard },
  data() {
    return {
      preloadedProduct: null,
      getProductProcess: false,
      options: [],
      ordersSlugs: useState('ordersSlugs'),
      user: null,
      isLoginModal: false,
      products: [],
      favoriteLoading: true,
      isFavorite: false,
    };
  },
  watch: {
    // '$route.query'() {
    //   this.getNewProduct();
    // },
  },
  mounted() {
    this.user = localStorage.getItem('user');

    const instance = getCurrentInstance();
    if (instance?.exposed?.product?.value) {
      this.preloadedProduct = instance.exposed.product.value;
      this.getFavoriteProducts();
      this.getGroupProduct();
      this.getProducts();
    } else {
      this.getNewProduct();
    }
  },

  methods: {
    async deleteFavoriteProduct(id) {
      this.favoriteLoading = true;
      try {
        await deleteFavorite(id);

        this.isFavorite = false;
      } catch (e) {
        console.error(e);
      }
      this.favoriteLoading = false;
    },
    async getNewProduct() {
      this.getProductProcess = true;
      try {
        const res = await getProduct(this.$route.params.slug, this.user);
        this.preloadedProduct = res;
        this.getGroupProduct();
        this.getProducts();
      } catch (e) {
        console.error(e);
      }
      this.getProductProcess = false;
    },
    async addProductToFavorites() {
      if (!this.user) {
        this.isLoginModal = true;
        return;
      }

      this.favoriteLoading = true;
      try {
        await addToFavorites(this.preloadedProduct.slug);
        this.isFavorite = true;
      } catch (e) {
        console.error(e);
      }
      this.favoriteLoading = false;
    },
    addToShogroupIdpBag(slug) {
      if (window.localStorage.getItem('ordersSlugs')) {
        this.ordersSlugs.push(slug);
        if (this.ordersSlug?.length) {
          window.localStorage.setItem('ordersSlugs', this.ordersSlugs);
        } else {
          window.localStorage.removeItem('ordersSlugs');
        }
      } else {
        this.ordersSlugs.push(slug);
        window.localStorage.setItem('ordersSlugs', slug);
      }
    },
    image(url) {
      return url ? url : '/img/no_image.png';
    },
    async getFavoriteProducts() {
      if (!this.user) {
        this.favoriteLoading = false;
        return;
      }

      try {
        this.favoriteLoading = true;
        const favoritesProducts = await getFavorites();
        this.isFavorite = favoritesProducts.some(
          fp => fp?.product?.id === this.preloadedProduct.id
        );
      } catch (e) {
        console.error(e);
      } finally {
        this.favoriteLoading = false;
      }
    },
    async getGroupProduct() {
      try {
        const res = await getGroupProduct(this.preloadedProduct.groupId);
        this.options = res;
      } catch (e) {
        console.error(e);
      }
    },
    async getProducts() {
      this.getProductsProcess = true;
      const params = { brand: this.preloadedProduct?.brand };
      try {
        const res = await getProducts(params);
        this.products = res;
      } catch (e) {
        console.error(e);
      }
      this.getProductsProcess = false;
    },
    addToShopBag(slug) {
      if (window.localStorage.getItem('ordersSlugs')) {
        this.ordersSlugs.push(slug);
        if (this.ordersSlug?.length) {
          window.localStorage.setItem('ordersSlugs', this.ordersSlugs);
        } else {
          window.localStorage.removeItem('ordersSlugs');
        }
      } else {
        this.ordersSlugs.push(slug);
        window.localStorage.setItem('ordersSlugs', slug);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.product-card {
  margin: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 12px;

  img {
    width: 50%;
    max-height: 500px;
    object-fit: contain;
  }

  &-content {
    display: flex;
  }
}

.price {
  font-size: 32px;
}

.brand-link {
  display: inline-block;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #2a4d84;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.product-title {
  font-size: 24px;
  margin: 4px 0 0;
}

.product-card-info-header {
  font-weight: 600;
  margin-bottom: 12px;
  margin-top: 20px;
}
.product-card-info-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.product-card-info-item {
  display: flex;
  font-size: 14px;
}
.product-card-info-item-label {
  display: flex;
  width: 200px;
  align-items: flex-end;
  flex-shrink: 0;
  &-text {
    flex-shrink: 0;
  }
}

.filled-container {
  width: 100%;
  border-bottom: 1px dotted #c8c8c8;
}

.options {
  margin-top: 8px;
  margin-bottom: 20px;
}

.options-item-list {
  display: flex;
  gap: 6px;
  margin-top: 4px;
  height: 40px;
}

.options-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  color: #000;
  border-radius: 50%;
  border: 1px solid #000;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
  flex-shrink: 0;
  font-size: 11px;

  &:hover {
    background-color: #000;
    color: #fff;
  }

  &.active {
    background-color: #000;
    color: #fff;
  }
}

.scroll {
  display: flex;
  overflow: auto;
  gap: 12px;
  padding: 20px;
}

.brands-products {
  margin: 40px;
}

@media (max-width: 800px) {
  .brands-products {
    margin: 0px;
  }
  .product-card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    // h1 {
    //   font-size: 20px;
    // }
    img {
      height: 200px;
      object-fit: contain;
    }
  }
  .scroll {
    scroll-snap-type: x mandatory;

    & .card {
      scroll-snap-align: center;
    }
  }
}
</style>
