<template>
  <div class="d-flex-column">
    <div class="d-flex" style="position: relative">
      <!-- <img src="/img/bg.png" alt="" width="100%" /> -->
      <video
        ref="video"
        playsinline
        autoplay
        loop
        muted
        style="height: 600px; width: 100%; object-fit: cover"
      >
        <source src="/video/bg.mp4" type="video/mp4" />
      </video>
      <div class="text-container">
        <div class="text">
          <h1>TORRICELUMN –50%</h1>
          <p>тут может быть любой текст, также как и картинка / видео</p>
        </div>
      </div>
    </div>
    <div class="info m-8">
      <media-card v-for="item in media" :key="item.id" :data="item" />
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
import MediaCard from '~/components/MediaCard.vue';

export default {
  components: { ProductCard, MediaCard },
  data() {
    return {
      products: products,
      media: [
        {
          id: 1,
          url: 'https://841301.selcdn.ru/rkTech/perfume/files/312323398_An_47hahcYBrMaQDk_QnHWM5Le0uNRUDdckjQRj2ag3H6ZcziaOdt.mp4',
        },
        {
          id: 2,
          url: 'https://841301.selcdn.ru/rkTech/perfume/files/312323398_An8vOkxQj_Vo05XENunbqMDLcBSyuu43pxJS0E9148qYBK4HKgL_QaeVnP3x.mp4',
        },
        {
          id: 3,
          url: 'https://841301.selcdn.ru/rkTech/perfume/files/312323398_An_hvv49_8TEFfGLgPlj2VgFEdmixlO0wnacygRW1BFZSlL_0XdxDNpwe2.mp4',
        },
      ],
    };
  },
  mounted() {
    this.$refs.video.play();
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
  padding: 20px 20px 40px 20px;
}

.info {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  overflow: auto;
}

@media (max-width: 600px) {
  .info {
    height: 600px;
  }
}

.offers {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
