<template>
  <nav class="breadcrumb" aria-label="Хлебные крошки">
    <ol class="breadcrumb-list">
      <li
        v-for="(item, i) in data"
        :key="`${i}-${item.name}`"
        class="breadcrumb-item"
      >
        <NuxtLink
          v-if="item.path && i < data.length - 1"
          :to="item.path"
          class="breadcrumb-item-link"
        >
          {{ item.name }}
        </NuxtLink>
        <span
          v-else
          class="breadcrumb-item-current"
          aria-current="page"
        >
          {{ item.name }}
        </span>
        <span
          v-if="i < data.length - 1"
          class="breadcrumb-sep"
          aria-hidden="true"
        >
          /
        </span>
      </li>
    </ol>
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
};
</script>

<style scoped lang="scss">
.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.breadcrumb-item-link {
  color: inherit;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: $color-light;
    text-decoration: underline;
  }
}

.breadcrumb-item-current {
  color: #888;
}

.breadcrumb-sep {
  color: #c8c8c8;
}

@media (max-width: 800px) {
  .breadcrumb-list {
    font-size: 14px;
  }
}
</style>
