<template>
  <drawer @close="$emit('close')">
    <div class="shop-bag">
      <h1>Корзина</h1>
      <div class="order-list">
        <product-card-mini
          v-for="order in products"
          :key="order.id"
          :data="order"
        />
      </div>
    </div>
  </drawer>
</template>

<script>
import ProductCardMini from './ProductCardMini.vue';
import products from 'assets/mock/products.json';
import Drawer from './ui/Drawer.vue';

export default {
  components: { Drawer, ProductCardMini },
  data() {
    return {
      products: products,
    };
  },
};
</script>

<style scoped lang="scss">
.order-list {
  border: 1px solid $border-color;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
