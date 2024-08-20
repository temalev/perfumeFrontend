<template>
  <li
    class="cascader-item"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="cascader-item-label" @click="handleClick">
      {{ category.name }}
      <span v-if="hasChildren" class="arrow">></span>
    </div>
    <ul v-if="hasChildren && showChildren" class="cascader-sub-list">
      <cascader-item
        v-for="child in children"
        :key="child.id"
        :category="child"
        :categories="categories"
        @navigate="$emit('navigate', $event)"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'CascaderItem',
  props: {
    category: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showChildren: false,
    };
  },
  computed: {
    children() {
      // Фильтрация дочерних элементов на основе parentId
      return this.categories.filter(
        (child) => child.parentId === this.category.id
      );
    },
    hasChildren() {
      return this.children.length > 0;
    },
  },
  methods: {
    onMouseEnter() {
      this.showChildren = true;
    },
    onMouseLeave() {
      this.showChildren = false;
    },
    handleClick() {
      this.$emit('navigate', this.category.id);
    },
  },
};
</script>
