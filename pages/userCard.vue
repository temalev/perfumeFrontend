<template>
  <div class="user-card">
    <div class="d-flex-column align-flex-end" style="margin-top: 10px">
      <div class="user-info">
        <div class="user-ico"></div>
        <div style="height: 14px">{{ user?.name || user?.phoneNumber }}</div>
      </div>

      <!-- <div class="text-secondary">{{ user?.phoneNumber }}</div> -->
    </div>
    <el-tabs
      v-model="activeTab"
      class="tabs"
      style="margin-top: 14px"
      @tab-change="test"
    >
      <el-tab-pane label="Избранное" :name="1">
        <div v-if="favorites?.length" class="d-flex flex-wrap gap-6 mt-8 j-c">
          <product-card
            v-for="favorite in favorites"
            :key="favorite.product?.id"
            :data="favorite.product"
            :isFavorites="false"
          />
        </div>
        <el-empty v-else description="Здесь пока пусто..." />
      </el-tab-pane>
      <el-tab-pane label="Текущий заказ" :name="2">
        <div v-if="orders?.length" class="d-flex-column gap-4">
          <order-card v-for="order in orders" :key="order.id" :order="order" />
        </div>
        <el-empty v-else description="Текущие заказы отсутствуют" />
      </el-tab-pane>
      <el-tab-pane label="История заказов" :name="3">
        <div v-if="ordersHistory?.length" class="d-flex-column gap-4">
          <order-card
            v-for="order in ordersHistory"
            :key="order.id"
            :order="order"
          />
        </div>
        <el-empty v-else description="Вы еще ничего не заказывали" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getMe, getFavorites, getOrders } from '@/api/productApi.js';
import ProductCard from '~/components/ProductCard.vue';
import OrderCard from '~/components/OrderCard.vue';

export default {
  components: { ProductCard, OrderCard },
  data() {
    return {
      user: useState('user'),
      tabs: [
        {
          id: 1,
          name: 'Избранное',
        },
        {
          id: 2,
          name: 'Текущий заказ',
        },
        {
          id: 3,
          name: 'История заказов',
        },
      ],
      activeTab: 1,
      favorites: [],
      orders: [],
      ordersHistory: [],
    };
  },
  mounted() {
    if (!this.user) {
      this.getMe();
    }

    this.getFavorites();
    this.getOrders();
  },
  methods: {
    test(val) {
      if (val === 2) {
        this.getOrders();
      }
    },
    onSelectTab(tabId) {
      this.activeTab = tabId;
    },
    async getMe() {
      try {
        const res = await getMe();
        this.user = res;
      } catch (e) {
        console.error(e);
      }
    },
    async getFavorites() {
      try {
        const res = await getFavorites();
        this.favorites = res;
      } catch (e) {
        console.error(e);
      }
    },
    async getOrders() {
      try {
        const res = await getOrders();
        this.ordersHistory = res;
        this.orders = res.filter(el => el.statusId < 6);
        console.log(this.orders);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.user-card {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
  gap: 22px;
  min-height: 100vh;
}

.user-info {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #00000027;
  width: fit-content;
  padding: 6px 20px;
  gap: 12px;
  font-size: 14px;
}

.user-ico {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #4c7cf7;
}

.tabs {
  width: 80%;
  min-width: 40%;
  min-height: 100vh;
}

@media (max-width: 800px) {
  .tabs {
    width: 100%;
  }
}
</style>
