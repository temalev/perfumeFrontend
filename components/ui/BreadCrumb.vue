<template>
  <nav class="breadcrumb">
    <ul class="breadcrumb-list">
      <li
        v-for="(item, i) in data"
        :key="item.name"
        class="breadcrumb-item"
        @click="$router.push({ name: item.route })"
      >
        <span class="breadcrumb-item-text">{{ item.name }}</span>
        <span>{{ separate(i) }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    separate(index) {
      return this.data.length - 1 == index ? '' : ' / ';
    },
  },
};
</script>

<style scope lang="scss">
.breadcrumb-list {
  display: flex;
}

.breadcrumb-item {
  &-text {
    cursor: pointer;
    &:hover {
      color: $color-light;
    }
  }

  &:last-child {
    margin-left: 4px;
  }
}

@media (max-width: 800px) {
  li {
    font-size: 14px;
  }
}
</style>
