<template>
  <div v-loading="getProductsProcess" class="products">
    <h1 v-if="$route.query.brand">{{ $route.query.brand }}</h1>
    <h1 v-if="$route.query.isSale">Специальное предложение</h1>
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
import { getProducts } from '@/api/productApi.js';

export default {
  data() {
    return {
      products: [],
      getProductsProcess: false,
    };
  },
  watch: {
    '$route.query'() {
      this.getProducts();
    },
  },
  mounted() {
    this.getProducts();
  },

  methods: {
    async getProducts() {
      this.getProductsProcess = true;
      this.products = [];
      const params = this.$route.query;
      try {
        const res = await getProducts(params);
        this.products = res;
      } catch (e) {
        console.error(e);
      }
      this.getProductsProcess = false;
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
