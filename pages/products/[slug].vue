<template>
  <div v-loading="getProductProcess" class="product-card">
    <Head>
      <Title>Купить {{ product?.name }}</Title>
    </Head>
    <bread-crumb :data="breadcrumb" />
    <div class="product-card-content gap-4">
      <img :src="image(product?.images[0])" :alt="product?.name" />
      <div class="d-flex-column">
        <h1>{{ product?.name }}</h1>
        <span class="text-secondary">Артикул: {{ product?.article }}</span>

        <div class="options mt-4">
          <div class="options-label">Объем/мл</div>
          <div class="options-item-list">
            <div
              v-for="option in options"
              :key="option.id"
              class="options-item"
              :class="{ active: option.id === product.id }"
              @click="
                this.$router.push({
                  name: 'products-slug',
                  params: { slug: option.slug },
                })
              "
            >
              {{ option.capacity }}
            </div>
          </div>
        </div>
        <div class="price mb-4">{{ product?.price }} ₽</div>
        <div class="d-flex gap-2">
          <UiTheButton @click="addToShopBag(product.slug)">
            Добавить в корзину
          </UiTheButton>
          <UiTheButton @click="addToFavorites(product.slug)">
            Добавить в избранное
          </UiTheButton>
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
                <div class="product-card-info-item-label-text">Страна</div>
                <div class="filled-container" />
              </div>

              <span>{{ product?.data.country }}</span>
            </li>
            <li
              v-for="note in product?.data?.notes"
              :key="note.name"
              class="product-card-info-item"
            >
              <div class="product-card-info-item-label">
                <div class="product-card-info-item-label-text">
                  {{ note.name }}
                </div>
                <div class="filled-container" />
              </div>

              <span>{{ note.value }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p>{{ product?.description }}</p>
    <log-in
      v-if="isLoginModal"
      @close="isLoginModal = false"
      @success="addToFavorites()"
    />

    <div v-if="products.length" class="d-flex-column">
      <h1>Продукты этого бренда</h1>
      <div class="scroll mt-2 mb-4">
        <product-card
          v-for="product in products"
          :key="product.id"
          :data="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getProduct, getGroupProduct, getProducts } from '@/api/productApi.js';
import BreadCrumb from '~/components/ui/BreadCrumb.vue';
import LogIn from '~/components/LogIn.vue';
import ProductCard from '~/components/ProductCard.vue';

export default {
  components: { BreadCrumb, LogIn, ProductCard },
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
      ordersSlugs: useState('ordersSlugs'),
      user: useState('user'),
      favorites: useState('favoritesSlugs'),
      isLoginModal: false,
      products: [],
    };
  },
  watch: {
    '$route.query'() {
      this.getProduct();
    },
  },
  mounted() {
    this.getProduct();
  },

  methods: {
    addToFavorites() {
      if (this.user) {
        this.favorites = this.product.slug;
      } else {
        this.isLoginModal = true;
      }
    },
    addToShopBag(slug) {
      if (window.localStorage.getItem('ordersSlugs')) {
        this.ordersSlugs.push(slug);
        if (this.ordersSlug?.length) {
          window.localStorage.setItem('ordersSlugs', this.ordersSlugs);
        } else {
          window.localStorage.removeItem('ordersSlugs');
        }
      } else {
        this.ordersSlugs.push(slug);
        window.localStorage.setItem('ordersSlugs', slug);
      }
    },
    image(url) {
      return url ? url : '/img/no_image.png';
    },
    async getProduct() {
      this.breadcrumb = [
        {
          name: 'Главная',
          route: 'index',
        },
      ];
      this.getProductProcess = true;
      try {
        const res = await getProduct(this.$route.params.slug);
        this.product = res;
        this.breadcrumb.push({
          name: this.product.brand,
          route: 'products',
        });
        this.getGroupProduct();
        this.getProducts();
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
    async getProducts() {
      this.getProductsProcess = true;
      const params = { brands: this.product.brand };
      try {
        const res = await getProducts(params);
        this.products = res;
      } catch (e) {
        console.error(e);
      }
      this.getProductsProcess = false;
    },
  },
};
</script>

<style scoped lang="scss">
.product-card {
  margin: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 12px;

  img {
    width: 50%;
    max-height: 500px;
    object-fit: contain;
  }

  &-content {
    display: flex;
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
  font-size: 14px;
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
  flex-shrink: 0;

  &:hover {
    background-color: #000;
    color: #fff;
  }

  &.active {
    background-color: #000;
    color: #fff;
  }
}

.scroll {
  display: flex;
  overflow: auto;
  gap: 12px;
  padding: 20px;
}

@media (max-width: 800px) {
  .product-card-content {
    display: flex;
    flex-direction: column;
  }
  .scroll {
    flex-direction: column;
  }
}
</style>
