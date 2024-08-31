<template>
  <drawer
    @close="$emit('close')"
    :positioning="step === 'placeAnOrder' ? 'center' : 'left'"
  >
    <div class="shop-bag">
      <h1>Корзина</h1>
      <div class="shop-bag-main">
        <div v-loading="getProductProcess" class="order-list">
          <product-card-mini
            v-for="order in orders"
            :key="order.id"
            :product="order"
            @drop="dropItem"
          />
        </div>
        <UiTheButton class="w100" @click="step = 'placeAnOrder'">
          Оформить заказ
        </UiTheButton>
      </div>
    </div>
  </drawer>
</template>

<script>
import ProductCardMini from './ProductCardMini.vue';
import Drawer from './ui/Drawer.vue';

import { getProduct } from '@/api/productApi.js';

export default {
  components: { Drawer, ProductCardMini },
  data() {
    return {
      ordersSlugs: useState('ordersSlugs'),
      orders: [],
      getProductProcess: false,
      step: 'orderFormation',
    };
  },
  mounted() {
    this.ordersSlugs?.forEach(slug => {
      this.getProduct(slug);
    });
  },
  methods: {
    dropItem(id) {
      this.orders = this.orders.filter(item => item.id !== id);
      this.ordersSlugs = this.orders.map(el => el.slug);
      window.localStorage.setItem('ordersSlugs', this.ordersSlugs);
    },
    async getProduct(slug) {
      this.getProductProcess = true;
      try {
        const res = await getProduct(slug);
        // Проверяем, есть ли продукт с таким же slug в массиве orders
        const existingProduct = this.orders.find(order => order.slug === slug);

        if (existingProduct) {
          // Если продукт уже существует, увеличиваем его count
          existingProduct.count = (existingProduct.count || 1) + 1;
        } else {
          // Если продукт не существует, добавляем его с count = 1
          this.orders.push({ ...res, count: 1 });
        }
      } catch (e) {
        console.error(e);
      }
      this.getProductProcess = false;
    },
  },
};
</script>

<style scoped lang="scss">
.shop-bag {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: calc(100% - 50px);
}
.shop-bag-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.order-list {
  border: 1px solid $border-color;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
}
</style>
