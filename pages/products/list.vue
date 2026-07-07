<template>
  <main v-loading="getProductsProcess" class="catalog-page">
    <Head>
      <Title v-if="params.brand"
        >{{ params.brand }} - Купить в ПарфБюро по выгодной цене</Title
      >
    </Head>

    <BreadCrumb :data="breadcrumbs" />
    <h1 class="catalog-page-title">{{ catalogHeading }}</h1>
    <p class="catalog-page-desc">{{ catalogDesc }}</p>

    <div class="d-flex-column filters-wrap">
      <div
        v-if="isHydrated"
        class="filters"
        :class="{ unwrap: isUnwrapFilters }"
      >
        <div class="d-flex-column gap-2 filter-item">
          <p>Бренды</p>
          <el-select
            v-model="queryParams.brand"
            multiple
            placeholder="Выберите бренд"
            style="min-width: 240px"
            @blur="setQuery()"
            @remove-tag="setQuery()"
          >
            <el-option
              v-for="item in brands"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="d-flex-column gap-2 filter-item">
          <p>Категории</p>
          <el-select
            v-model="queryParams.categoryId"
            multiple
            placeholder="Выберите категорию"
            style="min-width: 240px"
            @blur="setQuery()"
            @remove-tag="setQuery()"
          >
            <el-option
              v-for="item in category"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="d-flex-column gap-2 filter-item">
          <p>Сортировать</p>
          <div class="d-flex gap-2">
            <el-segmented
              @change="setQuery()"
              v-model="queryParams.orderBy"
              :options="sortList"
            />
            <el-segmented
              @change="setQuery()"
              v-model="queryParams.order"
              :options="orders"
            >
              <template #default="{ item }">
                <div class="flex flex-col items-center gap-2">
                  <Icon :name="item.icon" style="font-size: 20px" />
                </div>
              </template>
            </el-segmented>
          </div>
        </div>
        <div class="d-flex-column filter-item" style="gap: 6px">
          <p class="price-label">
            Стоимость
            <el-tag class="price-tag" round> {{ price[0] }} </el-tag>
            —
            <el-tag class="price-tag" round>{{ price[1] }}</el-tag>
          </p>
          <el-slider
            v-model="price"
            range
            :step="100"
            :max="100000"
            style="padding: 0 20px; width: 260px"
            @change="test"
          />
        </div>
        <div class="d-flex-column gap-2 filter-item">
          <p>Скидки</p>
          <el-switch
            v-model="queryParams.isSale"
            active-color="#1E54A0"
            label="Со скидкой"
            @change="setQuery()"
          />
        </div>
      </div>
      <el-button
        class="filters-button"
        type="primary"
        @click="isUnwrapFilters = !isUnwrapFilters"
      >
        Фильтры
      </el-button>
    </div>
    <div v-infinite-scroll="load" class="products-grid">
      <product-card
        v-for="product in products"
        :data="product"
        :key="product.id"
      />
    </div>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router';
import BreadCrumb from '~/components/ui/BreadCrumb.vue';

const config = useRuntimeConfig();
const apiUrl = config.public.URL;
const route = useRoute();
const fullPath = route.fullPath;

let params = null;
const slug = route.params.slug;

const getParams = () => {
  return {
    brand: route.query.brand,
    categoryId: route.query.categoryId
      ? Number(route.query.categoryId)
      : undefined,
    orderBy: route.query.orderBy || 'name',
    order: route.query.order || 'DESC',
    isSale: route.query.isSale === 'true' ? true : false,
  };
};

params = getParams();

const { data: listProducts } = await useAsyncData(
  `products-list-${fullPath}`,
  () => $fetch(`${apiUrl}/products`, { params }),
  { default: () => [] },
);

const catalogHeading = params.brand
  ? `${params.brand} — каталог парфюмерии`
  : 'Каталог парфюмерии';

const catalogDesc = params.brand
  ? `Оригинальная парфюмерия ${params.brand} в наличии и под заказ. Быстрая доставка по Москве, Рязани и СДЭК по всей России.`
  : 'Оригинальная парфюмерия мировых брендов в наличии и под заказ. Подберите аромат с помощью фильтров по бренду, категории и цене.';

const breadcrumbs = [
  { name: 'Главная', path: '/' },
  ...(params.brand ? [{ name: 'Каталог', path: '/products/list' }] : []),
  { name: params.brand || 'Каталог' },
];

const collectionUrl = `https://parfburo.com/products/list${params.brand ? `?brand=${encodeURIComponent(params.brand)}` : ''}`;
const collectionName = params.brand
  ? `${params.brand} — каталог парфюмерии`
  : 'Каталог парфюмерии';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://parfburo.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: params.brand || 'Каталог',
      item: collectionUrl,
    },
  ],
};

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${collectionUrl}#collection`,
  url: collectionUrl,
  name: collectionName,
  isPartOf: { '@id': 'https://parfburo.com/#website' },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: listProducts.value?.length || 0,
    itemListElement: (listProducts.value || []).slice(0, 30).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://parfburo.com/products/${p.slug}`,
      name: [p.brand, p.name].filter(Boolean).join(' '),
    })),
  },
};

const pageTitle = params.brand
  ? `${params.brand} — каталог в ПарфБюро`
  : 'Каталог парфюмерии — ПарфБюро';

const pageDescription = params.brand
  ? `Парфюмерия ${params.brand} в интернет-магазине ПарфБюро. Быстрая доставка по Москве, Рязани и СДЭК по всей России.`
  : 'Каталог оригинальной парфюмерии в интернет-магазине ПарфБюро. Сотни брендов, удобный поиск по нотам и категориям. Быстрая доставка по Москве, Рязани и СДЭК по России.';

useSiteSeo({
  title: pageTitle,
  description: pageDescription,
  keywords: `${params.brand || 'парфюмерия'} купить, цена, интернет-магазин, каталог, доставка, Москва, Рязань, оригинал`,
  url: collectionUrl,
  canonical: collectionUrl,
  robots: 'noindex,follow',
});

injectJsonLd([breadcrumbJsonLd, collectionJsonLd]);
</script>

<script>
import { getProducts, getBrands, getCategory } from '@/api/productApi.js';

export default {
  data() {
    return {
      // products: [],
      getProductsProcess: false,
      brands: [],
      category: [],
      isHydrated: false,

      price: [0, 100000],
      sortList: [
        {
          value: 'name',
          label: 'По названию',
        },
        {
          value: 'price',
          label: 'По стоимости',
        },
      ],

      orders: [
        {
          value: 'DESC',
          icon: 'solar:sort-from-bottom-to-top-bold-duotone',
        },
        {
          value: 'ASC',
          icon: 'solar:sort-from-top-to-bottom-bold-duotone',
        },
      ],
      queryParams: this.getParams(),
      isUnwrapFilters: false,
    };
  },
  watch: {
    '$route.query'() {
      this.queryParams = this.getParams();
      this.setQuery();
    },
  },
  mounted() {
    this.queryParams = this.getParams();
    this.isHydrated = true;
    this.getBrands();
    this.getCategory();
    this.setQuery();
    this.getProducts();
  },

  methods: {
    load() {
      // this.queryParams.offset += 20;
      // this.$router.replace({
      //   query: this.queryParams,
      // });
      // this.getProductsLoud();
    },
    test() {
      (this.queryParams.fromPrice = this.price?.[0]),
        (this.queryParams.toPrice = this.price?.[1]),
        this.setQuery();
    },
    getParams() {
      return {
        brand: this.$route.query.brand,
        categoryId: this.$route.query.categoryId
          ? Number(this.$route.query.categoryId)
          : undefined,
        orderBy: this.$route.query.orderBy || 'name',
        order: this.$route.query.order || 'DESC',
        fromPrice: this.price?.[0],
        toPrice: this.price?.[1],
        isSale: this.$route.query.isSale === 'true' ? true : false,
        // offset: 20,
      };
    },
    getItemById(id, arr) {
      return arr.find(el => el.id === id);
    },
    setQuery() {
      this.$router.replace({
        query: this.removeEmptyFields(this.queryParams),
      });
      this.getProducts();
    },
    async getProducts() {
      this.getProductsProcess = true;
      this.products = [];
      const params = {
        ...this.queryParams,
        // limit: 20,
      };
      try {
        const res = await getProducts(this.removeEmptyFields(params));
        this.products = res;
      } catch (e) {
        console.error(e);
      }
      this.getProductsProcess = false;
    },
    // async getProductsLoud() {
    //   this.getProductsProcessLoud = true;
    //   const params = {
    //     ...this.queryParams,
    //     limit: 20,
    //   };
    //   try {
    //     const res = await getProducts(this.removeEmptyFields(params));
    //     const lastElem = res[res.length - 1];
    //   } catch (e) {
    //     console.error(e);
    //   }
    //   this.getProductsProcessLoud = false;
    // },
    async getBrands() {
      try {
        const res = await getBrands();
        this.brands = res.sort((a, b) => a.localeCompare(b));
      } catch (e) {
        console.error(e);
      }
    },
    async getCategory() {
      try {
        const res = await getCategory();
        this.category = res
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(el => el);
      } catch (e) {
        console.error(e);
      }
    },
    removeEmptyFields(obj) {
      const result = {};

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];

          if (
            value !== null &&
            value !== undefined &&
            value !== '' &&
            !(Array.isArray(value) && value.length === 0)
          ) {
            result[key] = value;
          }
        }
      }

      return result;
    },
  },
};
</script>

<style scoped lang="scss">
.catalog-page {
  display: flex;
  flex-direction: column;
  padding: 24px 40px 60px;
  min-height: 100vh;

  @media (max-width: 500px) {
    padding: 20px;
  }
}

.catalog-page-title {
  margin: 16px 0 8px;
  font-size: 28px;
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 22px;
  }
}

.catalog-page-desc {
  margin: 0 0 24px;
  color: var(--ink-soft);
  max-width: 820px;
  line-height: 1.5;
  font-size: 14px;
}

.filters-wrap {
  margin-bottom: 8px;
}

.products-grid {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 22px;
}

.filters {
  border-bottom: 0.5px solid var(--border);
  padding-bottom: 20px;
  display: flex;
  gap: 16px;
  overflow: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  @media (max-width: 500px) {
    gap: 12px;
  }
  @media (min-width: 1600px) {
    gap: 16px;
  }
  @media (max-width: 1500px) {
    justify-content: space-between;
  }
}

.filter-item p {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.price-label {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.unwrap {
  flex-direction: column;
  gap: 20px;
  transition: 0.2s;
}

@media (max-width: 500px) {
  .filter-item {
    scroll-snap-align: start; /* Элементы будут прилипать к началу */
    min-width: 100%;
  }
  .el-select {
    width: 100%;
  }
}

@media (min-width: 500px) {
  .filters-button {
    display: none;
  }
}

::v-deep {
  .el-select__wrapper {
    border-radius: 8px;
    border: 0.5px solid var(--border);
    box-shadow: none;
    background: var(--surface2);
    min-height: 38px;
    transition: border-color 0.15s;

    &.is-focused,
    &:hover {
      border-color: var(--blue);
      box-shadow: none;
    }
  }

  .el-select__placeholder {
    font-size: 13px;
    color: var(--ink-muted);
  }

  .el-tag {
    border-radius: 6px;
  }

  .price-tag.el-tag {
    background: var(--blue-tint);
    border: none;
    color: var(--blue);
    font-weight: 600;
  }

  .el-slider__bar {
    background: var(--blue);
  }

  .el-slider__button {
    border-color: var(--blue);
  }

  .el-segmented {
    --el-border-radius-base: 8px;
    background: var(--surface2);
    border: 0.5px solid var(--border);
  }

  .el-button {
    border-radius: 8px;
    background: var(--ink);
    border-color: var(--ink);
  }
}
</style>
