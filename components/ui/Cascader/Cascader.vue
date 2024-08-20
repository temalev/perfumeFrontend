<template>
  <div class="cascader">
    <div class="wrap">
      <button class="ico-btn m-4" @click="$emit('close')">
        <Icon name="material-symbols-light:close" style="font-size: 40px" />
      </button>
    </div>

    <ul class="cascader-list">
      <cascader-item
        v-for="category in rootCategories"
        :key="category.id"
        :category="category"
        :categories="data"
        @navigate="navigateToCategory"
      />
    </ul>
  </div>
</template>

<script>
import CascaderItem from './CascaderItem.vue';

export default {
  components: { CascaderItem },
  name: 'Cascader',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {
    rootCategories() {
      return this.data.filter((category) => category.parentId === null);
    },
  },
  methods: {
    navigateToCategory(id) {
      this.$router.push({ path: '/products', query: { categoryId: id } });
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
.cascader {
  position: relative;
  background-color: #fff;
  z-index: 9999;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 50px;
  left: 0;
  display: flex;
  flex-direction: column;
}

.wrap {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.cascader-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: fit-content;
  margin: 0 20px;
}

.cascader-item {
  position: relative;
  padding: 8px;
  cursor: pointer;
}

.cascader-item-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    color: #a6a6a6;
  }
}

.cascader-sub-list {
  position: absolute;
  top: 0;
  left: 100%;
  display: none;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.cascader-item:hover .cascader-sub-list {
  display: block;
}

.arrow {
  font-weight: bold;
  margin-left: 12px;
}
</style>
