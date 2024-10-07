<template>
  <div v-loading="getProductsProcess" class="products">
    <h1 v-if="$route.query.isSale">Специальное предложение</h1>
    <div class="d-flex gap-4">
      <div class="d-flex-column gap-2">
        <p>Бренды</p>
        <el-select
          v-model="selectedBrands"
          multiple
          placeholder="Выберите бренд"
          style="width: 240px"
          @blur="getProducts"
        >
          <el-option
            v-for="item in brands"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="d-flex-column gap-2">
        <p>Категории</p>
        <el-select
          v-model="selectedCategory"
          multiple
          placeholder="Выберите категорию"
          style="width: 240px"
          @blur="getProducts"
        >
          <el-option
            v-for="item in category"
            :key="item.name"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
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
      selectedBrands: null,
      selectedCategory: null,
    };
  },
  watch: {
    '$route.query'() {
      this.getProducts();
    },
  },
  mounted() {
    this.getBrands();
    this.getCategory();
    this.selectedBrands = this.$route.query.brand
      ? this.$route.query.brand
      : undefined;
    this.selectedCategory = this.$route.query.categoryId
      ? this.$route.query.categoryId
      : undefined;

    this.getProducts();
  },

  methods: {
    getItemById(id, arr) {
      return arr.find(el => el.id === id);
    },
    async getProducts() {
      this.getProductsProcess = true;
      this.products = [];

      const params = {
        ...(this.selectedBrands && { brand: this.selectedBrands }),
        ...(this.selectedCategory && { categoryId: this.selectedCategory }),
      };
      this.$router.replace({
        query: params,
      });
      try {
        const res = await getProducts(params);
        this.products = res;
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
</style>
