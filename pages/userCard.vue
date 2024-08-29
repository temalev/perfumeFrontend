<template>
  <div class="user-card">
    <pre>{{ user }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: useState('user'),
    };
  },
};
</script>

<style scoped lang="scss">
.user-card {
  margin: 20px;
}
</style>
