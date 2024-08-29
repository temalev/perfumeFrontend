<template>
  <div v-loading="getProductProcess" class="product-card">
    <bread-crumb :data="breadcrumb" />
    <div class="d-flex gap-4">
      <img :src="image(product?.images[0])" :alt="data?.name" />
      <div class="d-flex-column">
        <h1>{{ product?.name }}</h1>
        <span>Артикул: {{ product?.article }}</span>
        <div class="price">{{ product?.price }} ₽</div>
        <UiButton loading>button</UiButton>
      </div>
    </div>
    <p>{{ product?.description }}</p>

    <pre>{{ product }}</pre>
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
    image(url) {
      console.log(url);

      return url ? url : '/img/no_image.png';
    },
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
  display: flex;
  flex-direction: column;
  gap: 12px;

  img {
    width: 50%;
  }
}

.price {
  font-size: 22px;
}
</style>
