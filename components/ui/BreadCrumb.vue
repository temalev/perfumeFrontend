<template>
  <nav class="breadcrumb">
    <ul class="breadcrumb-list">
      <li
        v-for="(item, i) in data"
        :key="item.name"
        class="breadcrumb-item"
        @click="$router.push({ name: item.route })"
      >
        <pre>{{ item.name }} {{ separate(i) }}</pre>
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
      console.log(index, this.data.length);

      return this.data.length - 1 == index ? '' : '/ ';
    },
  },
};
</script>

<style scope lang="scss">
.breadcrumb-list {
  display: flex;
}

.breadcrumb-item {
  cursor: pointer;
  &:hover {
    color: $color-light;
  }
}
</style>
