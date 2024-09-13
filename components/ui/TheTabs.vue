<template>
  <div class="tabs">
    <div
      v-for="tab in data"
      :key="tab.id"
      class="tab"
      :class="{ active: activeTab === tab.id }"
      @click="$emit('activeTab', tab.id)"
    >
      {{ tab.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    activeTab: {
      type: Number,
    },
  },
};
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  height: 28px;
}

.tab {
  cursor: pointer;
  border-bottom: 1px solid $border-color;
  transition: 0.2s;
  padding: 0 12px;
  &:hover {
    color: $color-light;
    border-bottom: 1px solid #000;
  }
}

.active {
  border-bottom: 1px solid #000;
}
</style>
