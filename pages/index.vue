<template>
  <div class="d-flex-column">
    <div class="d-flex" style="position: relative">
      <!-- <img src="/img/bg.png" alt="" width="100%" /> -->
      <video
        playsinline
        autoplay
        loop
        muted
        style="height: 600px; width: 100%; object-fit: cover"
      >
        <source src="/video/bg.webm" type="video/mp4" />
      </video>
      <div class="text-container">
        <div class="text">
          <h1>TORRICELUMN –50%</h1>
          <p>тут может быть любой текст, также как и картинка / видео</p>
        </div>
      </div>
    </div>
    <div class="offers m-8">
      <h1>Хиты</h1>
      <div class="slider">
        <product-card
          v-for="product in products"
          :data="product"
          :key="product.id"
        />
      </div>
    </div>
    <div class="offers m-8">
      <h1>Новинки</h1>
      <div class="slider">
        <product-card
          v-for="product in products"
          :data="product"
          :key="product.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import products from 'assets/mock/products.json';
import ProductCard from '~/components/ProductCard.vue';

export default {
  components: { ProductCard },
  data() {
    return {
      products: products,
    };
  },
};
</script>

<style>
.text-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.text {
  color: white;
}

.slider {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 20px;
}

.offers {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
