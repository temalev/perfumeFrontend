<template>
  <div class="d-flex-column">
    <Head>
      <Title>parfBuro</Title>
    </Head>
    <div class="main-admin">
      <div class="main" style="overflow-x: scroll">
        <Header />
        <slot />
        <modal v-if="isModal" @close="isModal = false" />
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '~/components/ui/Modal.vue';

export default {
  components: { Modal },
  data() {
    return {
      isModal: false,
    };
  },
};
</script>

<style></style>
