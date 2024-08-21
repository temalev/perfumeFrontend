<template>
  <div v-loading="getProductProcess" class="product-card">
    <bread-crumb :data="breadcrumb" />
    <pre>{{ product }}</pre>
    <h1>{{ product?.name }}</h1>
  </div>
</template>

<script>
import { getProduct } from '@/api/productApi.js';
import BreadCrumb from '~/components/ui/BreadCrumb.vue';

export default {
  components: { BreadCrumb },
  data() {
    return {
      product: null,
      getProductProcess: false,
      breadcrumb: [
        {
          name: 'Главная',
          route: 'index',
        },
      ],
    };
  },
  watch: {
    '$route.query'() {
      this.getProducts();
    },
  },
  mounted() {
    this.getProduct();
  },

  methods: {
    async getProduct() {
      this.getProductProcess = true;

      try {
        const res = await getProduct(this.$route.query.slug);
        this.product = res;
        this.breadcrumb.push({
          name: this.product.brand,
          route: 'products',
        });
      } catch (e) {
        console.error(e);
      }
      this.getProductProcess = false;
    },
  },
};
</script>

<style scoped lang="scss">
.product-card {
  margin: 20px;
  height: 100vh;
}
</style>
