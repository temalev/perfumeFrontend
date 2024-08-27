<template>
  <the-input v-model="phone" type="text" placeholder="+7 (___) ___-__-__" />
</template>

<script>
import TheInput from './TheInput.vue';

export default {
  components: { TheInput },
  data() {
    return {
      phone: '',
    };
  },
  watch: {
    phone(val) {
      this.$emit('update:modelValue', val);
    },
  },
  methods: {},
};
</script>

<style></style>
