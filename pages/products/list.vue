<template>
  <div v-loading="getProductsProcess" class="products">
    <h1 v-if="$route.query.isSale">Специальное предложение</h1>
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
          step="100"
          max="100000"
          style="padding: 0 20px; width: 260px"
          @change="setQuery()"
        />
      </div>
    </div>
    <div class="products-list">
      <product-card
        v-for="product in products"
        :data="product"
        :key="product.id"
      />
    </div>
  </div>
</template>

<script>
import { getProducts, getBrands, getCategory } from '@/api/productApi.js';

export default {
  data() {
    return {
      products: [],
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
      this.getProducts();
    },
  },
  mounted() {
    this.isHydrated = true;
    this.getBrands();
    this.getCategory();
    this.setQuery();
    this.getProducts();
  },

  methods: {
    getParams() {
      return {
        brand: this.$route.query.brand,
        categoryId: this.$route.query.categoryId,
        orderBy: this.$route.query.orderBy || 'name',
        order: this.$route.query.order || 'DESC',
        fromPrice: this.price?.[0] || 0,
        toPrice: this.price?.[1] || 100000,
      };
    },
    getItemById(id, arr) {
      return arr.find(el => el.id === id);
    },
    setQuery() {
      this.$router.replace({
        query: this.queryParams,
      });
    },
    async getProducts() {
      this.getProductsProcess = true;
      this.products = [];

      this.queryParams.fromPrice = this.price?.[0];
      this.queryParams.toPrice = this.price?.[1];
      console.log(this.removeEmptyFields(this.$route.query));

      try {
        const res = await getProducts(
          this.removeEmptyFields(this.$route.query)
        );
        this.products = res;
        this.price[0] = this.products.reduce(
          (min, item) => (item.price < min ? item.price : min),
          this.products[0].price
        );
        this.price[1] = this.products.reduce(
          (max, item) => (item.price > max ? item.price : max),
          this.products[0].price
        );
      } catch (e) {
        console.error(e);
      }
      this.getProductsProcess = false;
    },
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
}

.filters {
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  display: flex;
  gap: 12px;
  overflow: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
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
