<template>
  <div class="user-card">
    <div class="d-flex-column align-flex-end">
      <div class="user-info">
        <div class="user-ico"></div>
        <div>{{ user?.name }}Артем</div>
      </div>

      <!-- <div class="text-secondary">{{ user?.phoneNumber }}</div> -->
    </div>
    <UiTheTabs
      style="margin-top: 25px"
      :data="tabs"
      @activeTab="onSelectTab"
      :activeTab="activeTab"
    />
  </div>
</template>

<script>
import { getMe } from '@/api/productApi.js';

export default {
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
    };
  },
  mounted() {
    if (!this.user) {
      this.getMe();
    }
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
  align-items: flex-end;
  border-bottom: 1px solid #00000027;
  width: fit-content;
  padding: 6px 20px;
  gap: 12px;
}

.user-ico {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4c7cf7;
}
</style>
