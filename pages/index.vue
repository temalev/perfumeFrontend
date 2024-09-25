<template>
  <div class="body-home-page">
    <div class="d-flex" style="position: relative">
      <!-- <img src="/img/bg.png" alt="" width="100%" /> -->
      <video
        playsinline
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
    <div ref="info" class="info">
      <media-card v-for="item in media" :key="item.id" :data="item" />
    </div>
    <div class="info-mobile">
      <video
        v-for="item in media"
        :key="item.id"
        :data="item"
        playsinline
        preload="metadata"
        loop
        muted
        @click="openedVideo = item"
      >
        <source :src="item.url" type="video/mp4" />
      </video>
    </div>
    <div class="offers m-8">
      <h1>Специальные предложения</h1>
      <div class="slider">
        <product-card
          v-for="product in productsHit"
          :data="product"
          :key="product.id"
        />
      </div>
    </div>
    <div class="offers m-8">
      <h1>Новинки</h1>
      <div class="slider">
        <product-card
          v-for="product in productsSale"
          :data="product"
          :key="product.id"
        />
      </div>
    </div>
    <modal v-if="openedVideo" @close="openedVideo = null">
      <video
        :data="openedVideo"
        playsinline
        loop
        autoplay
        muted
        style="width: 100%; height: 100%"
      >
        <source :src="openedVideo.url" type="video/mp4" />
      </video>
    </modal>
  </div>
</template>

<script>
import products from 'assets/mock/products.json';
import ProductCard from '~/components/ProductCard.vue';
import MediaCard from '~/components/MediaCard.vue';

import { getProducts } from '@/api/productApi.js';
import Modal from '~/components/ui/Modal.vue';

export default {
  components: { ProductCard, MediaCard, Modal },
  data() {
    return {
      products: products,
      productsHit: [],
      productsSale: [],
      media: [
        {
          id: 1,
          url: 'https://841301.selcdn.ru/rkTech/perfume/files/312323398_An_47hahcYBrMaQDk_QnHWM5Le0uNRUDdckjQRj2ag3H6ZcziaOdt.mp4#t=0.1',
        },
        {
          id: 2,
          url: 'https://841301.selcdn.ru/rkTech/perfume/files/312323398_An8vOkxQj_Vo05XENunbqMDLcBSyuu43pxJS0E9148qYBK4HKgL_QaeVnP3x.mp4#t=0.1',
        },
        {
          id: 3,
          url: 'https://841301.selcdn.ru/rkTech/perfume/files/312323398_An_hvv49_8TEFfGLgPlj2VgFEdmixlO0wnacygRW1BFZSlL_0XdxDNpwe2.mp4#t=0.1',
        },
      ],
      openedVideo: null,
    };
  },
  mounted() {
    this.getProductsHit();
    this.getProductsSale();
  },
  methods: {
    async getProductsHit() {
      this.getProductsProcess = true;
      const params = {
        isHit: true,
      };
      try {
        const res = await getProducts(params);
        this.productsHit = res;
      } catch (e) {
        console.error(e);
      }
      this.getProductsProcess = false;
    },
    async getProductsSale() {
      this.getProductsProcess = true;
      const params = {
        isSale: true,
      };
      try {
        const res = await getProducts(params);
        this.productsSale = res;
      } catch (e) {
        console.error(e);
      }
      this.getProductsProcess = false;
    },
  },
};
</script>

<style scoped lang="scss">
.body-home-page {
  display: flex;
  flex-direction: column;
  // height: 100%;
  // overflow: hidden;
}
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
  overflow: scroll;
  flex-shrink: 0;
  margin-top: 32px;
  scroll-behavior: smooth;
}

@media (min-width: 600px) {
  .info-mobile {
    display: none;
  }
}

@media (max-width: 600px) {
  .info {
    display: none;
  }
  .info-mobile {
    display: flex;
    overflow: scroll;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    margin: 20px;
    gap: 12px;

    & video {
      scroll-snap-align: start;
      border-radius: 22px;
      border: 1px solid #2a4d84;
      padding: 2px;
      height: 200px;
      width: 200px;
      object-fit: cover;
    }
  }
}

.offers {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
