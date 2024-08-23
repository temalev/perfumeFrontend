<template>
  <div class="brands-modal">
    <button class="ico-btn m-4" @click="$emit('close')">
      <Icon name="material-symbols-light:close" style="font-size: 40px" />
    </button>
    <div class="brands-modal-content">
      <div v-for="col in data" :key="col.title" class="column">
        <h2>{{ col.title }}</h2>

        <div class="brands">
          <div
            v-for="brand in col.brands"
            :key="brand"
            class="brand pointer"
            @click="
              $router.push({ name: 'products', query: { brand: brand } });
              $emit('close');
            "
          >
            {{ brand }}
          </div>
        </div>
      </div>
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
  },
};
</script>

<style scoped lang="scss">
.brands-modal {
  width: 100%;
  height: calc(100% - 50px);
  background-color: #fff;
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  &-content {
    display: flex;
    flex-wrap: wrap;
    gap: 22px;
    padding: 22px;
    align-content: flex-start;
    overflow: auto;
  }
}

.column {
  height: fit-content;
  flex-grow: 1;
}

.brands {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.brand {
  transition: 0.2s;
  &:hover {
    color: $color-light;
  }
}
</style>
