<template>
  <div class="brands-modal">
    <button class="ico-btn mr-6 mt-4" @click="$emit('close')">
      <span style="font-size: 30px">✕</span>
    </button>
    <div class="brands-modal-content">
      <div v-for="col in data" :key="col.title" class="column">
        <h2>{{ col.title }}</h2>

        <div class="brands">
          <NuxtLink
            v-for="brand in col.brands"
            :key="brand"
            :to="`/brand/${slugify(brand)}`"
            class="brand pointer"
            @click="$emit('close')"
          >
            {{ brand }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { slugify } from '~/utils/slugify.js';

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    slugify,
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
    @media (max-width: 500px) {
      flex-direction: column;
      flex-wrap: nowrap;
      width: 100%;
    }
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
