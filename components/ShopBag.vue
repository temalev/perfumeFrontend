<template>
  <drawer
    @close="$emit('close')"
    :positioning="step === 'makingAnOrder' ? 'center' : 'left'"
  >
    <div v-if="step === 'orderFormation'" class="shop-bag">
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
        <UiTheButton class="w100" @click="step = 'makingAnOrder'">
          Оформить заказ
        </UiTheButton>
      </div>
    </div>
    <div v-if="step === 'makingAnOrder'" class="shop-bag">
      <h1>Оформление заказа</h1>
      <div class="shop-bag-main">
        <div v-loading="getProductProcess" class="order-list">
          <product-card-mini
            v-for="order in orders"
            :key="order.id"
            :product="order"
            @drop="dropItem"
          />
        </div>
        <div>
          <div class="form-data">
            <UiTheInput label="ФИО" />
            <UiTheInput label="Email" />
            <UiTheInputPhone label="Телефон" />
            <UiTheInput label="Email" />
          </div>

          <UiTheButton class="w100" @click="createOrder">
            Оформить заказ
          </UiTheButton>
        </div>
      </div>
    </div>
  </drawer>
</template>

<script>
import ProductCardMini from './ProductCardMini.vue';
import Drawer from './ui/Drawer.vue';

import { getProduct, createOrder } from '@/api/productApi.js';

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
        const existingProduct = this.orders.find(order => order.slug === slug);

        if (existingProduct) {
          existingProduct.count = (existingProduct.count || 1) + 1;
        } else {
          this.orders.push({ ...res, count: 1 });
        }
      } catch (e) {
        console.error(e);
      }
      this.getProductProcess = false;
    },
    async createOrder() {
      console.log(true);

      const data = {
        origin: 'https://dev.parfburo.com',
        comment: 'Hello world',
        recepient: {
          name: 'Петр Петров',
          email: 'julu13@yandex.ru',
          phone: '89009728125',
          deliveryTypeId: 1,
          deliveryMessage: 'Принесите мне в кровать',
          address: 'улица Пушкина, дом Колотушкина',
          deliveryPoint: 'SDK1',
        },
        items: [
          {
            productId: 9,
            count: 1,
          },
        ],
      };
      try {
        const res = await createOrder(data);
      } catch (e) {
        console.error(e);
      }
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

form {
  height: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
