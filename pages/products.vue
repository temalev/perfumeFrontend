<template>
  <div class="products">
    <h1>{{ $route.query.brand }}</h1>
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
    };
  },
  mounted() {
    this.getProducts();
  },

  watch: {
    '$route.query'() {
      this.getProducts();
    },
  },

  methods: {
    async getProducts() {
      const params = this.$route.query;
      console.log(params);

      try {
        const res = await getProducts(params);
        this.products = res;
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
  margin: 20px 40px;
  &-list {
    margin: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 22px;
  }
}
</style>
