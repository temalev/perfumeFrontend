<template>
  <button :disabled="loading" :class="type">
    <slot></slot>
    <span v-if="loading" class="loading-spinner"></span>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
button {
  width: fit-content;
  display: flex;
  &:disabled {
    background-color: #a9a9a9 !important;
    cursor: default;
  }
}

.default {
  padding: 12px;
  background-color: #000;
  color: #fff;
  border-radius: 12px;
  transition: all 0.2s;
  &:hover {
    background-color: #252525;
  }
}

.loading-spinner {
  margin-left: 8px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 3px solid white;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  flex-shrink: 0;
  scale: 1;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
