<template>
  <div class="user-card">
    <div class="d-flex-column align-flex-end">
      <div class="user-info">
        <div class="user-ico"></div>
        <div style="height: 14px">{{ user?.name || user?.phoneNumber }}</div>
      </div>

      <!-- <div class="text-secondary">{{ user?.phoneNumber }}</div> -->
    </div>
    <div class="d-flex-column w80" style="margin-top: 14px">
      <!-- <UiTheTabs
        style="margin-top: 25px"
        :data="tabs"
        @activeTab="onSelectTab"
        :activeTab="activeTab"
      />
      <div v-if="activeTab === 1" class="d-flex flex-wrap gap-6 mt-8">
        <product-card
          v-for="favorite in favorites"
          :key="favorite.product.id"
          :data="favorite.product"
          :isFavorites="false"
        />
      </div> -->
      <el-tabs v-model="activeTab" class="demo-tabs">
        <el-tab-pane label="Избранное" :name="1">
          <div v-if="favorites.length" class="d-flex flex-wrap gap-6 mt-8">
            <product-card
              v-for="favorite in favorites"
              :key="favorite.product.id"
              :data="favorite.product"
              :isFavorites="false"
            />
          </div>
          <el-empty v-else description="Здесь пока пусто..." />
        </el-tab-pane>
        <el-tab-pane label="Текущий заказ" :name="2"
          ><el-empty description="Текущие заказы отсутствуют"
        /></el-tab-pane>
        <el-tab-pane label="История заказов" :name="3"
          ><el-empty description="Вы еще ничего не заказывали"
        /></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getMe, getFavorites } from '@/api/productApi.js';
import ProductCard from '~/components/ProductCard.vue';

export default {
  components: { ProductCard },
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
    };
  },
  mounted() {
    if (!this.user) {
      this.getMe();
    }

    this.getFavorites();
  },
  methods: {
    onSelectTab(tabId) {
      console.log(tabId);

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
  },
};
</script>

<style scoped lang="scss">
.user-card {
  display: flex;
  margin: 20px;
  gap: 22px;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4c7cf7;
}
</style>
