<template>
  <div class="user-card">
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
</style>
