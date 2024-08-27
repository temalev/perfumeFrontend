<template>
  <div class="layout">
    <Head>
      <Title>parfBuro</Title>
    </Head>

    <Header />
    <div class="main">
      <slot />
      <modal v-if="isModal" @close="isModal = false" />
    </div>
  </div>
</template>

<script>
import Modal from '~/components/ui/Modal.vue';
import { useCookie } from '#app';

export default {
  components: { Modal },
  data() {
    return {
      isModal: false,
      token: null, // Хранит значение токена, если он есть
    };
  },
  mounted() {
    // Проверяем наличие токена на клиентской стороне
    const accessToken = useCookie('accessToken');
    this.token = accessToken.value;

    if (this.token) {
      console.log('Токен найден:', this.token);
    } else {
      console.log('Токен не найден');
      // Вы можете выполнить перенаправление или другие действия здесь
    }
  },
};
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main {
  overflow: auto;
  height: calc(100vh - 50px);
}
</style>
