<template>
  <div class="body-home-page">
    <VitePwaManifest />

    <section class="hero">
      <picture>
        <source media="(max-width: 500px)" srcset="/img/bg_max-500.webp" type="image/webp" />
        <img
          src="/img/bg.webp"
          alt="Оригинальная парфюмерия мировых брендов в ПарфБюро"
          class="bg-img"
          width="2133"
          height="1200"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
      <div class="hero-overlay" aria-hidden="true" />
      <div class="hero-content">
        <p class="hero-eyebrow">ПарфБюро</p>
        <h1 class="hero-title">
          Оригинальная парфюмерия<br />мировых брендов
        </h1>
        <p class="hero-subtitle">
          Эксклюзивные ароматы с курьерской доставкой по Москве и Рязани.
          СДЭК по всей России — бесплатно от 7&nbsp;000&nbsp;₽.
        </p>
        <NuxtLink to="/products/list" class="hero-cta">
          Смотреть каталог
        </NuxtLink>
      </div>
    </section>
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
      <h2>Специальные предложения</h2>
      <div class="slider">
        <product-card
          v-for="product in productsHit"
          :data="product"
          :key="product.id"
        />
      </div>
    </div>
    <div class="offers">
      <h2>Хиты</h2>
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

useSiteSeo({
  title: 'ПарфБюро — оригиналы мировых брендов парфюмерии',
  description:
    'Покупайте парфюмерию и профессиональную косметику на официальном сайте «ПарфБюро». Утончённые ароматы для индивидуальности и стиля. Быстрая доставка по Москве и Рязани, СДЭК по всей России.',
  keywords:
    'парфюмерия, духи, элитные ароматы, нишевая парфюмерия, оригинальные духи, купить духи, доставка парфюмерии, Москва, Рязань, интернет-магазин парфюмерии, мужская парфюмерия, женская парфюмерия',
  url: 'https://parfburo.com',
});

injectJsonLd(websiteJsonLd);

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
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;

  & > picture {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 600px) {
    height: 460px;
  }
}

.bg-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.35) 40%,
    rgba(0, 0, 0, 0.05) 80%,
    transparent 100%
  );
  pointer-events: none;

  @media (max-width: 600px) {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(0, 0, 0, 0.55) 100%
    );
  }
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 8%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  max-width: 580px;
  color: #fff;
  z-index: 1;

  @media (max-width: 600px) {
    left: 0;
    right: 0;
    padding: 0 24px;
    max-width: none;
    align-items: flex-start;
  }
}

.hero-eyebrow {
  margin: 0;
  font-size: 14px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  opacity: 0.85;
}

.hero-title {
  margin: 0;
  font-size: 56px;
  line-height: 1.05;
  font-weight: 500;
  letter-spacing: -0.01em;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.35);

  @media (max-width: 900px) {
    font-size: 40px;
  }

  @media (max-width: 600px) {
    font-size: 32px;

    & br {
      display: none;
    }
  }
}

.hero-subtitle {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  max-width: 480px;
  opacity: 0.92;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.35);

  @media (max-width: 600px) {
    font-size: 14px;
  }
}

.hero-cta {
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border-radius: 999px;
  background: #fff;
  color: #111;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;

  &:hover {
    background: #2a4d84;
    color: #fff;
    transform: translateY(-1px);
  }
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
  & h2 {
    margin: 0 28px;
    font-size: 22px;
    font-weight: 500;
  }
}
</style>
