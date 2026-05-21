<template>
  <div class="layout">
    <Head>
      <Title>ПарфБюро - оригиналы мировых брендов</Title>
      <Link
        rel="icon"
        href="https://parfburo.com/favicon.ico"
        type="image/x-icon"
      />
    </Head>
    <Header @login="isLoginModal = true" @openShopBag="isDrawer = true" />
    <div class="main">
      <slot />
      <Footer @onInfoModal="val => (infoModal = val)" />
    </div>
    <mobile-panel @login="isLoginModal = true" @openShopBag="isDrawer = true" />
    <UiModal
      v-if="infoModal === 'delivery'"
      @close="infoModal = null"
      header="Доставка"
    >
      <div class="modal-body">
        <p>
          Мы осуществляем курьерскую доставку до двери в г. Москва и г. Рязань.
        </p>
        <p>
          В другие регионы России доставка осуществляется с помощью транспортной
          компании CDEK. Мы надежно упаковываем каждый заказ, чтобы при
          транспортировке он не повредился.
        </p>
        <p class="mt-2">Стоимость доставки:</p>
        <ul>
          <li>
            📍 Доставка по России транспортной компанией CDEK (оплата на сайте)
            - 400₽ при заказе до 7000₽, бесплатно при заказе от 7000₽
          </li>
          <li class="mt-1">
            📍 Доставка по Москве в пределах МКАД курьером (оплата при получении
            наличными/оплата на сайте) - 500₽ при заказе до 10.000₽, бесплатно
            при заказе от 10.000₽
          </li>
          <li class="mt-1">
            📍 Доставка по Москве за пределы МКАД курьером (оплата наличными при
            получении/оплата на сайте) - рассчитывается индивидуально. 800₽ +
            25₽ за каждый километр удаленности от МКАД
          </li>
          <li class="mt-1">
            📍 Доставка по Рязани в пределах города, Яндекс.Go (оплата на сайте)
            При заказе до 10.000₽ - 350₽, при заказе от 10.000₽ - бесплатно
          </li>
        </ul>
      </div>
    </UiModal>
    <UiModal
      v-if="infoModal === 'about'"
      @close="infoModal = null"
      header="О нас"
    >
      <div class="modal-body">
        <p>
          Привет! Мы - Парфюм Бюро, твой персональный байер в мире парфюмерии.
        </p>
        <p class="mt-2">Принципы нашей работы очень просты:</p>
        <ul>
          <li>
            Только оригинальная продукция. Мы заказываем ароматы у
            дистрибьюторов, которые завозят их в Россию напрямую с заводов
            производителей. Да, эти же ароматы попадают на полки крупных
            парфюмерных сетей. Мы приветствуем любые проверки на оригинальность,
            чтобы у вас остались только положительные эмоции от покупки.
          </li>
          <li class="mt-1">
            Политика умеренных цен. Мы за долгую дружбу с вами. Отказываясь от
            расходов сетевых магазинов и закупая товар в большом объеме, мы
            можем сделать цену выгоднее. Таким образом, у вас есть возможность
            не переплачивать.
          </li>
        </ul>
        <p><b>Почему нет нужного мне аромата/бренда?</b></p>
        <p>
          Наш ассортимент насчитывает более 30000 наименований, возможно, мы еще
          не добавили нужную вам позицию на сайт. Всегда рады ответить на ваш
          запрос наличия и стоимости любого флакона в Telegram/WhatsApp, прямые
          контакты указаны внизу страницы. Если у вас остались вопросы после
          прочтения, мы всегда на связи!
        </p>
      </div>
    </UiModal>
    <UiModal
      v-if="infoModal === 'noBrands'"
      @close="infoModal = null"
      header="Не нашли нужного аромата"
    >
      <div class="modal-body">
        <p>
          Если вы не нашли желаемый флакон, скорее всего, мы пока не добавили
          его на сайт, наш ассортимент насчитывает более 30000 наименований,
          включая винтажные, труднодоступные ароматы и миниатюры.
        </p>
        <p>
          Пожалуйста, оставьте заявку для уточнения наличия интересующего вас
          флакона, мы вернемся к вам с обратной связью в течение 1 рабочего дня.
        </p>
        <el-form
          ref="form"
          :model="form"
          label-position="top"
          label-width="auto"
          @submit.prevent
        >
          <el-form-item
            label="Имя"
            :rules="[
              {
                required: true,
                message: 'Поле обязательно для заполнения',
                trigger: ['blur', 'change'],
              },
            ]"
            prop="name"
          >
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item
            label="Телефон"
            :rules="[
              {
                required: true,
                message: 'Поле обязательно для заполнения',
                trigger: ['blur', 'change'],
              },
            ]"
            prop="phoneNumber"
          >
            <el-input v-mask="'(###) ###-##-##'" v-model="form.phoneNumber">
              <template #prefix> <div class="mr-1">+7</div> </template>
            </el-input>
          </el-form-item>
          <el-form-item label="Способ связи">
            <el-radio-group v-model="form.communicationTypeId">
              <el-radio :value="1">Telegram</el-radio>
              <el-radio :value="2">WhatsApp</el-radio>
              <el-radio :value="3">Позвоните мне</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            :rules="[
              {
                required: true,
                message: 'Поле обязательно для заполнения',
                trigger: ['blur', 'change'],
              },
            ]"
            label="Поле для ваших пожеланий"
            prop="products"
          >
            <el-input v-model="form.products" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="sendLoading"
              type="primary"
              @click="validateForm"
              >Отправить</el-button
            >
            <el-button @click="infoModal = null">Отменить</el-button>
          </el-form-item>
        </el-form>
      </div>
    </UiModal>
    <shop-bag
      v-if="isDrawer"
      :user="user"
      @close="isDrawer = false"
      @login="
        isDrawer = false;
        isLoginModal = true;
      "
    />
    <log-in
      v-if="isLoginModal"
      @close="isLoginModal = false"
      @success="$router.push('userCard')"
      @forgot="
        isLoginModal = false;
        isForgotModal = true;
      "
    />
    <forgot-password
      v-if="isForgotModal"
      @close="isForgotModal = false"
    />
  </div>
</template>

<script setup>
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://parfburo.com/#organization',
      name: 'ПарфБюро',
      url: 'https://parfburo.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://parfburo.com/img/logo.webp',
      },
      description: 'Интернет-магазин оригинальной парфюмерии мировых брендов. Доставка по Москве, Рязани и всей России.',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+7-915-602-28-96',
        contactType: 'customer service',
        areaServed: 'RU',
        availableLanguage: ['ru'],
      },
      sameAs: [
        'https://t.me/parfburoo',
        'https://wa.me/79156022896',
      ],
    },
    {
      '@type': 'Store',
      '@id': 'https://parfburo.com/#store-moscow',
      name: 'ПарфБюро — Москва',
      parentOrganization: { '@id': 'https://parfburo.com/#organization' },
      url: 'https://parfburo.com',
      telephone: '+7-915-602-28-96',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Москва',
        addressCountry: 'RU',
      },
    },
    {
      '@type': 'Store',
      '@id': 'https://parfburo.com/#store-ryazan',
      name: 'ПарфБюро — Рязань',
      parentOrganization: { '@id': 'https://parfburo.com/#organization' },
      url: 'https://parfburo.com',
      telephone: '+7-915-602-28-96',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Рязань',
        addressCountry: 'RU',
      },
    },
  ],
};

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(organizationJsonLd),
    },
  ],
});
</script>

<script>
import {
  getMe,
  addToFavorites,
  postProductsRequests,
} from '@/api/productApi.js';
import MobilePanel from '~/components/MobilePanel.vue';
import ShopBag from '~/components/ShopBag.vue';
import LogIn from '~/components/LogIn.vue';
import ForgotPassword from '~/components/ForgotPassword.vue';
import { ElNotification } from 'element-plus';

export default {
  components: { MobilePanel, ShopBag, LogIn, ForgotPassword },
  data() {
    return {
      isModal: false,
      token: null, // Хранит значение токена, если он есть
      user: null,
      favorites: [],
      infoModal: '',
      isDrawer: false,
      isLoginModal: false,
      isForgotModal: false,
      sendLoading: false,
      form: {
        name: '',
        phoneNumber: '',
        communicationTypeId: 1,
        products: '',
      },
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
    if (!localStorage.isCloseCookie) {
      ElNotification({
        title: 'Мы используем файлы cookie',
        message:
          'Продолжая использование сайта, вы соглашаетесь с использованием файлов cookie.',
        position: 'bottom-left',
        duration: 0,
        onClose: () => {
          localStorage.setItem('isCloseCookie', true);
        },
      });
    }
  },
  watch: {
    favorites(val) {
      if (val.length) {
        this.addToFavorites(val);
      }
    },
    '$route.path'(val) {
      const layoutElement = document.getElementsByClassName('main')[0];
      console.log(layoutElement);

      if (layoutElement) {
        layoutElement.scrollTo(0, 0); // Сбросить прокрутку к началу
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
    async postProductsRequests() {
      this.sendLoading = true;
      try {
        const res = await postProductsRequests(this.form);
        this.infoModal = false;
      } catch (e) {
        console.error(e);
      }
      this.sendLoading = false;
    },
    validateForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.postProductsRequests();
        } else {
          // Валидация не прошла
          console.log('Ошибка валидации');
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100vh;
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
  font-size: 14px;
}

@media (max-width: 500px) {
  .main {
    margin-bottom: 60px;
  }
}
</style>
