<template>
  <div class="info-block">
    <div class="info-block-item-label-text">{{ label }}</div>
    <div v-if="isFilled" class="filled-container" />
    <span class="info-block-item-value">{{ value }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    isFilled: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped lang="scss">
.info-block {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.info-block-item-label {
  display: flex;
  width: 200px;
  flex-shrink: 0;
  &-text {
    flex-shrink: 0;
  }
}

.filled-container {
  flex-grow: 1;
  width: 100%;
  border-bottom: 1px dotted #c8c8c8;
  margin: 0 8px;
}

.info-block-item-value {
  flex-shrink: 0;
}
</style>
