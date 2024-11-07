<template>
  <main>
    <img
      src="/img/decant.webp"
      alt=""
      width="100%"
      height="600px"
      style="object-fit: cover"
    />
    <h1 class="mt-4">Отливанты</h1>
    <p class="mt-4">
      Если у вас есть сомнения в покупке полноразмерного флакона, вы можете
      приобрести отливант нужного вам аромата. <br />
      <br />
      Отливант — это оригинальный аромат, разлитый из заводского, фирменного
      флакона во флаконы меньшего объема, которые называются атомайзерами.
      <br />
      Это самый доступный способ познакомиться с ароматом и протестировать его
      на себе. <br />
      <br />
      Благодаря компактным размерам атомайзера, отливанты также могут стать
      незаменимым атрибутом в путешествиях! <br />
      <br />
      Отливанты доступны объемом от 10мл. Это примерно 120-125 «пшиков», которых
      вам хватит на 4-5 недель использования. <br />
      <br />
      Чтобы уточнить цену на интересующий вас аромат, пожалуйста, свяжитесь с
      отделом поддержки.
    </p>

    <div class="d-flex mt-4">
      <el-button>
        <el-link :underline="false" href="https://t.me/parfburoo">
          <Icon name="logos:telegram" style="font-size: 20px" />
        </el-link>
      </el-button>
      <el-button>
        <el-link :underline="false" href="https://wa.me/79932690188">
          <Icon name="logos:whatsapp-icon" style="font-size: 20px" />
        </el-link>
      </el-button>
    </div>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';

const config = useRuntimeConfig();
const apiUrl = config.public.URL;
const route = useRoute();
const fullPath = route.fullPath;

useHead({
  link: [
    {
      rel: 'canonical',
      href: `https://parfburo.com${fullPath}`,
    },
  ],
  meta: [
    {
      name: 'keywords',
      content: `Москва, Рязань, отливанты, духи на розлив, парфюмерные отливанты, пробники духов, ароматы в мини-формате, атомайзеры, тестирование ароматов, покупка отливантов, духи для путешествий, компактные флаконы духов, флаконы 10 мл, духи на пробу, отливанты цена, купить отливанты, духи с доставкой`,
    },
    {
      property: 'title',
      hid: 'title',
      content:
        'Отливанты — ПарфБюро | Оригинальные ароматы в мини-формате купить с доставкой в Рязани и Москве',
    },
    {
      property: 'og:title',
      content: `Отливанты — ПарфБюро | Оригинальные ароматы в мини-формате купить с доставкой в Рязани и Москве`,
    },
    {
      property: 'og:url',
      content: `https://parfburo.com${fullPath}`,
    },
    {
      property: 'og:locale',
      content: 'ru_RU',
    },
    {
      property: 'og:logo',
      content: 'https://parfburo.com/_nuxt/logo.3sM_t13Y.webp',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:description',
      content: `Купите отливанты оригинальных ароматов в ПарфБюро с доставкой в Рязань и Москву. Удобные мини-флаконы позволяют протестировать духи перед покупкой полноразмерного флакона.`,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: `Отливанты — ПарфБюро | Оригинальные ароматы в мини-формате купить с доставкой в Рязани и Москве`,
    },
  ],
});
</script>

<script>
export default {};
</script>

<style scoped lang="scss">
main {
  min-height: 100vh;
  padding: 20px;
}
</style>
