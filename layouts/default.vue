<template>
  <div class="layout">
    <Head>
      <Title>ПарфБюро - оригиналы мировых брендов</Title>
    </Head>
    <Header />
    <div class="main">
      <slot />
      <Footer @onInfoModal="onInfoModal" />
    </div>
    <UiModal
      v-if="isDeliveryModal"
      @close="isDeliveryModal = false"
      header="Доставка"
    >
      <div class="modal-body">
        <p>
          📍Доставка по России транспортной компанией CDEK (оплата на
          сайте/наложенный платеж) - стоимость сдэк сам рассчитывает в своем
          плагине или хз как это называется, там же клиент может выбрать пункт и
          заполнить инфу о получателе
        </p>
        <p>
          📍Доставка по Москве в пределах МКАД курьером (оплата при получении
          наличными/оплата на сайте) - 500₽ при заказе до 10.000₽, бесплатно при
          заказе от 10.000₽
        </p>
        <p>
          📍Доставка по Москве за пределы МКАД курьером (оплата наличными при
          получении/оплата на сайте) - рассчитывается индивидуально. 800₽ + 25₽
          за каждый километр удаленности от МКАД
        </p>
        <p>
          📍Доставка по Рязани в пределах города, Яндекс.Go (оплата на сайте)
          При заказе до 10.000₽ - 350₽, при заказе от 10.000₽ - бесплатно
        </p>
      </div>
    </UiModal>
  </div>
</template>

<script>
import { getMe, addToFavorites } from '@/api/productApi.js';

export default {
  data() {
    return {
      isModal: false,
      token: null, // Хранит значение токена, если он есть
      user: null,
      favorites: [],
      isDeliveryModal: false,
    };
  },
  mounted() {
    this.user = useState('user', () => null);
    this.getMe();
    useState('ordersSlugs', () => {
      const slugs = window.localStorage.getItem('ordersSlugs');
      return slugs ? slugs.split(',') : [];
    });
    this.favorites = useState('favoritesSlugs', () => []);
  },
  watch: {
    favorites(val) {
      if (val.length) {
        this.addToFavorites(val);
      }
    },
  },
  methods: {
    onInfoModal(modal) {
      if (modal === 'delivery') {
        this.isDeliveryModal = true;
      }
    },
    async getMe() {
      try {
        const res = await getMe();
        this.user = res;
      } catch (e) {
        console.error(e);
      }
    },
    async addToFavorites(slug) {
      try {
        const res = await addToFavorites(slug);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.main {
  overflow: auto;
  height: calc(100vh - 50px);
}

.modal-body {
  padding: 0 20px;
  margin-bottom: 20px;
  max-width: 600px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
