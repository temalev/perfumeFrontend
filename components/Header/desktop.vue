<template>
  <div class="hd-wrap">
    <header class="nav">
      <a
        class="nav-logo pointer"
        @click="
          $router.push('/');
          $emit('closeModal');
        "
      >
        <img src="~/public/img/logo.webp" alt="ПарфБюро" />
      </a>

      <label class="nav-search">
        <Icon name="ph:magnifying-glass-bold" class="nav-search-ico" />
        <el-autocomplete
          ref="input"
          v-model="search"
          class="nav-search-input"
          :fetch-suggestions="querySearch"
          popper-class="my-autocomplete"
          placeholder="Поиск среди 20 000+ ароматов и брендов"
          @select="handleSelect"
        >
          <template #default="{ item }">
            <div class="d-flex j-b align-center mt-2 mb-2">
              <img
                width="40"
                height="40"
                :src="imgUrl(item?.images?.[0])"
                :alt="item?.name"
              />
              <div class="ml-2">{{ item.name }}</div>
              <div class="ml-2">{{ item.price }} ₽</div>
            </div>
          </template>
        </el-autocomplete>
      </label>

      <div class="nav-right">
        <a class="nav-tg" href="https://t.me/parfburoo">Telegram</a>
        <button
          class="nav-icon"
          aria-label="Избранное"
          @click="user ? $router.push({ name: 'userCard' }) : $emit('login')"
        >
          <Icon name="ph:heart" style="font-size: 20px" />
        </button>
        <el-badge
          :value="ordersSlugs?.length"
          :hidden="!ordersSlugs?.length"
        >
          <button class="nav-cart" @click="$emit('openShopBag')">
            Корзина
          </button>
        </el-badge>
      </div>
    </header>

    <nav class="subnav">
      <a class="nav-cat active" @click="$emit('openCatalog')">Парфюмерия</a>
      <a class="nav-cat" @click="$emit('openBrands')">Бренды</a>
      <NuxtLink class="nav-cat" to="/decantInfo">Отливанты</NuxtLink>
      <NuxtLink class="nav-cat" to="/#find">Не нашли аромат?</NuxtLink>
      <a class="nav-cat" @click="$emit('openInfo', 'about')">О нас</a>
      <NuxtLink class="nav-cat" to="/#corp">Опт</NuxtLink>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
    ordersSlugs: {
      type: Array,
      default: () => [],
    },
    querySearch: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      search: '',
    };
  },
  watch: {
    search(val) {
      this.$emit('onSearch', val);
    },
  },
  methods: {
    imgUrl(url) {
      return url ? url : '/img/no_image.png';
    },
    handleSelect(val) {
      this.$router.push({
        name: 'products-slug',
        params: { slug: val.slug },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.hd-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-bottom: 0.5px solid var(--border);
  z-index: 2;
}

.nav {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 40px;
}

.nav-logo img {
  height: 26px;
  width: auto;
  display: block;
  object-fit: contain;
}

.nav-search {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 9px;
  background: var(--surface2);
  border: 0.5px solid var(--border);
  border-radius: 8px;
  padding: 0 13px;
  height: 38px;
  max-width: 440px;

  &:focus-within {
    border-color: var(--blue);
  }

  /* Anchored on .nav-search (the <label>, which carries the scope id);
     el-autocomplete's root is a fragment and gets no scope attribute,
     so :deep must start from this element. */
  :deep(.nav-search-input) {
    width: 100%;
  }

  :deep(.el-input),
  :deep(.el-input__wrapper) {
    height: 36px;
    min-height: 0;
    line-height: 36px;
  }

  :deep(.el-input__wrapper) {
    box-shadow: none !important;
    border: none !important;
    background: transparent !important;
    padding: 0 !important;
  }

  :deep(.el-input__inner) {
    font-size: 13px !important;
    height: 36px;
    color: var(--ink);
    font-family: var(--sans);
  }

  :deep(.el-input__inner::placeholder) {
    color: var(--ink-muted);
    font-size: 13px;
  }
}

.nav-search-ico {
  font-size: 17px;
  color: var(--ink-muted);
  flex-shrink: 0;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}

.nav-tg {
  font-size: 12px;
  font-weight: 500;
  color: var(--blue);
  white-space: nowrap;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-soft);
  cursor: pointer;

  &:hover {
    color: var(--ink);
  }
}

.nav-cart {
  background: var(--ink);
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 7px;
  cursor: pointer;
  white-space: nowrap;
  font-family: var(--sans);
}

.subnav {
  display: flex;
  gap: 0;
  padding: 0 40px;
  border-top: 0.5px solid var(--border);
  overflow-x: auto;
}

.nav-cat {
  font-size: 12px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 0 17px;
  height: 44px;
  display: flex;
  align-items: center;
  color: var(--ink-soft);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  white-space: nowrap;

  &:first-child {
    padding-left: 0;
  }

  &:hover {
    color: var(--ink);
  }

  &.active {
    color: var(--ink);
    font-weight: 600;
    border-bottom-color: var(--ink);
  }
}
</style>
