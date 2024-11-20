<template>
  <div v-loading="getProductsProcess" class="products">
    <Head>
      <Title v-if="params.brand"
        >{{ params.brand }} - Купить в ПарфБюро по выгодной цене</Title
      >
    </Head>
    <div v-if="isHydrated" class="filters">
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
        <p style="text-wrap: nowrap">
          Диапазон стоимости от
          <el-tag type="primary" effect="dark" round> {{ price[0] }} </el-tag>
          до
          <el-tag type="primary" effect="dark" round>{{ price[1] }}</el-tag>
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
          active-color="#2A4D84"
          label="Со скидкой"
          @change="setQuery()"
        />
      </div>
    </div>
    <div v-infinite-scroll="load" class="products-list">
      <product-card
        v-for="product in products"
        :data="product"
        :key="product.id"
      />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';

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

useHead({
  link: [
    {
      rel: 'canonical',
      href: `https://parfburo.com${fullPath}`,
    },
  ],
  meta: [
    {
      name: 'keywords',
      content: `${
        params.brand || 'товар'
      } купить, цена, интернет-магазин, каталог, бесплатная доставка, Москва, Рязань, оригинал`,
    },
    {
      property: 'title',
      content: `${
        params.brand || 'товар'
      } - купить в ПарфБюро по выгодной цене`,
    },
    {
      name: 'description',
      content: `Купить ${params.brand} мл в Москве по низкой цене в интернет-магазине ПарфБюро. Подробное описание, применение, состав, фото. Быстрая доставка по всей России.`,
    },
    {
      property: 'og:title',
      content: `Купить продукцию ${
        params.brand || 'известных брендов'
      } по выгодной цене`,
    },
    {
      property: 'og:url',
      content: `https://parfburo.com${fullPath}`,
    },
    {
      property: 'og:locale',
      content: 'ru_RU',
    },
    {
      property: 'og:logo',
      content: 'https://parfburo.com/_nuxt/logo.3sM_t13Y.webp',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:description',
      content: `Насладитесь утонченными нотами ${params.brand}, которые подчеркнут вашу индивидуальность. Наши духи раскрывают истинную красоту через каждую каплю. Найдите аромат, который станет вашим!`,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: `Купить продукцию бренда ${
        params.brand || 'товар'
      } по выгодной цене`,
    },
  ],
});
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
.products {
  display: flex;
  flex-direction: column;
  margin: 40px;
  min-height: 100vh;
  // overflow: auto;
  &-list {
    margin: 80px 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 22px;
  }

  @media (max-width: 500px) {
    margin: 30px 20px;
  }
}

.filters {
  border-bottom: 1px solid #eee;
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

@media (max-width: 500px) {
  .filter-item {
    scroll-snap-align: start; /* Элементы будут прилипать к началу */
    min-width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
</style>
