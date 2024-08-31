<template>
  <div class="user-card">
    <div class="d-flex-column">
      <div class="user-info">
        <div class="user-ico"></div>
        <div>{{ user?.name }}Артем</div>
      </div>
      <div>{{ user?.phoneNumber }}</div>
    </div>

    <pre>{{ user }}</pre>
  </div>
</template>

<script>
import { getMe } from '@/api/productApi.js';

export default {
  data() {
    return {
      user: useState('user'),
    };
  },
  mounted() {
    if (!this.user) {
      this.getMe();
    }
  },
  methods: {
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
  margin: 20px;
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
