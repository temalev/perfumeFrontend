<template>
  <div class="body-home-page">
    <VitePwaManifest />

    <div class="hero" style="position: relative">
      <picture>
        <source media="(max-width: 500px)" srcset="/img/bg_max-500.webp" type="image/webp" />
        <img
          src="/img/bg.webp"
          alt="parfBuro background"
          class="bg-img"
          width="2133"
          height="1200"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
      <div class="text-container">
        <div class="text">
          <!-- <h1>TORRICELUMN –50%</h1>
          <p>тут может быть любой текст, также как и картинка / видео</p> -->
        </div>
      </div>
    </div>
    <div ref="info" class="info">
      <media-card v-for="item in media" :key="item.id" :data="item" />
    </div>
    <div v-if="media?.length" class="info-mobile">
      <img
        v-for="item in media"
        :key="item.url"
        :src="item.preview"
        loading="lazy"
        @click="openedVideo = item"
      />
    </div>
    <div class="offers mt-4">
      <h3>Специальные предложения</h3>
      <div class="slider">
        <product-card
          v-for="product in productsHit"
          :data="product"
          :key="product.id"
        />
      </div>
    </div>
    <div class="offers">
      <h3>Хиты</h3>
      <div class="slider">
        <product-card
          v-for="product in productsSale"
          :data="product"
          :key="product.id"
        />
      </div>
    </div>
    <modal v-if="openedVideo" @close="openedVideo = null">
      <div class="d-flex align-center j-c">
        <video
          :data="openedVideo"
          playsinline
          loop
          autoplay
          muted
          style="width: 80%; height: 80%"
        >
          <source :src="openedVideo.url" type="video/mp4" />
        </video>
      </div>
    </modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getProducts, getMedia } from '@/api/productApi.js';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://parfburo.com/#website',
  url: 'https://parfburo.com',
  name: 'ПарфБюро',
  description: 'Интернет-магазин оригинальной парфюмерии',
  publisher: { '@id': 'https://parfburo.com/#organization' },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://parfburo.com/products/list?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'ru-RU',
};

useHead({
  link: [
    {
      rel: 'canonical',
      href: `https://parfburo.com`,
    },
  ],
  meta: [
    {
      name: 'description',
      content: `Покупайте парфюмерию и профессиональную косметику на официальном сайте «ПарфБюро».
      Погрузитесь в мир утончённых ароматов вместе с ParfBuro — сделайте выбор, который подчеркнёт вашу индивидуальность и стиль!
      Быстрая доставка по Москве и Рязани. Доставка СДЭК по всей России`,
    },
    {
      property: 'og:description',
      content: `Покупайте парфюмерию и профессиональную косметику на официальном сайте «ПарфБюро».
      Погрузитесь в мир утончённых ароматов вместе с ParfBuro — сделайте выбор, который подчеркнёт вашу индивидуальность и стиль!
      Быстрая доставка по Москве и Рязани. Доставка СДЭК по всей России`,
    },
    {
      name: 'keywords',
      content: `парфюмерия, духи, элитные ароматы, нишевая парфюмерия, оригинальные духи, купить духи, доставка парфюмерии, доставка по всей России, Москва, Рязань, парфюмерия Москва, парфюмерия Рязань, интернет-магазин парфюмерии, эксклюзивные ароматы, мужская парфюмерия, женская парфюмерия, подбор аромата, парфюмерия на заказ, подарок духи, купить оригинальную парфюмерию.`,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(websiteJsonLd),
    },
  ],
});

const { data: productsHit } = await useAsyncData(
  'home-products-hit',
  () => getProducts({ isHit: true }),
  { default: () => [] },
);

const { data: productsSale } = await useAsyncData(
  'home-products-sale',
  () => getProducts({ isSale: true }),
  { default: () => [] },
);

const { data: media } = await useAsyncData(
  'home-media',
  async () => {
    const res = await getMedia();
    return res?.data?.stories ?? [];
  },
  { default: () => [] },
);

const openedVideo = ref(null);
</script>

<style scoped lang="scss">
.body-home-page {
  display: flex;
  flex-direction: column;
}

.hero {
  width: 100%;
  height: 600px;
  overflow: hidden;

  & > picture {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 600px) {
    height: 360px;
  }
}

.bg-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  scroll-behavior: smooth;
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
  min-height: 200px;
}

@media (min-width: 600px) {
  .info-mobile {
    display: none;
  }
}

@media (max-width: 600px) {
  .slider {
    scroll-snap-type: x mandatory;
  }
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
    min-height: 200px;

    & img {
      scroll-snap-align: start;
      border-radius: 22px;
      border: 1px solid #2a4d84;
      padding: 2px;
      height: 200px !important;
      width: 115px;
      object-fit: cover;
    }
  }
}

.offers {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  & h3 {
    margin: 0 28px;
  }
}
</style>
