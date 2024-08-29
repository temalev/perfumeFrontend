<template>
  <div v-loading="getProductProcess" class="product-card">
    <bread-crumb :data="breadcrumb" />
    <div class="d-flex gap-4">
      <img :src="image(product?.images[0])" :alt="data?.name" />
      <div class="d-flex-column">
        <h1>{{ product?.name }}</h1>
        <span>Артикул: {{ product?.article }}</span>
        <div class="price mt-4">{{ product?.price }} ₽</div>
        <div class="options">
          <div class="options-label">Объем/мл</div>
          <div class="options-item-list">
            <div
              v-for="option in options"
              :key="option.id"
              class="options-item"
            >
              {{ option.capacity }}
            </div>
          </div>
        </div>
        <div class="d-flex gap-2">
          <UiTheButton>Добавить в избранное</UiTheButton>
          <UiTheButton>Добавить в корзину</UiTheButton>
        </div>
        <div class="product-card-info">
          <div class="product-card-info-header">Подробные характеристики</div>
          <ul>
            <li class="product-card-info-item">
              <div class="product-card-info-item-label">
                <div class="product-card-info-item-label-text">
                  Тип продукта
                </div>
                <div class="filled-container" />
              </div>
              <span>{{ product?.type }}</span>
            </li>
            <li class="product-card-info-item">
              <div class="product-card-info-item-label">
                <div class="product-card-info-item-label-text">Для кого</div>
                <div class="filled-container" />
              </div>

              <span>{{ product?.data.gender }}</span>
            </li>
            <li class="product-card-info-item">
              <div class="product-card-info-item-label">
                <div class="product-card-info-item-label-text">
                  Группа ароматов
                </div>
                <div class="filled-container" />
              </div>

              <span>фужерные</span>
            </li>
            <li class="product-card-info-item">
              <div class="product-card-info-item-label">
                <div class="product-card-info-item-label-text">Страна</div>
                <div class="filled-container" />
              </div>

              <span>{{ product?.data.country }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p>{{ product?.description }}</p>
  </div>
</template>

<script>
import { getProduct, getGroupProduct } from '@/api/productApi.js';
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
      options: [],
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
        this.getGroupProduct();
      } catch (e) {
        console.error(e);
      }
      this.getProductProcess = false;
    },
    async getGroupProduct() {
      try {
        const res = await getGroupProduct(this.product.groupId);
        this.options = res;
      } catch (e) {
        console.error(e);
      }
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
    max-height: 500px;
    object-fit: contain;
  }
}

.price {
  font-size: 22px;
}

.product-card-info-header {
  font-weight: 600;
  margin-bottom: 12px;
  margin-top: 20px;
}
.product-card-info-item {
  display: flex;
}
.product-card-info-item-label {
  display: flex;
  width: 200px;
  flex-shrink: 0;
  &-text {
    flex-shrink: 0;
  }
}

.filled-container {
  width: 100%;
  border-bottom: 1px dotted #c8c8c8;
}

.options {
  margin-top: 8px;
  margin-bottom: 20px;
}

.options-item-list {
  display: flex;
  gap: 6px;
  margin-top: 4px;
}

.options-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  color: #000;
  border-radius: 50%;
  border: 1px solid #000;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #000;
    color: #fff;
  }
}
</style>
